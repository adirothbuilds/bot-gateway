# Bot Gateway (Cloudflare Workers + OpenAPI)

A Cloudflare Worker that exposes a WhatsApp webhook and basic health check, documented automatically with OpenAPI 3.1 using [Hono](https://github.com/honojs/hono) and [chanfana](https://github.com/cloudflare/chanfana). The Worker is pre-wired with D1, KV, and R2 bindings for future stateful features.

## Folder layout

```bash
products/bot-gateway/
├── src/
│   ├── index.ts          # Registers routes and OpenAPI docs endpoint ("/")
│   ├── core/
│   │   ├── env.ts        # Bindings and vars typings (DB, KV, R2, secrets)
│   │   ├── intent.ts     # Simple intent detection helper for WhatsApp text
│   │   ├── types.ts      # Shared zod schemas and app context type
│   │   └── utils.ts      # Request helpers (e.g., safe JSON parsing)
│   └── endpoints/
│       ├── HealthCheck.ts      # GET /health
│       └── WhatsappWebhook.ts  # POST /webhook/whatsapp
├── wrangler.jsonc        # Cloudflare bindings, vars, dev server settings
├── package.json          # Scripts and dependencies
└── tsconfig.json         # TypeScript configuration
```

## Scripts

- `npm run dev` — start the local Worker (`wrangler dev`) on port 8787 with live reload.
- `npm run deploy` — publish to Cloudflare Workers.
- `npm run cf-typegen` — generate Cloudflare type definitions.

## Endpoints

- `GET /health` — returns `{ status: "OK", uptime: <number> }`.
- `POST /webhook/whatsapp` — accepts `{ from, text, timestamp }`, performs a naive intent detection, and replies with a suggested response.
- Swagger/OpenAPI UI is served at `/` when running locally.

## Setup and development

1. Install deps: `npm install`
2. Authenticate once: `npx wrangler login`
3. Run locally: `npm run dev` and open `http://localhost:8787/`
4. Deploy: `npm run deploy`

## Environment and bindings

Bindings are defined in `wrangler.jsonc` and typed in `src/core/env.ts`:

- Secrets (set with `npx wrangler secret put <NAME>`): `WHATSAPP_API_TOKEN`, `OPENAI_API_KEY`
- Vars: `SERVICE_NAME`, `BOT_MODE`, `DEFAULT_LANGUAGE`
- D1: `DB`
- KV: `SESSIONS`
- R2: `BUCKET`
