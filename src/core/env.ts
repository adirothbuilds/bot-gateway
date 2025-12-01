export interface Env {
  // Secrets
  WHATSAPP_API_TOKEN: string;
  OPENAI_API_KEY: string;

  // Vars
  SERVICE_NAME: string;
  BOT_MODE: string;
  DEFAULT_LANGUAGE: string;

  // Bindings
  DB: D1Database;
  SESSIONS: KVNamespace;
  BUCKET: R2Bucket;
}
