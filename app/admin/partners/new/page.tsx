import Link from 'next/link'
import { PartnerForm } from '@/components/admin/partners/PartnerForm'

export const metadata = {
  title: 'Nouveau partenaire — Admin GÉOMTL',
}

export default function NewPartnerPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/partners" className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Partenaires
        </Link>
        <span className="text-gray-700">/</span>
        <span className="text-white text-sm font-medium">Nouveau partenaire</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">Nouveau partenaire</h1>
      <p className="text-gray-500 text-sm mb-8">GÉOMTL 2027</p>
      <PartnerForm />
    </div>
  )
}
