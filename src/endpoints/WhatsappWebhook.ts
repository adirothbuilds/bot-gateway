import { OpenAPIRoute } from "chanfana";
import {
  WhatsAppMessageSchema,
  WhatsAppMessageResponseSchema,
  AppContext,
  Intent,
} from "../core/types";
import { detectIntent } from "../core/intent";

export class WhatsappWebhook extends OpenAPIRoute {
  schema = {
    tags: ["Whatsapp"],
    summary: "Receive a message from WhatsApp webhook",
    request: {
      body: {
        content: {
          "application/json": {
            schema: WhatsAppMessageSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Process WA message",
        content: {
          "application/json": {
            schema: WhatsAppMessageResponseSchema,
          },
        },
      },
    },
  };

  async handle(c: AppContext) {
    const data = await this.getValidatedData<typeof this.schema>();

    const msg = data.body.text;
    const intent = detectIntent(msg);

    switch (intent) {
      case "SCHEDULE":
        return c.json(this.reply(intent, "הבנתי, רוצה לקבוע תור — איזה יום ושעה?"));
      case "CANCEL":
        return c.json(this.reply(intent, "בסדר, ביטלתי את התור שלך."));
      case "AVAILABILITY":
        return c.json(this.reply(intent, "הזמנים הפנויים היום: ..."));
      default:
        return c.json(this.reply("UNKNOWN", "לא הצלחתי להבין, אפשר שוב?"));
    }
  }

  reply(intent: Intent, reply: string) {
    return {
      success: true,
      intent,
      reply,
    };
  }
}
