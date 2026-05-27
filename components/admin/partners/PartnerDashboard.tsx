'use client'

import { useMemo } from 'react'
import type { Partner } from '@/lib/supabase/types'

const CONFIRMED_STATUSES = new Set<string>([
  'confirmed', 'invoiced', 'paid', 'assets_pending', 'ready_to_publish', 'published',
])

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
    info:    'text-violet-400',
    muted:   'text-gray-500',
  }
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 min-w-0">
      <div className={`text-2xl font-bold tabular-nums ${colorMap[variant]}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</div>
    </div>
  )
}

export function PartnerDashboard({ partners }: { partners: Partner[] }) {
  const stats = useMemo(() => {
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
      boothUnassigned:  active.filter((p) => p.booth_status === 'to_assign').length,
    }
  }, [partners])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
      <StatCard label="Total partenaires" value={stats.total} />
      <StatCard label="Confirmés" value={stats.confirmed} variant={stats.confirmed > 0 ? 'success' : 'muted'} />
      <StatCard label="Payés" value={stats.paid} variant={stats.paid > 0 ? 'success' : 'muted'} />
      <StatCard label="À relancer" value={stats.followUpOverdue} variant={stats.followUpOverdue > 0 ? 'warning' : 'muted'} />
      <StatCard label="Logos manquants" value={stats.logoMissing} variant={stats.logoMissing > 0 ? 'warning' : 'muted'} />
      <StatCard label="Prêts / non publiés" value={stats.readyUnpublished} variant={stats.readyUnpublished > 0 ? 'info' : 'muted'} />
      <StatCard label="Kiosques à attribuer" value={stats.boothUnassigned} variant={stats.boothUnassigned > 0 ? 'warning' : 'muted'} />
    </div>
  )
}
