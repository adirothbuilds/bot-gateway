import type { Context } from "hono";
import type { Env } from "./env";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export type Intent = "SCHEDULE" | "CANCEL" | "AVAILABILITY" | "UNKNOWN";

export const HealthCheckResponseSchema = z.object({
  status: z.literal("OK"),
  uptime: z.number(),
});

export const WhatsAppMessageSchema = z.object({
  from: z.string(),
  text: z.string(),
  timestamp: z.number(),
});

export const WhatsAppMessageResponseSchema = z.object({
  success: z.boolean(),
  intent: z.string().optional(),
  reply: z.string(),
});
