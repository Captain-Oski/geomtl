-- ============================================================
-- Migration  : V007__kiosques
-- Description: Kiosques du salon des exposants (état public décidé par le
--              comité) et demandes de réservation venues du site public.
-- Dépend de  : V001 (uuid-ossp, set_updated_at), V002 (get_my_role),
--              V004 (partners), V005 (exhibitors)
-- Auteur     : GéoMTL
-- Date       : 2026-10-22
-- Rollback   : voir section ROLLBACK en bas
--
-- Sécurité :
--   - Le public (rôle anon) n'a aucun droit sur ces deux tables : les
--     demandes sont insérées par le serveur du site (clé service role) après
--     validation, et l'état public des kiosques est lu côté serveur.
--   - Un kiosque ne passe à « reserve » que par une action du comité
--     (rôles admin ou editor) ; une demande ne change jamais son état.
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- KIOSQUES (26 emplacements du plan)
-- ────────────────────────────────────────────────────────────
create table if not exists geomtl2027.kiosques (
  numero                integer     primary key check (numero between 1 and 26),
  statut                text        not null default 'disponible'
    check (statut in ('disponible', 'reserve')),
  organisation_affichee text        check (organisation_affichee is null or char_length(organisation_affichee) <= 150),
  logo_url              text        check (logo_url is null or char_length(logo_url) <= 500),
  site_url              text        check (site_url is null or char_length(site_url) <= 500),
  exhibitor_id          uuid        references geomtl2027.exhibitors(id) on delete set null,
  partner_id            uuid        references geomtl2027.partners(id) on delete set null,
  notes_internes        text,
  updated_by            uuid        references auth.users(id) on delete set null,
  updated_at            timestamptz not null default now()
);

insert into geomtl2027.kiosques (numero)
select generate_series(1, 26)
on conflict (numero) do nothing;

drop trigger if exists kiosques_updated_at on geomtl2027.kiosques;
create trigger kiosques_updated_at
  before update on geomtl2027.kiosques
  for each row execute function geomtl2027.set_updated_at();

alter table geomtl2027.kiosques enable row level security;

create policy "Comité : lecture des kiosques"
  on geomtl2027.kiosques for select to authenticated
  using (geomtl2027.get_my_role() is not null);

create policy "Admin/Editor : modification des kiosques"
  on geomtl2027.kiosques for update to authenticated
  using (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

-- Les 26 lignes sont fixes : ni ajout ni suppression par l'interface
revoke all on geomtl2027.kiosques from anon;
revoke insert, delete, truncate on geomtl2027.kiosques from authenticated;

-- ────────────────────────────────────────────────────────────
-- DEMANDES « DEVENIR PARTENAIRE OU EXPOSANT » (formulaire du plan)
-- ────────────────────────────────────────────────────────────
create table if not exists geomtl2027.demandes_kiosques (
  id                  uuid        primary key default uuid_generate_v4(),
  created_at          timestamptz not null default now(),
  -- Kiosque souhaité ; null = sans préférence (le comité en propose un)
  kiosque_numero      integer     references geomtl2027.kiosques(numero),
  niveau              text        not null
    check (niveau in ('exposant', 'bronze', 'argent', 'or', 'a_determiner')),
  organisation        text        not null check (char_length(organisation) between 2 and 150),
  -- Contact principal de l'organisation
  principal_nom       text        not null check (char_length(principal_nom) between 2 and 120),
  principal_courriel  text        not null check (char_length(principal_courriel) between 5 and 254),
  principal_telephone text        not null check (char_length(principal_telephone) between 7 and 40),
  -- Responsable du kiosque (peut être la même personne)
  kiosque_nom         text        not null check (char_length(kiosque_nom) between 2 and 120),
  kiosque_courriel    text        not null check (char_length(kiosque_courriel) between 5 and 254),
  kiosque_telephone   text        not null check (char_length(kiosque_telephone) between 7 and 40),
  message             text        check (message is null or char_length(message) <= 2000),
  langue              text        not null default 'fr' check (langue in ('fr', 'en')),
  consentement        boolean     not null check (consentement),
  statut              text        not null default 'nouvelle'
    check (statut in ('nouvelle', 'en_traitement', 'acceptee', 'refusee', 'archivee', 'spam')),
  traite_par          uuid        references auth.users(id) on delete set null,
  traite_le           timestamptz,
  notes_internes      text,
  fiche_exhibitor_id  uuid        references geomtl2027.exhibitors(id) on delete set null,
  fiche_partner_id    uuid        references geomtl2027.partners(id) on delete set null,
  -- Hachage salé de l'adresse IP (limite d'envois) ; jamais l'adresse en clair
  empreinte_ip        text
);

create index if not exists demandes_kiosques_statut_idx
  on geomtl2027.demandes_kiosques (statut, created_at desc);
create index if not exists demandes_kiosques_empreinte_idx
  on geomtl2027.demandes_kiosques (empreinte_ip, created_at desc);
create index if not exists demandes_kiosques_courriel_idx
  on geomtl2027.demandes_kiosques (principal_courriel, created_at desc); -- enregistré en minuscules

alter table geomtl2027.demandes_kiosques enable row level security;

create policy "Comité : lecture des demandes de kiosque"
  on geomtl2027.demandes_kiosques for select to authenticated
  using (geomtl2027.get_my_role() is not null);

create policy "Admin/Editor : traitement des demandes de kiosque"
  on geomtl2027.demandes_kiosques for update to authenticated
  using (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

create policy "Admin : suppression des demandes de kiosque"
  on geomtl2027.demandes_kiosques for delete to authenticated
  using (geomtl2027.get_my_role() = 'admin');

-- Aucune insertion par anon ni par authenticated : seul le serveur du site
-- (service role) enregistre les demandes, après validation.
revoke all on geomtl2027.demandes_kiosques from anon;
revoke insert, truncate on geomtl2027.demandes_kiosques from authenticated;

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop table if exists geomtl2027.demandes_kiosques;
-- drop table if exists geomtl2027.kiosques;
