# Brand landing — dual-model homepage

A React + Vite landing page with a **toggle** that switches the entire page
between two engagement models, live, without navigating away:

- **Hire Yourself** (Brand 1) — we vet, you hire/pay/manage directly, one flat one-time fee.
- **Fully Managed** (Brand 2) — a dedicated professional we recruit, onboard, pay, and manage for one flat monthly price.

Switching the toggle changes the brand name, accent color, hero, problem,
solution, roles, onboarding flow, pricing, guarantee, why-us, FAQ, and CTA.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## How the toggle works

```
src/
├─ data/
│  ├─ content.js              # shared config: BOOKING_URL, DEFAULT_MODEL
│  └─ models/
│     ├─ hireYourself.js      # ALL copy/pricing/FAQ for Brand 1
│     ├─ fullyManaged.js      # ALL copy/pricing/FAQ for Brand 2
│     └─ index.js             # MODELS registry + MODEL_ORDER (toggle order)
├─ context/
│  └─ ModelContext.jsx        # holds active model; exposes resolved `content`
├─ components/
│  ├─ ModelToggle.jsx         # the segmented toggle control
│  ├─ Hero / Problem / Solution / Roles / HowItWorks /
│  │  Pricing / Guarantee / WhyUs / FAQ / FinalCTA   # pure renderers of `content`
│  └─ Navbar / Footer / BookButton / icons
├─ pages/
│  └─ HomePage.jsx            # mode-bar + key-swapped section stack
└─ App.jsx                    # shell; sets data-model for accent theming
```

- **Content is data.** Every section reads `useModel().content.<section>`.
  Both models share the same schema (see the two files in `data/models/`),
  so editing copy never touches a component — just the data file.
- **Theming** is driven by `data-model` on the app root (`App.jsx`).
  `index.css` swaps the `--accent*` CSS variables for the Fully Managed model
  (warm gold → electric blue), so the whole palette moves with the toggle.
- **The swap animation** comes from `key={model}` on the section wrapper in
  `HomePage.jsx`, which replays a subtle entrance each time the model changes.

### Change what shows first

`src/data/content.js` → `DEFAULT_MODEL` (`"managed"` or `"hire"`).

### Wire up the booking link / form

- `BOOKING_URL` in `src/data/content.js` — set to your Calendly/scheduler URL
  and every "Book a call" button uses it. Left empty, buttons scroll to the
  contact form. The form submission payload includes the selected `model`.
- `FORM_ENDPOINT` in `src/components/FinalCTA.jsx` — paste a Formspree (or
  similar) URL to receive submissions by email.

## The two products

The toggle swaps between two **completely different** experiences:

- **Hire Yourself (Brand 1)** — the warm, editorial page in `src/components/` +
  `src/pages/HomePage.jsx`.
- **Fully Managed (Brand 2)** — a dark, premium enterprise experience in
  `src/managed/`, with its own design system (`managed.css`), tight grotesque
  typography (Hanken Grotesk), and an interactive Three.js globe.

`App.jsx` renders one or the other based on `model`.

### The globe (`src/managed/Globe.jsx`)

- Built with `three` + `@react-three/fiber` (drei is intentionally not used;
  OrbitControls comes straight from `three/examples`).
- Continents are a **dot field sampled from a bundled Earth map**
  (`src/managed/assets/earth-dark.jpg`) — no grid lines, no external requests
  at runtime.
- Talent nodes (US client → Nigeria, India, Philippines) are connected by
  animated great-circle arcs with particles flowing along them, and each node
  carries a billboarded **country label block** that fades out on the far side.
- It's lazy-loaded (`React.lazy`) into its own chunk, and honours
  `prefers-reduced-motion` (no auto-rotation / particle motion, on-demand
  rendering).

To swap the globe texture, drop a new equirectangular Earth image at
`src/managed/assets/earth-dark.jpg` (land brighter than ocean); tune the
`threshold`/`rows` in `buildLandDots`.
