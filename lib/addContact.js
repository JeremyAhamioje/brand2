// ============================================================
// Server-side newsletter signup → Resend Audience (contact list).
//
// Runs ONLY on the server (the /api/subscribe function in prod, and
// the Vite dev middleware locally). Adding a contact needs a
// FULL-ACCESS Resend key (the send-only key can't manage contacts),
// plus the target audience id. The key is never sent to the browser.
// ============================================================

const RESEND_BASE = "https://api.resend.com";
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Adds an email to the configured Resend audience. Returns
// { ok, status, error }. Treats "already subscribed" as success.
export async function addContact(payload = {}) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey) {
    return { ok: false, status: 500, error: "Newsletter is not configured (missing RESEND_API_KEY)." };
  }
  if (!audienceId) {
    return { ok: false, status: 500, error: "Newsletter is not configured (missing RESEND_AUDIENCE_ID)." };
  }

  const email = String(payload.email || "").trim().toLowerCase();
  if (!isEmail(email)) {
    return { ok: false, status: 400, error: "Please enter a valid email address." };
  }

  try {
    const res = await fetch(`${RESEND_BASE}/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!res.ok) {
      let detail = `Resend responded ${res.status}`;
      try {
        const body = await res.json();
        if (body && body.message) detail = body.message;
      } catch {
        /* ignore parse failure */
      }
      // Already on the list → treat as a successful signup.
      if (res.status === 409 || /already/i.test(detail)) {
        return { ok: true, status: 200 };
      }
      return { ok: false, status: 502, error: detail };
    }

    return { ok: true, status: 200 };
  } catch (err) {
    return { ok: false, status: 502, error: err?.message || "Failed to reach email service." };
  }
}
