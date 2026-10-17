export interface TelegramMessageOptions {
  token?: string;
  userAgent?: string;
  ip?: string;
}

export async function sendTelegramNotification(
  text: string,
  options?: TelegramMessageOptions
): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in environment.");
    return { success: false, error: "Missing Telegram credentials" };
  }

  let fullMessage = text;
  if (options) {
    const metaParts: string[] = [];
    if (options.token) metaParts.push(`🔑 <b>Havola (Token):</b> <code>${options.token}</code>`);
    if (options.ip) metaParts.push(`🌐 <b>IP:</b> <code>${options.ip}</code>`);
    if (options.userAgent) {
      // Shorten user agent for clean readability
      const ua = options.userAgent.length > 90 ? options.userAgent.slice(0, 90) + "..." : options.userAgent;
      metaParts.push(`📱 <b>Qurilma:</b> <code>${ua}</code>`);
    }

    if (metaParts.length > 0) {
      fullMessage += `\n\n───────────────\n${metaParts.join("\n")}`;
    }
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: fullMessage,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("[Telegram] API returned error:", data);
      return { success: false, error: data.description };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("[Telegram] Failed to send notification:", err);
    return { success: false, error: (err as Error).message };
  }
}
