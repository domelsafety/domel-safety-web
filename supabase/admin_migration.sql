-- ============================================
-- DOMEL SAFETY: Admin Dashboard Migration
-- ============================================

-- 1. GALLERY ITEMS
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  location text,
  image_url text not null,
  sort_order int not null default 0
);
alter table public.gallery_items enable row level security;
create policy "Public can read gallery" on public.gallery_items
  for select to anon using (true);
create policy "Authenticated can manage gallery" on public.gallery_items
  for all to authenticated using (true) with check (true);

-- 2. BLOG POSTS
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  cover_url text,
  published boolean not null default false
);
alter table public.blog_posts enable row level security;
create policy "Public can read published posts" on public.blog_posts
  for select to anon using (published = true);
create policy "Authenticated can manage posts" on public.blog_posts
  for all to authenticated using (true) with check (true);

-- 3. INVOICES
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  invoice_number text not null unique,
  quotation_id uuid references public.quotations(id) on delete set null,
  client_name text not null,
  client_company text,
  client_email text,
  client_phone text,
  client_address text,
  apply_vat boolean not null default true,
  vat_rate numeric not null default 18,
  notes text,
  status text not null default 'unpaid'
);
alter table public.invoices enable row level security;
create policy "Authenticated can manage invoices" on public.invoices
  for all to authenticated using (true) with check (true);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null,
  quantity numeric not null default 1,
  unit_price numeric not null default 0,
  sort_order int not null default 0
);
alter table public.invoice_items enable row level security;
create policy "Authenticated can manage invoice items" on public.invoice_items
  for all to authenticated using (true) with check (true);

-- 4. ALLOW ADMIN (authenticated) TO READ/UPDATE existing form tables
create policy "Authenticated can read quotations" on public.quotations
  for select to authenticated using (true);
create policy "Authenticated can update quotations" on public.quotations
  for update to authenticated using (true) with check (true);

create policy "Authenticated can read bookings" on public.bookings
  for select to authenticated using (true);
create policy "Authenticated can update bookings" on public.bookings
  for update to authenticated using (true) with check (true);

create policy "Authenticated can read messages" on public.contact_messages
  for select to authenticated using (true);
create policy "Authenticated can update messages" on public.contact_messages
  for update to authenticated using (true) with check (true);

-- 5. STORAGE BUCKETS
insert into storage.buckets (id, name, public)
values ('gallery-images', 'gallery-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

create policy "Public read gallery-images" on storage.objects
  for select to anon using (bucket_id = 'gallery-images');
create policy "Authenticated manage gallery-images" on storage.objects
  for all to authenticated using (bucket_id = 'gallery-images') with check (bucket_id = 'gallery-images');

create policy "Public read blog-covers" on storage.objects
  for select to anon using (bucket_id = 'blog-covers');
create policy "Authenticated manage blog-covers" on storage.objects
  for all to authenticated using (bucket_id = 'blog-covers') with check (bucket_id = 'blog-covers');
