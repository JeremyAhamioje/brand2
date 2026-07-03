# Fully Managed — remote staffing landing page

A React + Vite marketing site for a **fully managed** remote-staffing product:
we recruit, vet, onboard, pay, and manage a dedicated remote professional for
one flat monthly price. Dark, premium enterprise design with an interactive
Three.js globe.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Structure

```
src/
├─ data/
│  ├─ content.js              # global config: BOOKING_URL
│  └─ models/
│     └─ fullyManaged.js      # ALL copy/pricing/FAQ — the single content source
├─ context/
│  └─ ModelContext.jsx        # thin `useModel()` accessor for the content object
├─ components/
│  └─ icons.jsx               # shared inline SVG icons
├─ managed/                   # the entire experience (dark design system)
│  ├─ ManagedPage.jsx         # page shell + hash routing (#onboarding, #infrastructure)
│  ├─ ManagedNav / ManagedHero / Sections / Conversion   # sections
│  ├─ OnboardingPage / InfrastructurePage                # standalone sub-pages
│  ├─ Globe.jsx / OrbitModel.jsx                          # Three.js visuals
│  ├─ SceneBackground.jsx     # scroll-driven black↔cream background
│  ├─ managed.css             # scoped design system (`.managed`)
│  └─ assets/                 # images + earth texture
└─ App.jsx                    # renders <ManagedPage />
```

- **Content is data.** Every section reads `useModel().content.<section>`
  from `src/data/models/fullyManaged.js` — editing copy never touches a
  component.
- **Routing** is a tiny hash router in `ManagedPage.jsx`: `#onboarding` and
  `#infrastructure` render dedicated pages; every other hash is an in-page
  anchor.
- **Color transitions** are handled by `SceneBackground.jsx`, a fixed
  full-viewport layer that fades between dark and cream as `.m-light` sections
  cross the viewport.

## Configuration

### Booking link

`BOOKING_URL` in `src/data/content.js` — set to your Calendly/scheduler URL and
every "Book a call" button uses it. Left empty, buttons scroll to the contact
form at the bottom of the page.

### Contact form → email (Resend)

Form submissions POST to a serverless function that emails the lead via
[Resend](https://resend.com). **The API key is server-side only — never in the
client bundle.**

- `api/lead.js` — serverless function (Vercel-style) that receives the form.
- `lib/sendLead.js` — shared sender (validation + Resend call).
- `vite.config.js` — dev middleware so `/api/lead` also works under `vite dev`.

Set these environment variables (copy `.env.example` → `.env` locally, and set
them in your host's dashboard for production):

| Variable          | Purpose                                                        |
| ----------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`  | Your Resend API key.                                          |
| `LEAD_TO_EMAIL`   | Where lead emails are delivered.                             |
| `LEAD_FROM_EMAIL` | Verified sender. Until you verify a domain in Resend, the default `onboarding@resend.dev` only delivers to your own Resend account email. |

`.env` is gitignored so the key is never committed.

## The globe (`src/managed/Globe.jsx`)

- Built with `three` + `@react-three/fiber` (drei is intentionally not used;
  OrbitControls comes straight from `three/examples`).
- Continents are a **dot field sampled from a bundled Earth map**
  (`src/managed/assets/earth-dark.jpg`) — no grid lines, no external requests
  at runtime.
- Talent nodes (US client → Nigeria, India, Philippines) are connected by
  animated great-circle arcs with particles flowing along them, and each node
  carries a billboarded **country label block** that fades out on the far side.
- It's lazy-loaded (`React.lazy`) into its own chunk, and honours
  `prefers-reduced-motion`.

To swap the globe texture, drop a new equirectangular Earth image at
`src/managed/assets/earth-dark.jpg` (land brighter than ocean); tune the
`threshold`/`rows` in `buildLandDots`.
