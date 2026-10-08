'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Exhibitor, ExhibitorStatus, PaymentStatus, BoothStatus } from '@/lib/supabase/types'
import { ExhibitorDashboard } from './ExhibitorDashboard'
import { ExhibitorTable } from './ExhibitorTable'

interface Props {
  exhibitors: Exhibitor[]
}

type SortKey = 'company_name' | 'display_order' | 'status' | 'follow_up_date'

const STATUS_OPTIONS: { value: ExhibitorStatus | ''; label: string }[] = [
  { value: '', label: 'Tous les statuts' },
  { value: 'prospect', label: 'Prospect' },
  { value: 'contacted', label: 'Contacté' },
  { value: 'confirmed', label: 'Confirmé' },
  { value: 'invoiced', label: 'Facturé' },
  { value: 'paid', label: 'Payé' },
  { value: 'assets_pending', label: 'Actifs manquants' },
  { value: 'ready_to_publish', label: 'Prêt à publier' },
  { value: 'published', label: 'Publié' },
  { value: 'cancelled', label: 'Annulé' },
]

const PAYMENT_OPTIONS: { value: PaymentStatus | ''; label: string }[] = [
  { value: '', label: 'Tous paiements' },
  { value: 'unpaid', label: 'Non payé' },
  { value: 'pending', label: 'En attente' },
  { value: 'paid', label: 'Payé' },
  { value: 'cancelled', label: 'Annulé' },
]

const BOOTH_OPTIONS: { value: BoothStatus | ''; label: string }[] = [
  { value: '', label: 'Tous kiosques' },
  { value: 'not_required', label: 'Non requis' },
  { value: 'to_assign', label: 'À attribuer' },
  { value: 'assigned', label: 'Attribué' },
  { value: 'confirmed', label: 'Confirmé' },
]

export function AdminExhibitorsPage({ exhibitors }: Props) {
  const [search, setSearch]             = useState('')
  const [filterStatus, setFilterStatus] = useState<ExhibitorStatus | ''>('')
  const [filterPayment, setFilterPayment] = useState<PaymentStatus | ''>('')
  const [filterBooth, setFilterBooth]   = useState<BoothStatus | ''>('')
  const [filterPublic, setFilterPublic] = useState<'' | 'true' | 'false'>('')
  const [sortKey, setSortKey]           = useState<SortKey>('display_order')

  const owners = useMemo(
    () => Array.from(new Set(exhibitors.map((e) => e.internal_owner_name).filter(Boolean))) as string[],
    [exhibitors],
  )
  const [filterOwner, setFilterOwner] = useState('')

  const sectors = useMemo(
    () => Array.from(new Set(exhibitors.map((e) => e.sector).filter(Boolean))) as string[],
    [exhibitors],
  )
  const [filterSector, setFilterSector] = useState('')

  const filtered = useMemo(() => {
    let list = [...exhibitors]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (e) =>
          e.company_name.toLowerCase().includes(q) ||
          e.public_name?.toLowerCase().includes(q) ||
          e.primary_contact_name?.toLowerCase().includes(q) ||
          e.primary_contact_email?.toLowerCase().includes(q) ||
          e.sector?.toLowerCase().includes(q),
      )
    }

    if (filterStatus)  list = list.filter((e) => e.status === filterStatus)
    if (filterPayment) list = list.filter((e) => e.payment_status === filterPayment)
    if (filterBooth)   list = list.filter((e) => e.booth_status === filterBooth)
    if (filterPublic)  list = list.filter((e) => String(e.public_visibility) === filterPublic)
    if (filterOwner)   list = list.filter((e) => e.internal_owner_name === filterOwner)
    if (filterSector)  list = list.filter((e) => e.sector === filterSector)

    list.sort((a, b) => {
      if (sortKey === 'company_name')  return a.company_name.localeCompare(b.company_name)
      if (sortKey === 'display_order') return a.display_order - b.display_order
      if (sortKey === 'status')        return a.status.localeCompare(b.status)
      if (sortKey === 'follow_up_date') {
        if (!a.follow_up_date) return 1
        if (!b.follow_up_date) return -1
        return a.follow_up_date.localeCompare(b.follow_up_date)
      }
      return 0
    })

    return list
  }, [exhibitors, search, filterStatus, filterPayment, filterBooth, filterPublic, filterOwner, filterSector, sortKey])

  function resetFilters() {
    setSearch('')
    setFilterStatus('')
    setFilterPayment('')
    setFilterBooth('')
    setFilterPublic('')
    setFilterOwner('')
    setFilterSector('')
    setSortKey('display_order')
  }

  const hasFilters = search || filterStatus || filterPayment || filterBooth || filterPublic || filterOwner || filterSector

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Exposants</h1>
          <p className="text-gray-500 text-sm mt-0.5">GÉOMTL 2027</p>
        </div>
        <Link
          href="/admin/exhibitors/new"
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Nouvel exposant
        </Link>
      </div>

      <ExhibitorDashboard exhibitors={exhibitors} />

      {/* Filtres */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          <input
            type="search"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-2 sm:col-span-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ExhibitorStatus | '')}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>
            ))}
          </select>

          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value as PaymentStatus | '')}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            {PAYMENT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>
            ))}
          </select>

          <select
            value={filterBooth}
            onChange={(e) => setFilterBooth(e.target.value as BoothStatus | '')}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            {BOOTH_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-gray-900">{o.label}</option>
            ))}
          </select>

          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            <option value="" className="bg-gray-900">Tous les secteurs</option>
            {sectors.map((s) => (
              <option key={s} value={s} className="bg-gray-900">{s}</option>
            ))}
          </select>

          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            <option value="" className="bg-gray-900">Tous les responsables</option>
            {owners.map((o) => (
              <option key={o} value={o} className="bg-gray-900">{o}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="display_order" className="bg-gray-900">Ordre</option>
              <option value="company_name"  className="bg-gray-900">Nom A→Z</option>
              <option value="status"        className="bg-gray-900">Statut</option>
              <option value="follow_up_date" className="bg-gray-900">Relance</option>
            </select>
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="text-gray-400 hover:text-white text-xs px-2 py-2 rounded hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                ✕ Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <p className="text-gray-400 text-sm">
            {filtered.length} exposant{filtered.length !== 1 ? 's' : ''}
            {hasFilters && exhibitors.length !== filtered.length && (
              <span className="text-gray-600"> sur {exhibitors.length}</span>
            )}
          </p>
        </div>
        <ExhibitorTable exhibitors={filtered} />
      </div>
    </div>
  )
}
