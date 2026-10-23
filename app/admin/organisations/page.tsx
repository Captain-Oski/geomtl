import { getDemandesKiosques, getKiosquesAdmin } from '@/lib/data/kiosques'
import { getExhibitors } from '@/lib/data/exhibitors'
import { getPartners } from '@/lib/data/partners'
import { createClient } from '@/lib/supabase/server'
import { LIBELLES_TYPES_PARTENAIRE } from '@/lib/partenaires'
import {
  AdminOrganisationsPage,
  type FicheLiee,
  type Onglet,
} from '@/components/admin/organisations/AdminOrganisationsPage'
import type { Role } from '@/lib/supabase/types'

const ONGLETS: Onglet[] = ['demandes', 'organisations', 'plan']

export const metadata = {
  title: 'Partenaires et exposants - Admin GÉOMTL',
}

export const dynamic = 'force-dynamic'

async function roleCourant(): Promise<Role | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return 'admin' // mode mock
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  return (data?.role as Role) ?? null
}

export default async function OrganisationsPage({
  searchParams,
}: {
  searchParams: { onglet?: string }
}) {
  const [kiosques, demandes, exhibitors, partners, role] = await Promise.all([
    getKiosquesAdmin(),
    getDemandesKiosques(),
    getExhibitors(),
    getPartners(),
    roleCourant(),
  ])

  // Fiches qu'on peut relier à un kiosque réservé (nom, logo et site repris)
  const fiches: FicheLiee[] = [
    ...exhibitors.map((e) => ({ id: e.id, type: 'exposant' as const, nom: e.public_name || e.company_name, logo: e.logo_url, site: e.website_url, detail: 'Exposant' })),
    ...partners.map((p) => ({ id: p.id, type: 'partenaire' as const, nom: p.public_name || p.company_name, logo: p.logo_url, site: p.website_url, detail: `Partenaire ${LIBELLES_TYPES_PARTENAIRE[p.partner_type] ?? p.partner_type}` })),
  ].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))

  // Sans onglet demandé : les nouvelles demandes d'abord, sinon la liste
  const nouvelles = demandes.some((d) => d.statut === 'nouvelle')
  const onglet: Onglet = ONGLETS.includes(searchParams.onglet as Onglet)
    ? (searchParams.onglet as Onglet)
    : nouvelles ? 'demandes' : 'organisations'

  return (
    <AdminOrganisationsPage
      ongletInitial={onglet}
      kiosques={kiosques}
      demandes={demandes}
      partners={partners}
      exhibitors={exhibitors}
      fiches={fiches}
      peutModifier={role === 'admin' || role === 'editor'}
    />
  )
}
