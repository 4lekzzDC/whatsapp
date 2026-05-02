-- Sectors and WhatsApp connections for FalaHub.
-- Run in the Supabase SQL editor (or via supabase db push).

create extension if not exists "pgcrypto";

create table if not exists public.sectors (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text,
  created_at timestamptz not null default now()
);

create index if not exists sectors_owner_id_idx on public.sectors(owner_id);

create table if not exists public.whatsapp_connections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  instance_name text not null unique,
  sector_id uuid references public.sectors(id) on delete set null,
  phone text,
  status text not null default 'disconnected'
    check (status in ('disconnected','connecting','qr','connected')),
  last_qr text,
  last_qr_at timestamptz,
  last_seen_at timestamptz,
  messages_count integer not null default 0,
  battery integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists whatsapp_connections_owner_id_idx on public.whatsapp_connections(owner_id);

create or replace function public.touch_whatsapp_connections_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists whatsapp_connections_touch on public.whatsapp_connections;
create trigger whatsapp_connections_touch
before update on public.whatsapp_connections
for each row execute function public.touch_whatsapp_connections_updated_at();

alter table public.sectors enable row level security;
alter table public.whatsapp_connections enable row level security;

drop policy if exists "sectors owner read"   on public.sectors;
drop policy if exists "sectors owner write"  on public.sectors;
drop policy if exists "sectors owner update" on public.sectors;
drop policy if exists "sectors owner delete" on public.sectors;
create policy "sectors owner read"   on public.sectors for select using (auth.uid() = owner_id);
create policy "sectors owner write"  on public.sectors for insert with check (auth.uid() = owner_id);
create policy "sectors owner update" on public.sectors for update using (auth.uid() = owner_id);
create policy "sectors owner delete" on public.sectors for delete using (auth.uid() = owner_id);

drop policy if exists "wa_conn owner read"   on public.whatsapp_connections;
drop policy if exists "wa_conn owner write"  on public.whatsapp_connections;
drop policy if exists "wa_conn owner update" on public.whatsapp_connections;
drop policy if exists "wa_conn owner delete" on public.whatsapp_connections;
create policy "wa_conn owner read"   on public.whatsapp_connections for select using (auth.uid() = owner_id);
create policy "wa_conn owner write"  on public.whatsapp_connections for insert with check (auth.uid() = owner_id);
create policy "wa_conn owner update" on public.whatsapp_connections for update using (auth.uid() = owner_id);
create policy "wa_conn owner delete" on public.whatsapp_connections for delete using (auth.uid() = owner_id);
