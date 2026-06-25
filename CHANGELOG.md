# CHANGELOG

## Optimization pass — 2026-06-25 (branch `claude/modest-carson-rwk6d7`)

> Branch note: the task brief asked for `optimize/seo-perf-security`, but this
> environment is pinned to develop on `claude/modest-carson-rwk6d7`, so all work
> landed there. Rename/retarget on merge if desired.

This pass prioritized **high-value, low-risk, fully-verifiable** changes (type
check + production build pass after every commit) and **flagged** the invasive or
decision/credential-gated work for Benny rather than doing it blind. See the
**Deferred punch-list** below.

### Phase 0 — Repo scan & site map
- Added [`SITE_MAP.md`](./SITE_MAP.md): every view/section/anchor, all outbound
  links, external data deps (Supabase storage, CloudFront, Unsplash, fonts), and
  a full asset inventory with consumers. Includes a Mermaid graph.
- **Findings that corrected the brief** (see SITE_MAP §7):
  - There is **no rendered contact `<form>`**. The lead-capture stack in `App.tsx`
    (`handleFormSubmit`, `sanitizeInput`, `saveSubmissions`, `localStorage`,
    honeypot) + `AdminPanel` + the Header "SECURED" pill are **unreachable dead
    code**. Contact is via `mailto:`/WhatsApp/Instagram links, which *do* reach
    Benny — so leads are not being silently dropped by a broken form. (The footer
    newsletter form *does* go nowhere.)
  - Local `src/assets/images/` and the remote signed-URL images are **mostly
    different images**, so remote→local swaps are only safe on exact matches.
  - `@google/genai`, `express`, `dotenv` are imported nowhere. `OFFERS[]` and
    `TESTIMONIALS[]` in `data.ts` are unused (offers JSX is hardcoded; testimonials
    use a local array). Only `PROJECTS`/`PRACTICES`/`FAQS` are consumed.

### Phase 1 — Security (partial; the rest needs Benny's access — see punch-list)
- **1.4 Done:** removed unused `@google/genai` dependency; cleared the
  `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` capability and the `GEMINI_API_KEY`
  from `.env.example`/README. Documented the rule that provider keys must never be
  client-bundled.
- **1.1 Documented + decoded:** the 11 Supabase signed URLs carry JWTs issued
  ~2026-06 that **expire ~2027-06** (verified by decoding). Treat as compromised.
  The proper fix (public marketing bucket *or* server-side signing + token
  rotation) needs Benny's Supabase access — see punch-list.

### Phase 2 — SEO
- **2.1 Done:** rewrote `index.html` — branded `<title>`, meta description,
  `canonical`, full Open Graph + Twitter card set, `theme-color`, and
  `Person`/`Organization` JSON-LD with `sameAs` for all socials.
- Favicon moved out of `src/assets/images/"Benny Icon.png"` (had a space) into
  `/public` as optimized `favicon-32x32.png`, `apple-touch-icon.png`,
  `benny-icon.png` (540 KB → 34 KB) + a real `og-image.jpg` (1200×630, 52 KB).
- **2.2 Done:** added `public/robots.txt` + `public/sitemap.xml`.
- **2.3 Partial:** added SPA fallback (`public/_redirects` for Netlify,
  `vercel.json` for Vercel) so the existing `history.pushState` routes
  (`/work`, `/offers`, `/contact`) resolve on direct load/refresh — making the
  sitemap URLs valid. **Per-route `<title>`/meta + prerendering remain deferred**
  (needs `react-router` + a prerender step — flagged, not started).
- **2.4 Partial:** descriptive `id`s on all home/work/offers/contact sections;
  improved `alt` text; fixed the broken contact "YouTube" CTA (was `youtube.com`
  root → `/@bennyunmatched`).

### Phase 3 — Performance
- **3.2 Done:** `loading="lazy"` + `decoding="async"` on below-the-fold images
  (featured case study, work list, contact collage, project modal); hero/persona
  kept eager to protect LCP.
- **3.1/3.3/3.4/3.5 Deferred** — see punch-list (heavy image re-encode needs the
  remote originals; code-splitting rides on the Phase 4 decomposition).

