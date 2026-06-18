import Link from 'next/link'
import { ExhibitorForm } from '@/components/admin/exhibitors/ExhibitorForm'

export const metadata = {
  title: 'Nouvel exposant — Admin GeoMTL',
}

export default function NewExhibitorPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/exhibitors" className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Exposants
        </Link>
        <span className="text-gray-700">/</span>
        <span className="text-white text-sm font-medium">Nouvel exposant</span>
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">Nouvel exposant</h1>
      <p className="text-gray-500 text-sm mb-8">GeoMTL 2027</p>
      <ExhibitorForm />
    </div>
  )
}
