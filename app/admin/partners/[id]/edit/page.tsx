import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPartnerById } from '@/lib/data/partners'
import { PartnerForm } from '@/components/admin/partners/PartnerForm'
import { PartnerTypeBadge, PartnerStatusBadge } from '@/components/admin/partners/PartnerStatusBadge'

export const metadata = {
  title: 'Modifier un partenaire — Admin GeoMTL',
}

export default async function EditPartnerPage({
  params,
}: {
  params: { id: string }
}) {
  const partner = await getPartnerById(params.id)
  if (!partner) notFound()

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/partners" className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Partenaires
        </Link>
        <span className="text-gray-700">/</span>
        <span className="text-white text-sm font-medium truncate">{partner.company_name}</span>
      </div>

      <div className="flex flex-wrap items-start gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{partner.company_name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">GeoMTL {partner.year}</p>
        </div>
        <div className="flex gap-2 mt-1">
          <PartnerTypeBadge type={partner.partner_type} />
          <PartnerStatusBadge status={partner.status} />
        </div>
      </div>

      <PartnerForm partner={partner} />
    </div>
  )
}
