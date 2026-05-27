'use client'

import { useMemo } from 'react'
import type { Exhibitor } from '@/lib/supabase/types'

interface Props {
  exhibitors: Exhibitor[]
}

interface StatCardProps {
  label: string
  value: number
  sub?: string
  accent?: string
}

function StatCard({ label, value, sub, accent = 'text-white' }: StatCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-3xl font-bold ${accent}`}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  )
}

export function ExhibitorDashboard({ exhibitors }: Props) {
  const stats = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return {
      total:       exhibitors.length,
      confirmed:   exhibitors.filter((e) => ['confirmed', 'invoiced', 'paid', 'assets_pending', 'ready_to_publish', 'published'].includes(e.status)).length,
      paid:        exhibitors.filter((e) => e.payment_status === 'paid').length,
      toFollowUp:  exhibitors.filter((e) => {
        if (!e.follow_up_date) return false
        return new Date(e.follow_up_date) <= today
      }).length,
      logoMissing:   exhibitors.filter((e) => !e.logo_received && e.status !== 'prospect' && e.status !== 'contacted').length,
      boothsToAssign: exhibitors.filter((e) => e.booth_status === 'to_assign').length,
      readyToPublish: exhibitors.filter((e) => e.status === 'ready_to_publish').length,
    }
  }, [exhibitors])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-8">
      <StatCard label="Total" value={stats.total} />
      <StatCard label="Confirmés" value={stats.confirmed} accent="text-emerald-400" />
      <StatCard label="Payés" value={stats.paid} accent="text-green-400" />
      <StatCard
        label="À relancer"
        value={stats.toFollowUp}
        accent={stats.toFollowUp > 0 ? 'text-amber-400' : 'text-white'}
      />
      <StatCard
        label="Logo manquant"
        value={stats.logoMissing}
        accent={stats.logoMissing > 0 ? 'text-orange-400' : 'text-white'}
      />
      <StatCard
        label="Kiosques à attribuer"
        value={stats.boothsToAssign}
        accent={stats.boothsToAssign > 0 ? 'text-yellow-400' : 'text-white'}
      />
      <StatCard
        label="Prêts à publier"
        value={stats.readyToPublish}
        accent={stats.readyToPublish > 0 ? 'text-violet-400' : 'text-white'}
      />
    </div>
  )
}
