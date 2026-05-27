import Link from 'next/link'
import { getPublicPartners } from '@/lib/data/public'
import type { PublicPartner, PartnerType } from '@/lib/supabase/types'

const TYPE_ORDER: PartnerType[] = ['Platinum', 'Gold', 'Silver', 'Bronze', 'Exhibitor', 'Other']

const TYPE_LABELS: Record<PartnerType, string> = {
  Platinum: 'Partenaires Platine',
  Gold:     'Partenaires Or',
  Silver:   'Partenaires Argent',
  Bronze:   'Partenaires Bronze',
  Exhibitor:'Exposants',
  Other:    'Partenaires associés',
}

function PartnerCard({ partner }: { partner: PublicPartner }) {
  const name = partner.public_name ?? partner.company_name

  const card = (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:bg-white/10 hover:border-white/20 transition-colors h-full">
      {partner.logo_url ? (
        <img
          src={partner.logo_url}
          alt={partner.logo_alt_text ?? `Logo ${name}`}
          className="h-12 object-contain filter brightness-0 invert opacity-80"
        />
      ) : (
        <div className="h-12 flex items-center justify-center">
          <span className="text-white/60 font-semibold text-sm">{name}</span>
        </div>
      )}
      {partner.logo_url && (
        <span className="text-white/60 text-xs">{name}</span>
      )}
    </div>
  )

  if (partner.website_url) {
    return (
      <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {card}
      </a>
    )
  }

  return card
}

export async function PublicPartnersSection() {
  const partners = await getPublicPartners()

  if (partners.length === 0) return null

  // Group by type, preserve order
  const grouped = TYPE_ORDER.reduce<Record<PartnerType, PublicPartner[]>>((acc, type) => {
    const group = partners
      .filter((p) => p.partner_type === type)
      .sort((a, b) => a.display_order - b.display_order)
    if (group.length > 0) acc[type] = group
    return acc
  }, {} as Record<PartnerType, PublicPartner[]>)

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        {Object.entries(grouped).map(([type, group]) => (
          <div key={type} className="mb-12">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 text-center">
              {TYPE_LABELS[type as PartnerType]}
            </h3>
            <div
              className={`grid gap-4 ${
                type === 'Platinum' ? 'grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto' :
                type === 'Gold'     ? 'grid-cols-2 sm:grid-cols-3 max-w-2xl mx-auto' :
                                      'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              }`}
            >
              {group.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
