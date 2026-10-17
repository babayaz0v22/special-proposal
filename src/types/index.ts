export type StepId = 1 | 2 | 3 | 4 | "5A" | "5B" | "6A" | "closed";

export interface ProposalResponse {
  token: string;
  relationshipStatus: "busy" | "free";
  addressOrCafe?: string;
  contact?: string;
  dodgeCount?: number;
  completedAt: string;
}

export interface TrackingPayload {
  token: string;
  event: "opened" | "trust_yes" | "trust_no_dodge" | "status_free" | "status_busy";
  dodgeCount?: number;
  metadata?: Record<string, unknown>;
}

export interface TokenStatus {
  valid: boolean;
  consumed: boolean;
  message?: string;
}
