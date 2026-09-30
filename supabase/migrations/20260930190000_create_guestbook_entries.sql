create table if not exists public.guestbook_entries (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 50),
  message text not null check (char_length(message) between 1 and 280),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.guestbook_entries enable row level security;

create policy "approved guestbook entries are public"
on public.guestbook_entries for select
to anon, authenticated
using (approved = true);

create policy "visitors may submit moderated entries"
on public.guestbook_entries for insert
to anon, authenticated
with check (approved = false);

create index if not exists guestbook_entries_approved_created_at_idx
on public.guestbook_entries (approved, created_at desc);
