# Supabase

This project uses Supabase **only as object storage** for the portfolio's
images and video. There is no application database/table in use by the site
(the old lead-capture/submissions code was dead and was removed during the
optimization pass).

## What's here

```
supabase/
  migrations/
    20260625171149_storage_privacy_policies.sql   # storage RLS hardening
```

### `20260625171149_storage_privacy_policies.sql`

Locks down the two public media buckets (`Images`, `Videos (Under 30s)`):

- **Public READ** — so the site loads media over the public CDN endpoint.
- **Authenticated-only WRITE/UPDATE/DELETE** — so no anonymous visitor can
  upload, overwrite, or delete your media.

It's idempotent (drop-if-exists + create) and scoped to those two buckets, so
it won't touch any other policies you may have.

## How to apply

Pick **one** — the migration is the same either way.

### Option A — Dashboard SQL Editor (simplest, zero config)

1. Supabase Dashboard → your project → **SQL Editor**.
2. Paste the contents of `migrations/20260625171149_storage_privacy_policies.sql`.
3. **Run**. Done.

### Option B — Supabase CLI / GitHub integration

If you've run `supabase init` and linked the project
(`supabase link --project-ref mdotuapbbscuxdnbudri`), this file will be picked
up by `supabase db push` (or your GitHub deploy action) as a normal migration.

## Verify it worked

After applying, in the Dashboard go to **Storage → Policies** and confirm the
four `portfolio_media_*` policies exist on `storage.objects`. Then load the
live site and confirm images/video still display (public read intact).

> Heads-up: the build/CI sandbox cannot reach `*.supabase.co` (network policy),
> so these policies could not be tested against your live project from here —
> please confirm in the Dashboard.

## Next step (not done yet): email via Resend

You mentioned using **Resend (free tier)** to receive contact/newsletter
submissions. That belongs in a server-side function (e.g. a Supabase Edge
Function) so the API key never ships to the browser. When you're ready, add
`RESEND_API_KEY` as a Supabase secret and we can scaffold the function +
re-wire the footer/contact forms to call it.
