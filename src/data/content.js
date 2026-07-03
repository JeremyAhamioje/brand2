// ============================================================
// SITE CONFIG — settings that DON'T change with the toggle.
// The wording, pricing, roles, and FAQs now live per-model in
//   src/data/models/hireYourself.js   (Hire Yourself / Brand 1)
//   src/data/models/fullyManaged.js   (Fully Managed / Brand 2)
// and are swapped live by the homepage toggle.
// ============================================================

// -- Booking link --------------------------------------------
// Every "Book a call" button uses this. Paste your scheduling
// link here (e.g. your Calendly URL). While it's left empty,
// the buttons instead scroll down to the contact form at the
// bottom of the page, so nothing breaks in the meantime.
export const BOOKING_URL = ""; // e.g. "https://calendly.com/yourname/15min"

// -- Which model shows first ---------------------------------
// "managed" = Fully Managed (Brand 2) is selected on load.
// "hire"    = Hire Yourself (Brand 1) is selected on load.
export const DEFAULT_MODEL = "managed";
