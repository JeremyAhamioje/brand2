import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sendLead } from "./lib/sendLead.js";

// Local dev only: emulate the /api/lead serverless function so the
// contact forms work under `vite dev`. In production the file in
// /api/lead.js handles this. The Resend key is loaded from .env into
// process.env here (server side) and never exposed to the client.
function leadApiDevPlugin(env) {
  return {
    name: "lead-api-dev",
    apply: "serve",
    configureServer(server) {
      // Make the secrets available to lib/sendLead at request time.
      for (const key of ["RESEND_API_KEY", "LEAD_TO_EMAIL", "LEAD_FROM_EMAIL"]) {
        if (env[key]) process.env[key] = env[key];
      }

      server.middlewares.use("/api/lead", (req, res, next) => {
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
          const result = await sendLead(payload);
          res.statusCode = result.ok ? 200 : result.status || 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.ok ? { ok: true } : { error: result.error }));
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load every env var (empty prefix) from .env* for server-side use.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), leadApiDevPlugin(env)],
  };
});
