import { getExhibitors } from '@/lib/data/exhibitors'
import { AdminExhibitorsPage } from '@/components/admin/exhibitors/AdminExhibitorsPage'

export const metadata = {
  title: 'Exposants — Admin GeoMTL',
}

export default async function ExhibitorsPage() {
  const exhibitors = await getExhibitors()
  return <AdminExhibitorsPage exhibitors={exhibitors} />
}
