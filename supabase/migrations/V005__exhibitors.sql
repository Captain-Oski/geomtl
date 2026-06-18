-- ============================================================
-- Migration  : V005__exhibitors
-- Description: Table exhibitors complète, trigger updated_at, RLS,
--              vue publique, FK vers tables support, seed.
-- Dépend de  : V001, V003__tables_support
-- Auteur     : GeoMTL
-- Date       : 2025-05-27
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

drop table if exists geomtl2027.exhibitors cascade;

create table geomtl2027.exhibitors (
  id uuid primary key default uuid_generate_v4(),

  company_name    text        not null,
  public_name     text,
  sector          text,
  year            integer     not null default 2027,

  website_url     text,
  description_fr  text,
  description_en  text,
  logo_url        text,
  logo_alt_text   text,
  public_visibility  boolean  not null default false,
  display_order      integer  not null default 10,
  featured           boolean  not null default false,

  primary_contact_name    text,
  primary_contact_email   text,
  primary_contact_phone   text,
  secondary_contact_name  text,
  secondary_contact_email text,
  notes_contact           text,

  status                text  not null default 'prospect'
    check (status in ('prospect','contacted','confirmed','invoiced','paid',
                      'assets_pending','ready_to_publish','published','cancelled')),
  communication_date    date,
  invoice_sent_date     date,
  payment_received_date date,
  follow_up_date        date,
  contract_url          text,
  invoice_url           text,
  payment_status        text  not null default 'unpaid'
    check (payment_status in ('unpaid','pending','paid','cancelled')),
  internal_notes        text,

  booth_number    text,
  booth_size      text  not null default 'standard'
    check (booth_size in ('standard','double','corner','island')),
  booth_zone      text,
  booth_status    text  not null default 'not_required'
    check (booth_status in ('not_required','to_assign','assigned','confirmed')),
  setup_date      date,
  teardown_date   date,

  logo_received           boolean not null default false,
  logo_validated          boolean not null default false,
  company_name_confirmed  boolean not null default false,
  description_received    boolean not null default false,
  materials_received      boolean not null default false,
  promo_code              text,

  internal_owner_name   text,
  internal_owner_email  text,
  committee_owner       text,
  last_updated_by       text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  archived_at   timestamptz,

  constraint unique_exhibitor_booth_per_year unique (booth_number, year),
  constraint unique_exhibitor_promo_per_year unique (promo_code, year)
);

-- ────────────────────────────────────────────────────────────
-- TRIGGER updated_at
-- ────────────────────────────────────────────────────────────
drop trigger if exists exhibitors_updated_at on geomtl2027.exhibitors;

create trigger exhibitors_updated_at
  before update on geomtl2027.exhibitors
  for each row execute function geomtl2027.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- FK vers tables support
-- ────────────────────────────────────────────────────────────
alter table geomtl2027.contracts
  drop constraint if exists contracts_exhibitor_id_fkey;
alter table geomtl2027.contracts
  add constraint contracts_exhibitor_id_fkey
  foreign key (exhibitor_id) references geomtl2027.exhibitors(id) on delete set null;

alter table geomtl2027.contacts
  drop constraint if exists contacts_exhibitor_id_fkey;
alter table geomtl2027.contacts
  add constraint contacts_exhibitor_id_fkey
  foreign key (exhibitor_id) references geomtl2027.exhibitors(id) on delete set null;

alter table geomtl2027.deliverables
  drop constraint if exists deliverables_exhibitor_id_fkey;
alter table geomtl2027.deliverables
  add constraint deliverables_exhibitor_id_fkey
  foreign key (exhibitor_id) references geomtl2027.exhibitors(id) on delete set null;

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
alter table geomtl2027.exhibitors enable row level security;

create policy "Public : lecture exposants publiés"
  on geomtl2027.exhibitors for select
  using (public_visibility = true and status = 'published' and archived_at is null);

create policy "Auth : lecture tous les exposants"
  on geomtl2027.exhibitors for select
  using (auth.uid() is not null and geomtl2027.get_my_role() is not null);

create policy "Editor/Admin : création exposant"
  on geomtl2027.exhibitors for insert
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

create policy "Editor/Admin : modification exposant"
  on geomtl2027.exhibitors for update
  using  (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression exposant"
  on geomtl2027.exhibitors for delete
  using (geomtl2027.get_my_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- VUE PUBLIQUE
-- ────────────────────────────────────────────────────────────
create or replace view geomtl2027.public_exhibitors_view as
  select
    id, company_name, public_name, sector,
    website_url, description_fr, description_en,
    logo_url, logo_alt_text, display_order, featured,
    booth_number, year
  from geomtl2027.exhibitors
  where public_visibility = true and status = 'published' and archived_at is null
  order by display_order asc;

-- ────────────────────────────────────────────────────────────
-- SEED
-- ────────────────────────────────────────────────────────────
insert into geomtl2027.exhibitors (
  company_name, public_name, sector, year,
  website_url, description_fr, description_en,
  logo_alt_text, public_visibility, display_order, featured,
  primary_contact_name, primary_contact_email,
  status, payment_status, payment_received_date,
  booth_number, booth_size, booth_zone, booth_status,
  logo_received, logo_validated, company_name_confirmed, description_received, materials_received,
  internal_owner_name, internal_owner_email
) values
(
  'CartoCraft Solutions', 'CartoCraft', 'Cartographie', 2027,
  'https://cartcraft.io',
  'Outils professionnels de cartographie pour les équipes terrain.',
  'Professional mapping tools for field teams.',
  'Logo CartoCraft', true, 1, true,
  'Nadia Pelletier', 'nadia@cartcraft.io',
  'published', 'paid', current_date - 100,
  'A-01', 'double', 'Zone A – Entrée principale', 'confirmed',
  true, true, true, true, true,
  'Sophie Martin', 'sophie@geomtl.com'
),
(
  'DroneGeo Québec', 'DroneGeo QC', 'Télédétection / Drone', 2027,
  'https://dronegeo.qc.ca',
  'Acquisition de données par drone pour les professionnels du géospatial.',
  'Drone data acquisition for geospatial professionals.',
  null, false, 2, false,
  'Julien Côté', 'julien@dronegeo.qc.ca',
  'assets_pending', 'paid', current_date - 60,
  'A-03', 'standard', 'Zone A – Entrée principale', 'assigned',
  false, false, true, true, false,
  'Marc Bouchard', 'marc@geomtl.com'
);

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop view if exists geomtl2027.public_exhibitors_view;
-- drop table if exists geomtl2027.exhibitors cascade;
