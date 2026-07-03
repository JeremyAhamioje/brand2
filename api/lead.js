// Serverless function (Vercel-style): POST /api/lead
// Receives the contact form and emails it via Resend. The API key
// lives in the RESEND_API_KEY environment variable on the host —
// never in the client bundle.
import { sendLead } from "../lib/sendLead.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Vercel parses JSON bodies automatically; fall back to manual parse.
  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = {};
    }
  }

  const result = await sendLead(payload || {});
  if (result.ok) {
    res.status(200).json({ ok: true });
  } else {
    res.status(result.status || 500).json({ error: result.error });
  }
}