### Verification
- `npm run lint` (tsc --noEmit) ✅ and `npm run build` ✅ after every commit.
- Current prod bundle: `index-*.js` ≈ 484 KB (144 KB gzip), CSS ≈ 68 KB (12 KB
  gzip), `index.html` ≈ 4.5 KB. No code-splitting yet (single chunk).

---

## Deferred punch-list (prioritized; effort × impact)

Legend — Effort: S(<2h) · M(half-day) · L(1–2d) · XL(>2d). Impact: ★–★★★.

| # | Item | Why deferred | Effort | Impact |
|---|---|---|---|---|
| 1 | **Rotate the leaked Supabase tokens + decide history scrub** (Phase 1.1) | Needs Benny's Supabase access; `git filter-repo`/BFG rewrite is destructive on a shared public repo → explicit go-ahead required | S (rotate) / M (scrub) | ★★★ |
| 2 | **Move marketing assets to a public (token-less) bucket _or_ sign server-side** (Phase 1.1) | Needs Supabase access; also fixes the ~2027-06 expiry that will silently 404 every project/hero image | M | ★★★ |
| 3 | **Wire the footer newsletter + a real contact form to a backend** (Phase 1.2) | Needs Benny to pick a destination (Resend/SendGrid/Formspree/Supabase table + serverless) and provide creds. Note: there is currently *no* contact form, only mailto/WhatsApp — decide whether to (re)add one | M | ★★☆ |
| 4 | **Remove the dead lead-capture + AdminPanel code** (Phase 1.3 / 4) | It's unreachable and the "SECURED IN LOCALSTORAGE SANDBOX" copy is misleading. Removal is a product decision (vs. building a real authed admin once #3 exists) | S | ★★☆ |
| 5 | **Real routing + prerendering** (Phase 2.3) | `react-router` for `/`,`/work`,`/offers`,`/contact` with per-route `<title>`/meta, then prerender (`vite-plugin-ssr`/`react-snap`) so crawlers get real HTML, not an empty `#root`. Invasive — brief asks for a go-ahead first | L | ★★★ |
| 6 | **Decompose `App.tsx` (1,581 lines) into per-section components** (Phase 4.1) | Large refactor; should land with #7 to enable code-splitting. Risky to do blind without visual QA | L | ★★☆ |
| 7 | **Code-split with `React.lazy`/`Suspense`** (Phase 3.3) | Depends on #6; lazy-load `Testimonials`/`FAQ`/`BottomBento`/`ProjectModal` to shrink the 484 KB initial chunk | M | ★★☆ |
| 8 | **Re-encode images to WebP/AVIF + responsive `srcset`/`sizes`** (Phase 3.1) | The *displayed* images are remote signed URLs (can't fetch/process without the originals); local set is mostly orphaned. Best done after #2 | M–L | ★★☆ |
| 9 | **Lazy-load the two autoplay background videos** (hero + footer) | They `preload="auto"` and download immediately on every visit (heavy). Needs an IntersectionObserver/poster approach, not a one-liner | M | ★★☆ |
| 10 | **Make `data.ts` the single source of truth** (Phase 4.2) | Move the hardcoded Offers JSX to `OFFERS[]`, reconcile `TESTIMONIALS[]`, delete unused arrays | M | ★☆☆ |
| 11 | **Bundle visualizer + icon tree-shaking audit** (Phase 3.4) | Add `rollup-plugin-visualizer`; confirm `lucide-react`/`motion` are tree-shaken | S | ★☆☆ |
| 12 | **Delete ~17 MB orphaned images / remove unused `express`+`dotenv`** | Repo hygiene; confirm none are needed first (some may be the Supabase originals) | S | ★☆☆ |
| 13 | **Before/after Lighthouse (mobile+desktop)** (Phase 3.5) | Needs a headless Chrome run against a deployed/preview URL; capture once #5–#9 land | S | ★★☆ |

### Decisions needed from Benny (blockers for the above)
1. **Production domain** — used as a placeholder `https://ceobennyco.com` in
   canonical/OG/sitemap/robots. Confirm or replace.
2. **Supabase** — make the marketing bucket public, or stand up server-side
   signing? And rotate the exposed tokens.
3. **Git history scrub** for the leaked tokens — yes/no (destructive rewrite).
4. **Lead capture** — which backend, and do you want a real contact form?
5. **Go-ahead on the big refactors** — routing/prerender (#5) and the `App.tsx`
   decomposition + code-split (#6–#7)?
