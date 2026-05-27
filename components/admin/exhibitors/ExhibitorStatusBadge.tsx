import type { ExhibitorStatus, PaymentStatus, BoothStatus, BoothSize } from '@/lib/supabase/types'

const STATUS_STYLES: Record<ExhibitorStatus, string> = {
  prospect:         'bg-gray-800 text-gray-300',
  contacted:        'bg-blue-900/60 text-blue-300',
  confirmed:        'bg-emerald-900/60 text-emerald-300',
  invoiced:         'bg-amber-900/60 text-amber-300',
  paid:             'bg-green-900/60 text-green-300',
  assets_pending:   'bg-orange-900/60 text-orange-300',
  ready_to_publish: 'bg-violet-900/60 text-violet-300',
  published:        'bg-teal-900/60 text-teal-300',
  cancelled:        'bg-red-900/60 text-red-300',
}

const STATUS_LABELS: Record<ExhibitorStatus, string> = {
  prospect:         'Prospect',
  contacted:        'Contacté',
  confirmed:        'Confirmé',
  invoiced:         'Facturé',
  paid:             'Payé',
  assets_pending:   'Actifs manquants',
  ready_to_publish: 'Prêt à publier',
  published:        'Publié',
  cancelled:        'Annulé',
}

const PAYMENT_STYLES: Record<PaymentStatus, string> = {
  unpaid:    'bg-red-900/50 text-red-300',
  pending:   'bg-amber-900/50 text-amber-300',
  paid:      'bg-green-900/50 text-green-300',
  cancelled: 'bg-gray-800 text-gray-400',
}

const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  unpaid:    'Non payé',
  pending:   'En attente',
  paid:      'Payé',
  cancelled: 'Annulé',
}

const BOOTH_STYLES: Record<BoothStatus, string> = {
  not_required: 'bg-gray-800 text-gray-400',
  to_assign:    'bg-yellow-900/50 text-yellow-300',
  assigned:     'bg-blue-900/50 text-blue-300',
  confirmed:    'bg-green-900/50 text-green-300',
}

const BOOTH_LABELS: Record<BoothStatus, string> = {
  not_required: '—',
  to_assign:    'À attribuer',
  assigned:     'Attribué',
  confirmed:    'Confirmé',
}

const SIZE_LABELS: Record<BoothSize, string> = {
  standard: 'Standard',
  double:   'Double',
  corner:   'Coin',
  island:   'Îlot',
}

export function ExhibitorStatusBadge({ status }: { status: ExhibitorStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${PAYMENT_STYLES[status]}`}>
      {PAYMENT_LABELS[status]}
    </span>
  )
}

export function BoothStatusBadge({ status }: { status: BoothStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${BOOTH_STYLES[status]}`}>
      {BOOTH_LABELS[status]}
    </span>
  )
}

export function BoothSizeBadge({ size }: { size: BoothSize }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-900/50 text-indigo-300">
      {SIZE_LABELS[size]}
    </span>
  )
}
