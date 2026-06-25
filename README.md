# Benny's Portfolio

Personal branded portfolio for **Benny** — creative director, AI systems builder
(DigiDental / Denty AI receptionist for dental clinics), web & content producer,
and calisthenics athlete.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · `motion` (Framer Motion) · `lucide-react`.
Single-page, client-rendered (no SSR/SSG).

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # Vite dev server on http://localhost:3000
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # tsc --noEmit type check
```

## Configuration

Copy `.env.example` → `.env.local` and set `APP_URL` to the production domain
(used for canonical/OG tags and `sitemap.xml`).

## Project map

See [`SITE_MAP.md`](./SITE_MAP.md) for the full view/section/asset inventory and
[`CHANGELOG.md`](./CHANGELOG.md) for the optimization history and the deferred
punch-list.
</content>
