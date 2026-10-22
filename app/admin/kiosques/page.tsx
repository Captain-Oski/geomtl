import { getDemandesKiosques, getKiosquesAdmin } from '@/lib/data/kiosques'
import { getExhibitors } from '@/lib/data/exhibitors'
import { getPartners } from '@/lib/data/partners'
import { createClient } from '@/lib/supabase/server'
import { AdminKiosquesPage, type FicheLiee } from '@/components/admin/kiosques/AdminKiosquesPage'
import type { Role } from '@/lib/supabase/types'

export const metadata = {
  title: 'Kiosques - Admin GÉOMTL',
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

export default async function KiosquesPage() {
  const [kiosques, demandes, exhibitors, partners, role] = await Promise.all([
    getKiosquesAdmin(),
    getDemandesKiosques(),
    getExhibitors(),
    getPartners(),
    roleCourant(),
  ])

  // Fiches qu'on peut relier à un kiosque réservé (nom, logo et site repris)
  const fiches: FicheLiee[] = [
    ...exhibitors
      .filter((e) => !e.archived_at)
      .map((e) => ({ id: e.id, type: 'exposant' as const, nom: e.public_name || e.company_name, logo: e.logo_url, site: e.website_url, detail: 'Exposant' })),
    ...partners
      .filter((p) => !p.archived_at)
      .map((p) => ({ id: p.id, type: 'partenaire' as const, nom: p.public_name || p.company_name, logo: p.logo_url, site: p.website_url, detail: `Partenaire ${p.partner_type}` })),
  ].sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))

  return (
    <AdminKiosquesPage
      kiosques={kiosques}
      demandes={demandes}
      fiches={fiches}
      peutModifier={role === 'admin' || role === 'editor'}
    />
  )
}
