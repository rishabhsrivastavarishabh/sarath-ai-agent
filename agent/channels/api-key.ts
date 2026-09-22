import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defineChannel, GET, POST } from "eve/channels";

// Lets a user supply their Vercel AI Gateway API key from the chat UI.
// The key is applied to the running process immediately (the gateway SDK
// resolves AI_GATEWAY_API_KEY on every model request) and persisted to
// .env.local so it survives restarts and dev reloads.
const ENV_FILE = path.join(process.cwd(), ".env.local");
const KEY_LINE = /^AI_GATEWAY_API_KEY=.*$/m;

function configured(): boolean {
  return typeof process.env.AI_GATEWAY_API_KEY === "string" && process.env.AI_GATEWAY_API_KEY.length > 0;
}

async function persistApiKey(apiKey: string): Promise<boolean> {
  try {
    let contents = "";
    try {
      contents = await readFile(ENV_FILE, "utf8");
    } catch {
      contents = "";
    }

    const line = `AI_GATEWAY_API_KEY=${apiKey}`;
    const next = KEY_LINE.test(contents)
      ? contents.replace(KEY_LINE, line)
      : `${contents.trimEnd()}\n${line}\n`;
    await writeFile(ENV_FILE, next, "utf8");
    return true;
  } catch {
    // Persistence is best-effort; the in-process key still works.
    return false;
  }
}

export default defineChannel({
  routes: [
    // Served under the /eve/v1 namespace so it is proxied to the eve runtime
    // by the Next.js `withEve` mount in every environment.
    GET("/eve/v1/api/key", async () => Response.json({ configured: configured() })),

    POST("/eve/v1/api/key", async (request) => {
      let body: unknown;
      try {
        body = await request.json();
      } catch {
        return Response.json({ ok: false, error: 'Send JSON like {"apiKey":"..."}.' }, { status: 400 });
      }

      const apiKey =
        typeof body === "object" && body !== null && typeof (body as { apiKey?: unknown }).apiKey === "string"
          ? (body as { apiKey: string }).apiKey.trim()
          : "";

      if (apiKey.length < 8) {
        return Response.json({ ok: false, error: "Provide a non-empty apiKey." }, { status: 400 });
      }

      process.env.AI_GATEWAY_API_KEY = apiKey;
      const persisted = await persistApiKey(apiKey);

      return Response.json({ ok: true, persisted });
    }),
  ],
});
