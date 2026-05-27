-- ============================================================
-- Migration  : V003__tables_support
-- Description: Tables secondaires (contracts, contacts, activations,
--              deliverables, kpis) + RLS. Les FK vers partners et
--              exhibitors sont ajoutées dans V004 et V005.
-- Dépend de  : V002__profiles
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

create table if not exists geomtl2027.contracts (
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

create table if not exists geomtl2027.contacts (
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

create table if not exists geomtl2027.activations (
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

create table if not exists geomtl2027.deliverables (
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

create table if not exists geomtl2027.kpis (
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
alter table geomtl2027.contracts    enable row level security;
alter table geomtl2027.contacts     enable row level security;
alter table geomtl2027.activations  enable row level security;
alter table geomtl2027.deliverables enable row level security;
alter table geomtl2027.kpis         enable row level security;

-- Contracts (admin seulement)
create policy "Admin : lecture contrats"
  on geomtl2027.contracts for select
  using (geomtl2027.get_my_role() = 'admin');
create policy "Admin : ajout contrats"
  on geomtl2027.contracts for insert
  with check (geomtl2027.get_my_role() = 'admin');
create policy "Admin : modification contrats"
  on geomtl2027.contracts for update
  using  (geomtl2027.get_my_role() = 'admin')
  with check (geomtl2027.get_my_role() = 'admin');
create policy "Admin : suppression contrats"
  on geomtl2027.contracts for delete
  using (geomtl2027.get_my_role() = 'admin');

-- Contacts
create policy "Auth : lecture contacts"
  on geomtl2027.contacts for select
  using (auth.uid() is not null and geomtl2027.get_my_role() is not null);
create policy "Editor/Admin : ajout contacts"
  on geomtl2027.contacts for insert
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));
create policy "Editor/Admin : modification contacts"
  on geomtl2027.contacts for update
  using  (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));
create policy "Admin : suppression contacts"
  on geomtl2027.contacts for delete
  using (geomtl2027.get_my_role() = 'admin');

-- Activations
create policy "Public : activations visibles"
  on geomtl2027.activations for select
  using (public_visibility = true and status in ('active', 'completed'));
create policy "Auth : lecture toutes les activations"
  on geomtl2027.activations for select
  using (auth.uid() is not null and geomtl2027.get_my_role() is not null);
create policy "Editor/Admin : ajout activations"
  on geomtl2027.activations for insert
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));
create policy "Editor/Admin : modification activations"
  on geomtl2027.activations for update
  using  (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));
create policy "Admin : suppression activations"
  on geomtl2027.activations for delete
  using (geomtl2027.get_my_role() = 'admin');

-- Deliverables
create policy "Auth : lecture livrables"
  on geomtl2027.deliverables for select
  using (auth.uid() is not null and geomtl2027.get_my_role() is not null);
create policy "Editor/Admin : ajout livrables"
  on geomtl2027.deliverables for insert
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));
create policy "Editor/Admin : modification livrables"
  on geomtl2027.deliverables for update
  using  (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));
create policy "Admin : suppression livrables"
  on geomtl2027.deliverables for delete
  using (geomtl2027.get_my_role() = 'admin');

-- KPIs
create policy "Auth : lecture KPIs"
  on geomtl2027.kpis for select
  using (auth.uid() is not null and geomtl2027.get_my_role() is not null);
create policy "Admin : ajout KPIs"
  on geomtl2027.kpis for insert
  with check (geomtl2027.get_my_role() = 'admin');
create policy "Admin : modification KPIs"
  on geomtl2027.kpis for update
  using  (geomtl2027.get_my_role() = 'admin')
  with check (geomtl2027.get_my_role() = 'admin');
create policy "Admin : suppression KPIs"
  on geomtl2027.kpis for delete
  using (geomtl2027.get_my_role() = 'admin');

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop table if exists geomtl2027.kpis cascade;
-- drop table if exists geomtl2027.deliverables cascade;
-- drop table if exists geomtl2027.activations cascade;
-- drop table if exists geomtl2027.contacts cascade;
-- drop table if exists geomtl2027.contracts cascade;
