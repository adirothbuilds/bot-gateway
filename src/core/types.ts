import type { Context } from "hono";
import type { Env } from "./env";
import { z } from "zod";
import { stat } from "fs";

export type AppContext = Context<{ Bindings: Env }>;

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