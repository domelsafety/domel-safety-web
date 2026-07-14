-- Domel Safety: core form tables
create table if not exists public.quotations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  company text,
  email text not null,
  phone text not null,
  service text not null,
  details text,
  status text not null default 'new'
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  company text,
  email text not null,
  phone text not null,
  property_type text not null,
  preferred_date date not null,
  address text not null,
  notes text,
  status text not null default 'new'
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new'
);

-- Enable Row Level Security
alter table public.quotations enable row level security;
alter table public.bookings enable row level security;
alter table public.contact_messages enable row level security;

-- Allow anyone (site visitors) to submit new rows, but not read/update/delete
create policy "Public can insert quotations" on public.quotations
  for insert to anon with check (true);

create policy "Public can insert bookings" on public.bookings
  for insert to anon with check (true);

create policy "Public can insert contact messages" on public.contact_messages
  for insert to anon with check (true);
