import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sendLead } from "./lib/sendLead.js";
import { addContact } from "./lib/addContact.js";

// Local dev only: emulate the /api/* serverless functions so the
// contact form and newsletter work under `vite dev`. In production
// the files in /api/*.js handle these. Secrets are loaded from .env
// into process.env here (server side) and never exposed to the client.
function apiDevPlugin(env) {
  // POST handler that reads a JSON body and runs `fn`.
  const jsonPost = (fn) => (req, res, next) => {
    if (req.method !== "POST") return next();
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", async () => {
      let payload = {};
      try {
        payload = raw ? JSON.parse(raw) : {};
      } catch {
        payload = {};
      }
      const result = await fn(payload);
      res.statusCode = result.ok ? 200 : result.status || 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result.ok ? { ok: true } : { error: result.error }));
    });
  };

  return {
    name: "api-dev",
    apply: "serve",
    configureServer(server) {
      // Make the secrets available to lib/* at request time.
      const keys = [
        "RESEND_API_KEY",
        "RESEND_AUDIENCE_ID",
        "LEAD_TO_EMAIL",
        "LEAD_FROM_EMAIL",
      ];
      for (const key of keys) {
        if (env[key]) process.env[key] = env[key];
      }

      server.middlewares.use("/api/lead", jsonPost(sendLead));
      server.middlewares.use("/api/subscribe", jsonPost(addContact));
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load every env var (empty prefix) from .env* for server-side use.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), apiDevPlugin(env)],
  };
});
