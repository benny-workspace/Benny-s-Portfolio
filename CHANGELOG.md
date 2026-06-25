# CHANGELOG

## Post-merge — 2026-06-25 (branch `main`)
- Merged the optimization pass into `main`; deleted the `claude/modest-carson-rwk6d7`
  feature branch (local + remote). `main` is now the only branch.
- Bucket made public by Benny ✅ — punch-list item #1 done.
- Added `supabase/migrations/20260625171149_storage_privacy_policies.sql`:
  storage RLS so the `Images` / `Videos (Under 30s)` buckets stay public-read
  but only authenticated users can write/update/delete media. Apply via the
  Dashboard SQL Editor or `supabase db push` (see `supabase/README.md`).
  ⚠️ Could not be tested live — the sandbox can't reach `*.supabase.co`; verify
  in the Supabase Dashboard.

## Optimization pass — 2026-06-25 (branch `claude/modest-carson-rwk6d7`)

> Branch note: the task brief asked for `optimize/seo-perf-security`, but this
> environment is pinned to develop on `claude/modest-carson-rwk6d7`, so all work
> landed there. Rename/retarget on merge if desired.

Type check (`tsc --noEmit`) and production build pass after every commit, and a
headless-Chromium smoke test (navigation, project modal, direct route loads,
catch-all redirect, per-route canonical) passes with no JS errors.

### Phase 0 — Repo scan & site map
- Added [`SITE_MAP.md`](./SITE_MAP.md): views/sections/anchors, outbound links,
  external data deps, full asset inventory, Mermaid graph.
- Corrected the brief's premises: **no contact `<form>` was ever rendered** (the
  lead-capture stack was dead code; contact is via mailto/WhatsApp/IG); local vs.
  remote images are mostly different; `@google/genai`/`express`/`dotenv` and the
  `OFFERS[]`/`TESTIMONIALS[]` arrays were unused.

### Phase 1 — Security
- **1.1 Done** — converted all 11 Supabase storage URLs from signed
  `/object/sign/…?token=<JWT>` to clean `/object/public/…`. This removes the
  leaked tokens from source **and** fixes the ~2027-06 expiry.
  ⚠️ **Requires Benny to set the bucket(s) public in Supabase** (his chosen
  option) — until then those images/video 404. History scrub intentionally
  skipped (rotating/replacing access makes the old tokens moot).
- **1.3 Done** — removed the unreachable/misleading lead-capture + admin code:
  `AdminPanel.tsx`, the `Submission` type, and the Header "SECURED" pill.
- **1.4 Done** — dropped unused `@google/genai`; cleared the Gemini capability
  and `GEMINI_API_KEY`; documented that provider keys must stay server-side.
- **1.2 Deferred (Benny's choice)** — forms not wired to a backend this round.

### Phase 2 — SEO
- **2.1 Done** — `index.html`: branded title, meta description, canonical,
  full Open Graph + Twitter cards, `Person`/`Organization` JSON-LD with `sameAs`.
  Favicon moved to `/public` (no space in name), optimized
  (`benny-icon.png` 540 KB → 34 KB) + `favicon-32x32`, `apple-touch-icon`, and a
  real `og-image.jpg` (1200×630, 52 KB). Domain = `https://ceobenny.com`.
- **2.2 Done** — `public/robots.txt` + `public/sitemap.xml`.
- **2.3 Done** — `react-router-dom` v7 with real URLs for `/`, `/work`,
  `/offers`, `/contact` (+ `/home`→`/` and catch-all→`/`). Per-route
  `<title>`/description/canonical/OG via `usePageMeta`. SPA fallback
  (`public/_redirects` + `vercel.json`). **Prerendering** via
  `scripts/prerender.mjs` + `npm run build:prerender` writes real per-route HTML
  to `dist/<route>/index.html` for non-JS crawlers (decoupled from the default
  `build` because it needs a Chromium binary).
- **2.4 Done** — descriptive `id`s on every section; improved `alt` text; fixed
  the broken contact "YouTube" CTA (`youtube.com` → `/@bennyunmatched`).

### Phase 3 — Performance
- **3.2 Done** — `loading="lazy"` + `decoding="async"` on below-the-fold media.
- **3.3 Done** — code-splitting: route-level lazy pages + `React.lazy` for
  `Testimonials`, `FAQ`, `BottomBento`, `ProjectModal`. Initial JS chunk
  484 KB → 430 KB (139 KB gzip) with separate route/lazy chunks.
- **3.1 / 3.4 / 3.5 / video-lazy — Deferred** (see punch-list).

### Phase 4 — Architecture
- **4.1 Done** — the 1,581-line `App.tsx` monolith is now a thin layout shell;
  every section lives in `src/sections/*` and each view in `src/pages/*`. Shared
  helpers extracted (`CountUp`, `ScrollRevealParagraph`).
- **4.2 Deferred** — make `data.ts` the single source of truth (offers JSX still
  hardcoded; `OFFERS[]`/`TESTIMONIALS[]` still unused).
- **4.3** — `npm run lint` (`tsc --noEmit`) passes clean.

---

## Deferred punch-list (prioritized; effort × impact)

Legend — Effort: S(<2h) · M(half-day) · L(1–2d). Impact: ★–★★★.

| # | Item | Notes | Effort | Impact |
|---|---|---|---|---|
| 1 | **Set the Supabase bucket(s) public** | Benny's Supabase action; the code already points at `/object/public/` URLs. Until done, project/hero media 404 | S | ★★★ |
| 2 | **Buy/connect `ceobenny.com` + deploy with `build:prerender`** | Domain not yet purchased. Point the host build command at `npm run build:prerender` so crawlers get per-route HTML | S | ★★★ |
| 3 | **Wire newsletter + (optional) contact form to a backend** (P1.2) | Pick Resend/SendGrid/Formspree/Supabase-table + serverless; keep keys server-side. Not selected this round | M | ★★☆ |
| 4 | **Re-encode images to WebP/AVIF + responsive `srcset`** (P3.1) | Best after the bucket is public (fetch/process the real originals) | M–L | ★★☆ |
| 5 | **Lazy-load the two autoplay background videos** (hero + footer) | They `preload="auto"` and download on every visit; needs IntersectionObserver/poster | M | ★★☆ |
| 6 | **`data.ts` as single source of truth** (P4.2) | Move hardcoded Offers JSX into `OFFERS[]`; reconcile/remove unused arrays | M | ★☆☆ |
| 7 | **Bundle visualizer + icon tree-shaking audit** (P3.4) | Add `rollup-plugin-visualizer`; confirm `lucide-react`/`motion` tree-shake | S | ★☆☆ |
| 8 | **Delete ~17 MB orphaned images; remove unused `express`/`dotenv`** | Confirm none are needed (some may be the Supabase originals) | S | ★☆☆ |
| 9 | **Before/after Lighthouse (mobile+desktop)** (P3.5) | Needs a deployed/preview URL with the public bucket live | S | ★★☆ |
| 10 | **Slim the prerendered `/contact` HTML (≈359 KB)** | `ScrollRevealParagraph` splits every character into a span; consider prerendering a plain-text fallback for that block | S | ★☆☆ |

### Open decisions / actions for Benny
1. **Set the Supabase bucket public** so the new `/object/public/` URLs resolve.
2. **Buy `ceobenny.com`** (placeholder in canonical/OG/sitemap) and set the
   deploy build to `npm run build:prerender`.
3. **Rotate** the previously-committed Supabase tokens at your convenience
   (history was intentionally not rewritten).
4. **Lead capture** — if you want the forms to actually send, pick a provider.
