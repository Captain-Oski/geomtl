import { getPartners } from '@/lib/data/partners'
import { AdminPartnersPage } from '@/components/admin/partners/AdminPartnersPage'

export const metadata = {
  title: 'Partenaires — Admin GeoMTL',
}

export default async function PartnersPage() {
  const partners = await getPartners()
  return <AdminPartnersPage partners={partners} />
}
