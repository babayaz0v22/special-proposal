import { Redis } from "@upstash/redis";

// Check if Upstash Redis credentials are present
const isRedisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

let redisClient: Redis | null = null;
if (isRedisConfigured) {
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  } catch (err) {
    console.error("[TokenStore] Failed to initialize Redis:", err);
  }
}

// In-memory fallback cache (used when Redis is not configured)
const memoryConsumedTokens = new Set<string>();

/**
 * Returns allowed tokens if configured via environment variable,
 * or returns null if any string token is permitted.
 */
function getAllowedTokens(): string[] | null {
  const envTokens = process.env.APP_ACCESS_TOKENS;
  if (!envTokens) return null;
  return envTokens
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Verifies whether a token is valid and not yet consumed.
 */
export async function verifyToken(token: string): Promise<{
  valid: boolean;
  consumed: boolean;
  message?: string;
}> {
  const cleanToken = token.trim().toLowerCase();
  if (!cleanToken) {
    return { valid: false, consumed: false, message: "Havola belgilanmagan." };
  }

  // Check against allowed tokens whitelist if defined
  const allowed = getAllowedTokens();
  if (allowed && !allowed.includes(cleanToken)) {
    return { valid: false, consumed: false, message: "Noto'g'ri yoki mavjud bo'lmagan havola." };
  }

  // 1. If Redis is active, query Redis
  if (redisClient) {
    try {
      const redisKey = `proposal_token:${cleanToken}`;
      const tokenData = await redisClient.get<{ status: string; consumedAt?: string }>(redisKey);

      if (tokenData && tokenData.status === "consumed") {
        return { valid: true, consumed: true, message: "Bu sahifa o'z vazifasini bajarib bo'ldi 💌" };
      }

      return { valid: true, consumed: false };
    } catch (err) {
      console.warn("[TokenStore] Redis check error, falling back to memory:", err);
    }
  }

  // 2. Fallback memory check
  if (memoryConsumedTokens.has(cleanToken)) {
    return { valid: true, consumed: true, message: "Bu sahifa o'z vazifasini bajarib bo'ldi 💌" };
  }

  return { valid: true, consumed: false };
}

/**
 * Marks a token as consumed so it cannot be used again.
 */
export async function invalidateToken(
  token: string,
  metadata?: Record<string, unknown>
): Promise<boolean> {
  const cleanToken = token.trim().toLowerCase();
  if (!cleanToken) return false;

  memoryConsumedTokens.add(cleanToken);

  if (redisClient) {
    try {
      const redisKey = `proposal_token:${cleanToken}`;
      await redisClient.set(redisKey, {
        status: "consumed",
        consumedAt: new Date().toISOString(),
        metadata,
      });
      return true;
    } catch (err) {
      console.error("[TokenStore] Failed to invalidate in Redis:", err);
    }
  }

  return true;
}
