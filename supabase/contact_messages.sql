create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project_type text not null,
  message text not null,
  email_status text not null default 'pending'
    check (email_status in ('pending', 'sent', 'failed')),
  email_provider_id text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

grant usage on schema public to service_role;
grant select, insert, update on public.contact_messages to service_role;

comment on table public.contact_messages is
  'Contact form submissions from the portfolio website. Inserts are performed by a server-side Supabase service role key.';
