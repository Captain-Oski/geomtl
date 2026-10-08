import Link from 'next/link'
import { getPartners } from '@/lib/data/partners'
import { getExhibitors } from '@/lib/data/exhibitors'
import type { Partner, Exhibitor } from '@/lib/supabase/types'

// ─── Stat card ────────────────────────────────────────────

type StatCardProps = {
  label: string
  value: number
  variant?: 'default' | 'success' | 'warning' | 'info' | 'muted'
}

function StatCard({ label, value, variant = 'default' }: StatCardProps) {
  const colorMap = {
    default: 'text-white',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    info: 'text-violet-400',
    muted: 'text-gray-600',
  }
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 min-w-0">
      <div className={`text-2xl font-bold tabular-nums ${colorMap[variant]}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</div>
    </div>
  )
}

// ─── Quick link card ──────────────────────────────────────

function QuickLink({ label, href, description }: { label: string; href: string; description: string }) {
  return (
    <Link
      href={href}
      className="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-rose-500/40 transition-colors group"
    >
      <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors mb-1">{label}</div>
      <div className="text-xs text-gray-600">{description}</div>
    </Link>
  )
}

// ─── Stats helpers ────────────────────────────────────────

const CONFIRMED_STATUSES = new Set(['confirmed', 'invoiced', 'paid', 'assets_pending', 'ready_to_publish', 'published'])

function partnerStats(partners: Partner[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const active = partners.filter((p) => !p.archived_at && p.status !== 'cancelled')
  return {
    total:            active.length,
    confirmed:        active.filter((p) => CONFIRMED_STATUSES.has(p.status)).length,
    paid:             active.filter((p) => p.payment_status === 'paid').length,
    followUpOverdue:  active.filter((p) => p.follow_up_date && new Date(p.follow_up_date) <= today).length,
    logoMissing:      active.filter((p) => !p.logo_received && CONFIRMED_STATUSES.has(p.status)).length,
    readyUnpublished: active.filter((p) => p.status === 'ready_to_publish' && !p.public_visibility).length,
  }
}

function exhibitorStats(exhibitors: Exhibitor[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const active = exhibitors.filter((e) => !e.archived_at && e.status !== 'cancelled')
  return {
    total:          active.length,
    confirmed:      active.filter((e) => CONFIRMED_STATUSES.has(e.status)).length,
    paid:           active.filter((e) => e.payment_status === 'paid').length,
    followUpOverdue: active.filter((e) => e.follow_up_date && new Date(e.follow_up_date) <= today).length,
    logoMissing:    active.filter((e) => !e.logo_received && CONFIRMED_STATUSES.has(e.status)).length,
    boothsToAssign: active.filter((e) => e.booth_status === 'to_assign').length,
    readyToPublish: active.filter((e) => e.status === 'ready_to_publish' && !e.public_visibility).length,
  }
}

// ─── Page ─────────────────────────────────────────────────

export default async function AdminDashboardPage() {
  const [partners, exhibitors] = await Promise.all([getPartners(), getExhibitors()])
  const ps = partnerStats(partners)
  const es = exhibitorStats(exhibitors)

  return (
    <div className="p-8 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Tableau de bord</h1>
        <p className="text-gray-500 text-sm">GÉOMTL 2027 — Panneau d&apos;administration</p>
      </div>

      {/* ── Partenaires ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Partenaires</h2>
          <Link href="/admin/partners" className="text-xs text-rose-400 hover:text-rose-300 transition-colors">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total" value={ps.total} />
          <StatCard label="Confirmés" value={ps.confirmed} variant={ps.confirmed > 0 ? 'success' : 'muted'} />
          <StatCard label="Payés" value={ps.paid} variant={ps.paid > 0 ? 'success' : 'muted'} />
          <StatCard label="À relancer" value={ps.followUpOverdue} variant={ps.followUpOverdue > 0 ? 'warning' : 'muted'} />
          <StatCard label="Logos manquants" value={ps.logoMissing} variant={ps.logoMissing > 0 ? 'warning' : 'muted'} />
          <StatCard label="Prêts / non publiés" value={ps.readyUnpublished} variant={ps.readyUnpublished > 0 ? 'info' : 'muted'} />
        </div>
      </section>

      {/* ── Exposants ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Exposants</h2>
          <Link href="/admin/exhibitors" className="text-xs text-rose-400 hover:text-rose-300 transition-colors">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          <StatCard label="Total" value={es.total} />
          <StatCard label="Confirmés" value={es.confirmed} variant={es.confirmed > 0 ? 'success' : 'muted'} />
          <StatCard label="Payés" value={es.paid} variant={es.paid > 0 ? 'success' : 'muted'} />
          <StatCard label="À relancer" value={es.followUpOverdue} variant={es.followUpOverdue > 0 ? 'warning' : 'muted'} />
          <StatCard label="Logos manquants" value={es.logoMissing} variant={es.logoMissing > 0 ? 'warning' : 'muted'} />
          <StatCard label="Kiosques à attribuer" value={es.boothsToAssign} variant={es.boothsToAssign > 0 ? 'warning' : 'muted'} />
          <StatCard label="Prêts / non publiés" value={es.readyToPublish} variant={es.readyToPublish > 0 ? 'info' : 'muted'} />
        </div>
      </section>

      {/* ── Accès rapide ── */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Accès rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickLink label="Contacts" href="/admin/contacts" description="Personnes-ressources" />
          <QuickLink label="Contrats" href="/admin/contracts" description="Contrats signés et en cours" />
          <QuickLink label="Activations" href="/admin/activations" description="Activations partenaires" />
          <QuickLink label="Livrables" href="/admin/deliverables" description="Suivi des engagements" />
        </div>
      </section>
    </div>
  )
}
