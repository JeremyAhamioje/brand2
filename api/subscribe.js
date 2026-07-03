// Serverless function (Vercel-style): POST /api/subscribe
// Adds a newsletter signup to a Resend Audience. The API key lives in
// the RESEND_API_KEY env var on the host — never in the client bundle.
import { addContact } from "../lib/addContact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = {};
    }
  }

  const result = await addContact(payload || {});
  if (result.ok) {
    res.status(200).json({ ok: true });
  } else {
    res.status(result.status || 500).json({ error: result.error });
  }
}
