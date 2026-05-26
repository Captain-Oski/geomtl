import Link from 'next/link'

type StatCardProps = {
  label: string
  href: string
  description: string
}

function StatCard({ label, href, description }: StatCardProps) {
  return (
    <Link
      href={href}
      className="block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-rose-500/40 transition-colors group"
    >
      <div className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors mb-1">
        {label}
      </div>
      <div className="text-xs text-gray-600">{description}</div>
    </Link>
  )
}

export default function AdminDashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Tableau de bord</h1>
        <p className="text-gray-500 text-sm">GeoMTL 2027 — Panneau d&apos;administration</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Partenaires" href="/admin/partners" description="Gérer les partenaires et niveaux" />
        <StatCard label="Exposants" href="/admin/exhibitors" description="Kiosques et secteurs" />
        <StatCard label="Contacts" href="/admin/contacts" description="Personnes-ressources" />
        <StatCard label="Livrables" href="/admin/deliverables" description="Suivi des engagements" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Contrats" href="/admin/contracts" description="Contrats signés et en cours" />
        <StatCard label="Activations" href="/admin/activations" description="Activations partenaires" />
        <StatCard label="KPIs" href="/admin/kpis" description="Indicateurs de performance" />
      </div>
    </div>
  )
}
