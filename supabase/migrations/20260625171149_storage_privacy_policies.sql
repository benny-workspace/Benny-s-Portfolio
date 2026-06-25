-- Storage privacy hardening for the portfolio media buckets.
--
-- Context: the `Images` and `Videos (Under 30s)` buckets are set PUBLIC so the
-- portfolio loads its images/video over the public CDN endpoint
-- (/storage/v1/object/public/...). "Public" only governs anonymous READ.
-- Writes (insert/update/delete) are still governed by RLS on storage.objects.
--
-- This migration makes the intended posture explicit and defensive:
--   * anyone may READ objects in these two buckets (needed for the site)
--   * only AUTHENTICATED users may upload / overwrite / delete media
--
-- It is safe & idempotent: it only drops/creates policies by the exact names
-- defined here (which won't collide with Supabase's auto-generated ones), and
-- each policy is scoped to these specific bucket_ids, so a name mismatch simply
-- matches nothing rather than affecting other buckets.
--
-- NOTE: RLS is already enabled on storage.objects by default in Supabase; this
-- migration does not toggle it.

-- Public read for the portfolio media buckets ------------------------------
drop policy if exists "portfolio_media_public_read" on storage.objects;
create policy "portfolio_media_public_read"
  on storage.objects
  for select
  to public
  using (bucket_id in ('Images', 'Videos (Under 30s)'));

-- Authenticated-only insert -------------------------------------------------
drop policy if exists "portfolio_media_auth_insert" on storage.objects;
create policy "portfolio_media_auth_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id in ('Images', 'Videos (Under 30s)'));

-- Authenticated-only update -------------------------------------------------
drop policy if exists "portfolio_media_auth_update" on storage.objects;
create policy "portfolio_media_auth_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id in ('Images', 'Videos (Under 30s)'))
  with check (bucket_id in ('Images', 'Videos (Under 30s)'));

-- Authenticated-only delete -------------------------------------------------
drop policy if exists "portfolio_media_auth_delete" on storage.objects;
create policy "portfolio_media_auth_delete"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id in ('Images', 'Videos (Under 30s)'));
