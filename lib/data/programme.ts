import { createClient } from '@/lib/supabase/server'
import type { Session } from '@/lib/supabase/types'

// ─── Mock data (dev sans Supabase) ────────────────────────

export const MOCK_SESSIONS: Session[] = [
  {
    id: 's1',
    title_fr: 'Conférence d\'ouverture — La géomatique au cœur de la transition',
    title_en: 'Opening Keynote — Geomatics at the Heart of Transition',
    description_fr: 'Allocution d\'ouverture par le président du comité organisateur.',
    description_en: 'Opening address by the chair of the organizing committee.',
    type: 'keynote',
    day: 'evening',
    start_time: '18:00',
    end_time: '19:00',
    room: 'Salle principale',
    speakers: 'Marie-Claude Simard',
    moderator: null,
    public_visibility: true,
    status: 'confirmed',
    notes: null,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's2',
    title_fr: 'Cocktail de bienvenue',
    title_en: 'Welcome Reception',
    description_fr: 'Réseautage informel pour les participants.',
    description_en: 'Informal networking for participants.',
    type: 'networking',
    day: 'evening',
    start_time: '19:00',
    end_time: '21:00',
    room: 'Foyer',
    speakers: null,
    moderator: null,
    public_visibility: true,
    status: 'confirmed',
    notes: null,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's3',
    title_fr: 'IA générative et données géospatiales : opportunités et risques',
    title_en: 'Generative AI and Geospatial Data: Opportunities and Risks',
    description_fr: 'Comment l\'IA générative transforme l\'analyse territoriale.',
    description_en: 'How generative AI is transforming territorial analysis.',
    type: 'keynote',
    day: 'day1',
    start_time: '09:00',
    end_time: '10:00',
    room: 'Salle principale',
    speakers: 'Dr. Fatima Khalil, Jean-Pierre Roy',
    moderator: 'Sophie Martin',
    public_visibility: true,
    status: 'confirmed',
    notes: null,
    display_order: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's4',
    title_fr: 'Jumeaux numériques urbains — retours d\'expérience',
    title_en: 'Urban Digital Twins — Lessons Learned',
    description_fr: 'Trois villes partagent leur parcours de mise en œuvre.',
    description_en: 'Three cities share their implementation journey.',
    type: 'panel',
    day: 'day1',
    start_time: '10:30',
    end_time: '12:00',
    room: 'Salle A',
    speakers: 'Luc Fortin, Ana Ribeiro, David Chen',
    moderator: 'Marc Bouchard',
    public_visibility: true,
    status: 'confirmed',
    notes: 'Prévoir traduction simultanée FR/EN',
    display_order: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's5',
    title_fr: 'Atelier — QGIS avancé pour l\'analyse environnementale',
    title_en: 'Workshop — Advanced QGIS for Environmental Analysis',
    description_fr: 'Atelier pratique, places limitées à 30 participants.',
    description_en: 'Hands-on workshop, limited to 30 participants.',
    type: 'workshop',
    day: 'day1',
    start_time: '13:30',
    end_time: '17:00',
    room: 'Salle formation B',
    speakers: 'Émilie Côté',
    moderator: null,
    public_visibility: true,
    status: 'confirmed',
    notes: 'Apporter son ordinateur portable',
    display_order: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 's6',
    title_fr: 'Remise des Prix GeoMTL 2027',
    title_en: 'GeoMTL 2027 Awards Ceremony',
    description_fr: 'Reconnaissance des projets et personnes qui font avancer la géomatique.',
    description_en: 'Recognizing projects and people advancing geomatics.',
    type: 'awards',
    day: 'day2',
    start_time: '16:00',
    end_time: '17:30',
    room: 'Salle principale',
    speakers: null,
    moderator: 'Marie-Claude Simard',
    public_visibility: true,
    status: 'draft',
    notes: 'Finaliser liste des nominés',
    display_order: 100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// ─── Data fetching ─────────────────────────────────────────

export async function getSessions(): Promise<Session[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_SESSIONS
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('day', { ascending: true })
    .order('start_time', { ascending: true })

  if (error) {
    console.error('[getSessions]', error.message)
    return []
  }

  return (data ?? []) as Session[]
}

export async function getSessionById(id: string): Promise<Session | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_SESSIONS.find((s) => s.id === id) ?? null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[getSessionById]', error.message)
    return null
  }

  return data as Session
}
