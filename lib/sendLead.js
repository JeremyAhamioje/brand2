// ============================================================
// Server-side lead → email via Resend.
//
// This module runs ONLY on the server (the /api/lead serverless
// function in production, and the Vite dev middleware locally).
// The Resend API key is read from process.env and is NEVER sent
// to the browser, so it can't leak into the client bundle.
// ============================================================

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function esc(value = "") {
  return String(value).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Sends a lead notification. Returns { ok, status, error }.
export async function sendLead(payload = {}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: "Email is not configured (missing RESEND_API_KEY)." };
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const role = String(payload.role || "").trim();
  const details = String(payload.details || "").trim();
  const product = String(payload.model || "").trim();

  if (!name || !email) {
    return { ok: false, status: 400, error: "Name and email are required." };
  }
  if (!isEmail(email)) {
    return { ok: false, status: 400, error: "Please enter a valid email address." };
  }

  // `to` = where you receive leads. `from` must be a verified domain
  // on Resend; onboarding@resend.dev works out of the box but only
  // delivers to your own Resend account email until you verify one.
  const to = process.env.LEAD_TO_EMAIL || "eventsarbitrage@gmail.com";
  const from = process.env.LEAD_FROM_EMAIL || "Managed Leads <onboarding@resend.dev>";

  const productLabel = product === "managed" ? "Fully Managed" : product === "hire" ? "Hire Yourself" : product || "—";
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Role", role || "—"],
    ["Product", productLabel],
    ["Details", details || "—"],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#16181f">
      <h2 style="font-size:20px;margin:0 0 16px">New lead from your site</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:10px 14px;border:1px solid #e6e2d8;background:#faf7f1;font-weight:600;width:120px;vertical-align:top">${esc(k)}</td>
            <td style="padding:10px 14px;border:1px solid #e6e2d8;white-space:pre-wrap">${esc(v)}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New lead: ${name}${role ? ` — ${role}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      let detail = `Resend responded ${res.status}`;
      try {
        const body = await res.json();
        if (body && body.message) detail = body.message;
      } catch {
        /* ignore parse failure */
      }
      return { ok: false, status: 502, error: detail };
    }

    return { ok: true, status: 200 };
  } catch (err) {
    return { ok: false, status: 502, error: err?.message || "Failed to reach email service." };
  }
}
