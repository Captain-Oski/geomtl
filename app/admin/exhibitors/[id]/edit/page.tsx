import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getExhibitorById } from '@/lib/data/exhibitors'
import { ExhibitorForm } from '@/components/admin/exhibitors/ExhibitorForm'
import { ExposantBadge, PartnerStatusBadge } from '@/components/admin/partners/PartnerStatusBadge'

export const metadata = {
  title: 'Modifier un exposant - Admin GÉOMTL',
}

export default async function EditExhibitorPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  const exhibitor = await getExhibitorById(params.id)
  if (!exhibitor) notFound()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/organisations?onglet=organisations" className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Partenaires et exposants
        </Link>
        <span className="text-gray-700">/</span>
        <span className="text-white text-sm font-medium truncate">{exhibitor.company_name}</span>
      </div>

      <div className="flex flex-wrap items-start gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{exhibitor.company_name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">GÉOMTL {exhibitor.year}</p>
        </div>
        <div className="flex gap-2 mt-1">
          <ExposantBadge />
          <PartnerStatusBadge status={exhibitor.status} />
        </div>
      </div>

      <ExhibitorForm exhibitor={exhibitor} />
    </div>
  )
}
