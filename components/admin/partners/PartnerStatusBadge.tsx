'use client'

import type { PartnerType, PartnerStatus, PaymentStatus, BoothStatus } from '@/lib/supabase/types'

type BadgeProps = { label: string; className: string }

function Badge({ label, className }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium whitespace-nowrap ${className}`}>
      {label}
    </span>
  )
}

// ─── Partner Status ───────────────────────────────────────

const STATUS_MAP: Record<PartnerStatus, BadgeProps> = {
  prospect:         { label: 'Prospect',          className: 'bg-gray-700/80 text-gray-300' },
  contacted:        { label: 'Contacté',          className: 'bg-blue-900/60 text-blue-300' },
  confirmed:        { label: 'Confirmé',          className: 'bg-cyan-900/60 text-cyan-300' },
  invoiced:         { label: 'Facturé',           className: 'bg-amber-900/60 text-amber-300' },
  paid:             { label: 'Payé',              className: 'bg-emerald-900/60 text-emerald-400' },
  assets_pending:   { label: 'Actifs manquants',  className: 'bg-orange-900/60 text-orange-300' },
  ready_to_publish: { label: 'Prêt à publier',   className: 'bg-violet-900/60 text-violet-300' },
  published:        { label: 'Publié',            className: 'bg-green-900/60 text-green-400' },
  cancelled:        { label: 'Annulé',            className: 'bg-red-900/60 text-red-400' },
}

export function PartnerStatusBadge({ status }: { status: PartnerStatus }) {
  return <Badge {...STATUS_MAP[status]} />
}

// ─── Partner Type ─────────────────────────────────────────

const TYPE_MAP: Record<PartnerType, BadgeProps> = {
  Platinum: { label: 'Platine',   className: 'bg-violet-900/60 text-violet-200 ring-1 ring-violet-700/50' },
  Gold:     { label: 'Or',        className: 'bg-yellow-900/60 text-yellow-300 ring-1 ring-yellow-700/50' },
  Silver:   { label: 'Argent',    className: 'bg-slate-700/80 text-slate-200 ring-1 ring-slate-600/50' },
  Bronze:   { label: 'Bronze',    className: 'bg-orange-900/60 text-orange-300 ring-1 ring-orange-700/50' },
  Exhibitor:{ label: 'Exposant',  className: 'bg-blue-900/60 text-blue-300 ring-1 ring-blue-700/50' },
  Other:    { label: 'Autre',     className: 'bg-gray-800 text-gray-400 ring-1 ring-gray-700' },
}

export function PartnerTypeBadge({ type }: { type: PartnerType }) {
  return <Badge {...TYPE_MAP[type]} />
}

// ─── Payment Status ───────────────────────────────────────

const PAYMENT_MAP: Record<PaymentStatus, BadgeProps> = {
  unpaid:   { label: 'Impayé',    className: 'bg-red-900/60 text-red-400' },
  pending:  { label: 'En cours',  className: 'bg-amber-900/60 text-amber-300' },
  paid:     { label: 'Payé',      className: 'bg-emerald-900/60 text-emerald-400' },
  cancelled:{ label: 'Annulé',   className: 'bg-gray-700/80 text-gray-400' },
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge {...PAYMENT_MAP[status]} />
}

// ─── Booth Status ─────────────────────────────────────────

const BOOTH_MAP: Record<BoothStatus, BadgeProps> = {
  not_required: { label: '—',            className: 'bg-gray-800 text-gray-600' },
  to_assign:    { label: 'À attribuer',  className: 'bg-orange-900/60 text-orange-300' },
  assigned:     { label: 'Attribué',     className: 'bg-blue-900/60 text-blue-300' },
  confirmed:    { label: 'Confirmé',     className: 'bg-emerald-900/60 text-emerald-400' },
}

export function BoothStatusBadge({ status }: { status: BoothStatus }) {
  return <Badge {...BOOTH_MAP[status]} />
}
