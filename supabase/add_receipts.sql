-- Receipts (auto-created when an invoice is marked as paid)
create table if not exists public.receipts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  receipt_number text not null unique,
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount_paid numeric not null,
  payment_method text not null default 'Cash',
  notes text
);
alter table public.receipts enable row level security;
create policy "Authenticated can manage receipts" on public.receipts
  for all to authenticated using (true) with check (true);
