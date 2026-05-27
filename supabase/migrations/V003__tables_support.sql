-- ============================================================
-- Migration  : V003__tables_support
-- Description: Tables secondaires : contracts, contacts,
--              activations, deliverables, kpis + RLS
--              (Ces tables référencent partners et exhibitors
--               qui seront créés dans V004 / V005 — les FK
--               sont donc ajoutées après coup via ALTER TABLE)
-- Dépend de  : V002__profiles
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- TABLE : contracts
-- ────────────────────────────────────────────────────────────
create table if not exists public.contracts (
  id            uuid        primary key default uuid_generate_v4(),
  partner_id    uuid,
  exhibitor_id  uuid,
  amount        numeric(10,2),
  status        text        not null default 'draft'
                            check (status in ('draft', 'sent', 'signed', 'cancelled')),
  signed_at     timestamptz,
  notes         text,
  created_at    timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- TABLE : contacts
-- ────────────────────────────────────────────────────────────
create table if not exists public.contacts (
  id            uuid        primary key default uuid_generate_v4(),
  partner_id    uuid,
  exhibitor_id  uuid,
  full_name     text        not null,
  email         text        not null,
  phone         text,
  role          text,
  is_primary    boolean     not null default false,
  created_at    timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- TABLE : activations
-- ────────────────────────────────────────────────────────────
create table if not exists public.activations (
  id                 uuid        primary key default uuid_generate_v4(),
  partner_id         uuid,
  title_fr           text        not null,
  title_en           text,
  description_fr     text,
  description_en     text,
  public_visibility  boolean     not null default false,
  status             text        not null default 'planned'
                                 check (status in ('planned', 'active', 'completed', 'cancelled')),
  created_at         timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- TABLE : deliverables
-- ────────────────────────────────────────────────────────────
create table if not exists public.deliverables (
  id            uuid        primary key default uuid_generate_v4(),
  partner_id    uuid,
  exhibitor_id  uuid,
  title         text        not null,
  due_date      date,
  status        text        not null default 'pending'
                            check (status in ('pending', 'in_progress', 'completed', 'overdue')),
  notes         text,
  created_at    timestamptz not null default now()
);

-- ────────────────────────────────────────────────────────────
-- TABLE : kpis
-- ────────────────────────────────────────────────────────────
create table if not exists public.kpis (
  id           uuid        primary key default uuid_generate_v4(),
  metric_name  text        not null,
  value        numeric     not null,
  unit         text,
  recorded_at  timestamptz not null default now(),
  notes        text
);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
alter table public.contracts   enable row level security;
alter table public.contacts    enable row level security;
alter table public.activations enable row level security;
alter table public.deliverables enable row level security;
alter table public.kpis        enable row level security;

-- Contracts (admin seulement — données financières sensibles)
create policy "Admin : lecture contrats"
  on public.contracts for select
  using (public.get_my_role() = 'admin');
create policy "Admin : ajout contrats"
  on public.contracts for insert
  with check (public.get_my_role() = 'admin');
create policy "Admin : modification contrats"
  on public.contracts for update
  using  (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');
create policy "Admin : suppression contrats"
  on public.contracts for delete
  using (public.get_my_role() = 'admin');

-- Contacts
create policy "Auth : lecture contacts"
  on public.contacts for select
  using (auth.uid() is not null and public.get_my_role() is not null);
create policy "Editor/Admin : ajout contacts"
  on public.contacts for insert
  with check (public.get_my_role() in ('admin', 'editor'));
create policy "Editor/Admin : modification contacts"
  on public.contacts for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));
create policy "Admin : suppression contacts"
  on public.contacts for delete
  using (public.get_my_role() = 'admin');

-- Activations
create policy "Public : activations visibles"
  on public.activations for select
  using (public_visibility = true and status in ('active', 'completed'));
create policy "Auth : lecture toutes les activations"
  on public.activations for select
  using (auth.uid() is not null and public.get_my_role() is not null);
create policy "Editor/Admin : ajout activations"
  on public.activations for insert
  with check (public.get_my_role() in ('admin', 'editor'));
create policy "Editor/Admin : modification activations"
  on public.activations for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));
create policy "Admin : suppression activations"
  on public.activations for delete
  using (public.get_my_role() = 'admin');

-- Deliverables
create policy "Auth : lecture livrables"
  on public.deliverables for select
  using (auth.uid() is not null and public.get_my_role() is not null);
create policy "Editor/Admin : ajout livrables"
  on public.deliverables for insert
  with check (public.get_my_role() in ('admin', 'editor'));
create policy "Editor/Admin : modification livrables"
  on public.deliverables for update
  using  (public.get_my_role() in ('admin', 'editor'))
  with check (public.get_my_role() in ('admin', 'editor'));
create policy "Admin : suppression livrables"
  on public.deliverables for delete
  using (public.get_my_role() = 'admin');

-- KPIs
create policy "Auth : lecture KPIs"
  on public.kpis for select
  using (auth.uid() is not null and public.get_my_role() is not null);
create policy "Admin : ajout KPIs"
  on public.kpis for insert
  with check (public.get_my_role() = 'admin');
create policy "Admin : modification KPIs"
  on public.kpis for update
  using  (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');
create policy "Admin : suppression KPIs"
  on public.kpis for delete
  using (public.get_my_role() = 'admin');

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop table if exists public.kpis cascade;
-- drop table if exists public.deliverables cascade;
-- drop table if exists public.activations cascade;
-- drop table if exists public.contacts cascade;
-- drop table if exists public.contracts cascade;
