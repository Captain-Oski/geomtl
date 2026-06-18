import type { SessionStatus, SessionType } from '@/lib/supabase/types'

const STATUS_CONFIG: Record<SessionStatus, { label: string; className: string }> = {
  draft:     { label: 'Brouillon',  className: 'bg-gray-500/15 text-gray-400' },
  confirmed: { label: 'Confirmée', className: 'bg-green-500/15 text-green-400' },
  cancelled: { label: 'Annulée',   className: 'bg-red-500/15 text-red-400' },
}

const TYPE_CONFIG: Record<SessionType, { label: string; className: string }> = {
  keynote:    { label: 'Keynote',     className: 'bg-rose-500/15 text-rose-400' },
  conference: { label: 'Conférence',  className: 'bg-blue-500/15 text-blue-400' },
  panel:      { label: 'Panel',       className: 'bg-purple-500/15 text-purple-400' },
  workshop:   { label: 'Atelier',     className: 'bg-orange-500/15 text-orange-400' },
  networking: { label: 'Réseautage',  className: 'bg-teal-500/15 text-teal-400' },
  demo:       { label: 'Démo',        className: 'bg-yellow-500/15 text-yellow-400' },
  awards:     { label: 'Remise prix', className: 'bg-amber-500/15 text-amber-400' },
}

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  )
}

export function SessionTypeBadge({ type }: { type: SessionType }) {
  const cfg = TYPE_CONFIG[type]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  )
}

export const SESSION_TYPE_LABELS = TYPE_CONFIG
export const SESSION_STATUS_LABELS = STATUS_CONFIG
