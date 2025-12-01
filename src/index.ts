import { Hono } from "hono";
import { fromHono } from "chanfana";
import type { Env } from "./core/env";

// Endpoints
import { WhatsappWebhook } from "./endpoints/WhatsappWebhook";
import { HealthCheck } from "./endpoints/HealthCheck";

const app = new Hono<{ Bindings: Env }>();

// OpenAPI docs at "/"
const openapi = fromHono(app, {
  docs_url: "/",
});

// Register routes
openapi.post("/webhook/whatsapp", WhatsappWebhook);
openapi.get("/health", HealthCheck);

export default app;
