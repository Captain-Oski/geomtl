-- ============================================================
-- Migration  : V006__sessions
-- Description: Table sessions (programmation conférence),
--              trigger updated_at, RLS, vue publique, seed.
-- Dépend de  : V001__extensions_et_fonctions
-- Auteur     : GeoMTL
-- Date       : 2026-05-29
-- Rollback   : voir section ROLLBACK en bas
-- ============================================================

drop table if exists geomtl2027.sessions cascade;

create table geomtl2027.sessions (
  id uuid primary key default uuid_generate_v4(),

  -- Contenu bilingue
  title_fr        text        not null,
  title_en        text,
  description_fr  text,
  description_en  text,

  -- Type de session
  type            text        not null default 'conference'
    check (type in ('keynote','conference','panel','workshop','networking','demo','awards')),

  -- Horaire
  day             text        not null default 'day1'
    check (day in ('evening','day1','day2')),
  start_time      time        not null,
  end_time        time        not null,
  room            text,

  -- Intervenants
  speakers        text,    -- noms séparés par virgule
  moderator       text,

  -- Publication
  public_visibility  boolean  not null default false,
  display_order      integer  not null default 99,

  -- Gestion interne
  status          text        not null default 'draft'
    check (status in ('draft','confirmed','cancelled')),
  notes           text,

  -- Métadonnées
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint sessions_time_order check (end_time > start_time)
);

-- ────────────────────────────────────────────────────────────
-- INDEX pour les requêtes courantes
-- ────────────────────────────────────────────────────────────
create index sessions_day_start_idx
  on geomtl2027.sessions (day, start_time);

create index sessions_status_idx
  on geomtl2027.sessions (status);

-- ────────────────────────────────────────────────────────────
-- TRIGGER updated_at
-- ────────────────────────────────────────────────────────────
drop trigger if exists sessions_updated_at on geomtl2027.sessions;

create trigger sessions_updated_at
  before update on geomtl2027.sessions
  for each row execute function geomtl2027.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────
alter table geomtl2027.sessions enable row level security;

-- Lecture publique : sessions visibles et confirmées uniquement
create policy "Public : lecture sessions publiées"
  on geomtl2027.sessions for select
  using (public_visibility = true and status = 'confirmed');

-- Lecture complète pour les utilisateurs authentifiés avec un rôle
create policy "Auth : lecture toutes les sessions"
  on geomtl2027.sessions for select
  using (auth.uid() is not null and geomtl2027.get_my_role() is not null);

-- Création réservée aux éditeurs et admins
create policy "Editor/Admin : création session"
  on geomtl2027.sessions for insert
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

-- Modification réservée aux éditeurs et admins
create policy "Editor/Admin : modification session"
  on geomtl2027.sessions for update
  using  (geomtl2027.get_my_role() in ('admin', 'editor'))
  with check (geomtl2027.get_my_role() in ('admin', 'editor'));

-- Suppression réservée aux admins
create policy "Admin : suppression session"
  on geomtl2027.sessions for delete
  using (geomtl2027.get_my_role() = 'admin');

-- ────────────────────────────────────────────────────────────
-- VUE PUBLIQUE
-- ────────────────────────────────────────────────────────────
create or replace view geomtl2027.public_sessions_view as
  select
    id,
    title_fr,
    title_en,
    description_fr,
    description_en,
    type,
    day,
    start_time,
    end_time,
    room,
    speakers,
    moderator,
    display_order
  from geomtl2027.sessions
  where public_visibility = true
    and status = 'confirmed'
  order by
    case day
      when 'evening' then 1
      when 'day1'    then 2
      when 'day2'    then 3
    end,
    start_time;

-- ────────────────────────────────────────────────────────────
-- SEED — quelques sessions de démo
-- ────────────────────────────────────────────────────────────
insert into geomtl2027.sessions (
  title_fr, title_en,
  description_fr, description_en,
  type, day, start_time, end_time, room,
  speakers, moderator,
  public_visibility, status, display_order
) values
(
  'Conférence d''ouverture — La géomatique au cœur de la transition',
  'Opening Keynote — Geomatics at the Heart of Transition',
  'Allocution d''ouverture par le président du comité organisateur.',
  'Opening address by the chair of the organizing committee.',
  'keynote', 'evening', '18:00', '19:00', 'Salle principale',
  'Marie-Claude Simard', null,
  true, 'confirmed', 1
),
(
  'Cocktail de bienvenue',
  'Welcome Reception',
  'Réseautage informel pour tous les participants.',
  'Informal networking for all participants.',
  'networking', 'evening', '19:00', '21:00', 'Foyer',
  null, null,
  true, 'confirmed', 2
),
(
  'IA générative et données géospatiales : opportunités et risques',
  'Generative AI and Geospatial Data: Opportunities and Risks',
  'Comment l''IA générative transforme l''analyse territoriale et la prise de décision.',
  'How generative AI is transforming territorial analysis and decision-making.',
  'keynote', 'day1', '09:00', '10:00', 'Salle principale',
  'Dr. Fatima Khalil, Jean-Pierre Roy', 'Sophie Martin',
  true, 'confirmed', 10
),
(
  'Jumeaux numériques urbains — retours d''expérience',
  'Urban Digital Twins — Lessons Learned',
  'Trois villes partagent leur parcours de mise en œuvre de jumeaux numériques.',
  'Three cities share their digital twin implementation journey.',
  'panel', 'day1', '10:30', '12:00', 'Salle A',
  'Luc Fortin, Ana Ribeiro, David Chen', 'Marc Bouchard',
  true, 'confirmed', 20
),
(
  'Atelier — QGIS avancé pour l''analyse environnementale',
  'Workshop — Advanced QGIS for Environmental Analysis',
  'Atelier pratique intensif, places limitées à 30 participants.',
  'Intensive hands-on workshop, limited to 30 participants.',
  'workshop', 'day1', '13:30', '17:00', 'Salle formation B',
  'Émilie Côté', null,
  true, 'confirmed', 30
),
(
  'Géomatique et changements climatiques : cartographier les territoires à risque',
  'Geomatics and Climate Change: Mapping At-Risk Territories',
  'Panorama des outils géospatiaux au service de l''adaptation climatique.',
  'Overview of geospatial tools for climate adaptation.',
  'conference', 'day2', '09:00', '10:00', 'Salle principale',
  'Dr. Isabelle Morin', null,
  true, 'confirmed', 50
),
(
  'Table ronde — Gouvernance des données géospatiales ouvertes',
  'Roundtable — Open Geospatial Data Governance',
  'Enjeux juridiques, éthiques et techniques de l''ouverture des données géospatiales.',
  'Legal, ethical, and technical challenges of open geospatial data.',
  'panel', 'day2', '10:30', '12:00', 'Salle A',
  'Me. Caroline Leblanc, Pierre-Alexandre Gervais', 'Anne-Sophie Tremblay',
  true, 'confirmed', 60
),
(
  'Remise des Prix GeoMTL 2027',
  'GeoMTL 2027 Awards Ceremony',
  'Reconnaissance des projets et personnes qui font avancer la géomatique au Québec et au Canada.',
  'Recognizing projects and people advancing geomatics in Quebec and Canada.',
  'awards', 'day2', '16:00', '17:30', 'Salle principale',
  null, 'Marie-Claude Simard',
  true, 'draft', 100
);

-- ============================================================
-- ROLLBACK
-- ============================================================
-- drop view  if exists geomtl2027.public_sessions_view;
-- drop table if exists geomtl2027.sessions cascade;
