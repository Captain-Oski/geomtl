'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Partner, PartnerType, PartnerStatus, PaymentStatus } from '@/lib/supabase/types'
import { PartnerDashboard } from './PartnerDashboard'
import { PartnerTable } from './PartnerTable'

const PARTNER_TYPES: PartnerType[] = ['Platinum', 'Gold', 'Silver', 'Bronze', 'Exhibitor', 'Other']
const STATUSES: PartnerStatus[] = [
  'prospect', 'contacted', 'confirmed', 'invoiced', 'paid',
  'assets_pending', 'ready_to_publish', 'published', 'cancelled',
]
const PAYMENT_STATUSES: PaymentStatus[] = ['unpaid', 'pending', 'paid', 'cancelled']

const STATUS_LABELS: Record<PartnerStatus, string> = {
  prospect: 'Prospect', contacted: 'Contacté', confirmed: 'Confirmé',
  invoiced: 'Facturé', paid: 'Payé', assets_pending: 'Actifs manquants',
  ready_to_publish: 'Prêt à publier', published: 'Publié', cancelled: 'Annulé',
}

type Filters = {
  partner_type: PartnerType | ''
  status: PartnerStatus | ''
  payment_status: PaymentStatus | ''
  public_visibility: '' | 'true' | 'false'
  internal_owner: string
}

const DEFAULT_FILTERS: Filters = {
  partner_type: '',
  status: '',
  payment_status: '',
  public_visibility: '',
  internal_owner: '',
}

type SortField = 'company_name' | 'partner_type' | 'status' | 'follow_up_date' | 'display_order' | 'payment_status'

export function AdminPartnersPage({ partners }: { partners: Partner[] }) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<{ field: SortField; dir: 'asc' | 'desc' }>({
    field: 'display_order',
    dir: 'asc',
  })
  const [showFilters, setShowFilters] = useState(false)

  // Unique owners for filter dropdown
  const owners = useMemo(() => {
    const set = new Set(partners.map((p) => p.internal_owner_name).filter(Boolean) as string[])
    return Array.from(set).sort()
  }, [partners])

  const filtered = useMemo(() => {
    let result = partners

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.company_name.toLowerCase().includes(q) ||
          p.public_name?.toLowerCase().includes(q) ||
          p.primary_contact_name?.toLowerCase().includes(q) ||
          p.primary_contact_email?.toLowerCase().includes(q)
      )
    }

    if (filters.partner_type) result = result.filter((p) => p.partner_type === filters.partner_type)
    if (filters.status) result = result.filter((p) => p.status === filters.status)
    if (filters.payment_status) result = result.filter((p) => p.payment_status === filters.payment_status)
    if (filters.public_visibility !== '') {
      const v = filters.public_visibility === 'true'
      result = result.filter((p) => p.public_visibility === v)
    }
    if (filters.internal_owner) result = result.filter((p) => p.internal_owner_name === filters.internal_owner)

    return [...result].sort((a, b) => {
      const av = a[sort.field] ?? ''
      const bv = b[sort.field] ?? ''
      const cmp = String(av).localeCompare(String(bv))
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [partners, search, filters, sort])

  function toggleSort(field: SortField) {
    setSort((s) => ({
      field,
      dir: s.field === field && s.dir === 'asc' ? 'desc' : 'asc',
    }))
  }

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((f) => ({ ...f, [key]: value }))
  }

  const hasActiveFilters = Object.values(filters).some(Boolean) || search

  const selectClass =
    'bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-rose-500'

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Partenaires</h1>
          <p className="text-gray-500 text-sm mt-0.5">GeoMTL 2027</p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          + Nouveau partenaire
        </Link>
      </div>

      {/* Stats */}
      <PartnerDashboard partners={partners} />

      {/* Search + Filters */}
      <div className="mb-4 space-y-3">
        <div className="flex gap-3">
          <input
            type="search"
            placeholder="Rechercher par nom, contact, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 text-sm rounded-xl border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            Filtres {hasActiveFilters ? '•' : ''}
          </button>
          {hasActiveFilters && (
            <button
              onClick={() => { setFilters(DEFAULT_FILTERS); setSearch('') }}
              className="px-3 py-2 text-xs text-gray-500 hover:text-white transition-colors"
            >
              Effacer
            </button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Type</label>
              <select className={selectClass} value={filters.partner_type} onChange={(e) => updateFilter('partner_type', e.target.value as PartnerType | '')}>
                <option value="">Tous</option>
                {PARTNER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Statut</label>
              <select className={selectClass} value={filters.status} onChange={(e) => updateFilter('status', e.target.value as PartnerStatus | '')}>
                <option value="">Tous</option>
                {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Paiement</label>
              <select className={selectClass} value={filters.payment_status} onChange={(e) => updateFilter('payment_status', e.target.value as PaymentStatus | '')}>
                <option value="">Tous</option>
                {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Visibilité</label>
              <select className={selectClass} value={filters.public_visibility} onChange={(e) => updateFilter('public_visibility', e.target.value as '' | 'true' | 'false')}>
                <option value="">Tous</option>
                <option value="true">Publié</option>
                <option value="false">Non publié</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Responsable</label>
              <select className={selectClass} value={filters.internal_owner} onChange={(e) => updateFilter('internal_owner', e.target.value)}>
                <option value="">Tous</option>
                {owners.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count + sort */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">
          {filtered.length} partenaire{filtered.length !== 1 ? 's' : ''}
          {filtered.length !== partners.length ? ` sur ${partners.length}` : ''}
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          Trier par
          {(['company_name', 'display_order', 'status', 'follow_up_date'] as SortField[]).map((f) => (
            <button
              key={f}
              onClick={() => toggleSort(f)}
              className={`px-2 py-0.5 rounded transition-colors ${sort.field === f ? 'text-rose-400 bg-rose-500/10' : 'hover:text-white'}`}
            >
              {f === 'company_name' ? 'Nom' : f === 'display_order' ? 'Ordre' : f === 'status' ? 'Statut' : 'Relance'}
              {sort.field === f && (sort.dir === 'asc' ? ' ↑' : ' ↓')}
            </button>
          ))}
        </div>
      </div>

      <PartnerTable partners={filtered} />
    </div>
  )
}
