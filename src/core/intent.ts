import type { Intent } from "./types";

export function detectIntent(message: string): Intent {
  if (!message) return "UNKNOWN";

  if (message.includes("תור")) return "SCHEDULE";
  if (message.includes("ביטול")) return "CANCEL";
  if (message.includes("פנוי")) return "AVAILABILITY";

  return "UNKNOWN";
}
