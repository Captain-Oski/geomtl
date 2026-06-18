'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Partner } from '@/lib/supabase/types'
import {
  PartnerStatusBadge,
  PartnerTypeBadge,
  PaymentStatusBadge,
} from './PartnerStatusBadge'
import {
  togglePartnerVisibility,
  updatePaymentStatus,
  markLogoReceived,
  archivePartner,
  deletePartner,
} from '@/lib/actions/partners'

type Props = {
  partners: Partner[]
}

export function PartnerTable({ partners }: Props) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  function showToast(msg: string) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  async function run(id: string, fn: () => Promise<{ error?: string }>) {
    setLoadingId(id)
    setOpenMenuId(null)
    const { error } = await fn()
    setLoadingId(null)
    if (error) showToast(error)
    else router.refresh()
  }

  if (partners.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center text-gray-500 text-sm">
        Aucun partenaire trouvé.
      </div>
    )
  }

  return (
    <>
      {toastMsg && (
        <div className="fixed bottom-4 right-4 bg-rose-600 text-white text-sm px-4 py-2 rounded-lg shadow-xl z-50">
          {toastMsg}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-sm min-w-[1100px]">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-500 uppercase tracking-wide">
              <th className="px-4 py-3 text-left font-medium">Compagnie</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Statut</th>
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-left font-medium">Paiement</th>
              <th className="px-4 py-3 text-center font-medium">Logo</th>
              <th className="px-4 py-3 text-left font-medium">Kiosque</th>
              <th className="px-4 py-3 text-center font-medium">Public</th>
              <th className="px-4 py-3 text-left font-medium">Responsable</th>
              <th className="px-4 py-3 text-left font-medium">Relance</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/60">
            {partners.map((p) => {
              const isLoading = loadingId === p.id
              const followUpDate = p.follow_up_date ? new Date(p.follow_up_date) : null
              const isOverdue = followUpDate && followUpDate <= today && p.status !== 'cancelled'
              const isIncomplete =
                ['confirmed', 'invoiced', 'paid', 'assets_pending'].includes(p.status) &&
                (!p.logo_received || !p.description_received || !p.company_name_confirmed)

              return (
                <tr
                  key={p.id}
                  className={`group transition-colors ${isLoading ? 'opacity-50' : 'hover:bg-gray-800/30'}`}
                >
                  {/* Compagnie */}
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div>
                        <Link
                          href={`/admin/partners/${p.id}/edit`}
                          className="font-medium text-white hover:text-rose-400 transition-colors"
                        >
                          {p.company_name}
                        </Link>
                        {p.public_name && p.public_name !== p.company_name && (
                          <div className="text-xs text-gray-500">{p.public_name}</div>
                        )}
                        {isIncomplete && (
                          <span className="text-xs text-orange-400">Fiche incomplète</span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3">
                    <PartnerTypeBadge type={p.partner_type} />
                  </td>

                  {/* Statut */}
                  <td className="px-4 py-3">
                    <PartnerStatusBadge status={p.status} />
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3">
                    {p.primary_contact_name ? (
                      <div>
                        <div className="text-white text-xs">{p.primary_contact_name}</div>
                        {p.primary_contact_email && (
                          <div className="text-gray-500 text-xs truncate max-w-[140px]">
                            {p.primary_contact_email}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  {/* Paiement */}
                  <td className="px-4 py-3">
                    <PaymentStatusBadge status={p.payment_status} />
                  </td>

                  {/* Logo */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => run(p.id, () => markLogoReceived(p.id, !p.logo_received))}
                      disabled={isLoading}
                      title={p.logo_received ? 'Marquer logo manquant' : 'Marquer logo reçu'}
                      className="text-lg"
                    >
                      {p.logo_received ? (
                        <span className="text-emerald-400">✓</span>
                      ) : (
                        <span className="text-gray-600">○</span>
                      )}
                    </button>
                  </td>

                  {/* Kiosque */}
                  <td className="px-4 py-3">
                    {p.booth_number ? (
                      <span className="text-white text-xs font-mono">{p.booth_number}</span>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  {/* Visibilité publique */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => run(p.id, () => togglePartnerVisibility(p.id, !p.public_visibility))}
                      disabled={isLoading}
                      title={p.public_visibility ? 'Dépublier' : 'Publier'}
                      className={`w-8 h-4 rounded-full transition-colors relative ${
                        p.public_visibility ? 'bg-rose-500' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform shadow ${
                          p.public_visibility ? 'left-4.5 translate-x-0' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </td>

                  {/* Responsable */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-400 truncate block max-w-[110px]">
                      {p.internal_owner_name ?? '—'}
                    </span>
                  </td>

                  {/* Relance */}
                  <td className="px-4 py-3">
                    {followUpDate ? (
                      <span className={`text-xs ${isOverdue ? 'text-red-400 font-medium' : 'text-gray-400'}`}>
                        {isOverdue && '⚠ '}
                        {followUpDate.toLocaleDateString('fr-CA', { month: 'short', day: 'numeric' })}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-center relative">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        href={`/admin/partners/${p.id}/edit`}
                        className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      >
                        Modifier
                      </Link>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
                          disabled={isLoading}
                          className="px-1.5 py-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors"
                        >
                          ···
                        </button>
                        {openMenuId === p.id && (
                          <>
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <div className="absolute right-0 bottom-full mb-1 w-44 bg-gray-800 border border-gray-700 rounded-xl py-1 shadow-xl z-40 text-left">
                              <button
                                onClick={() => run(p.id, () => togglePartnerVisibility(p.id, !p.public_visibility))}
                                className="w-full px-3 py-2 text-xs text-gray-300 hover:bg-gray-700 hover:text-white text-left"
                              >
                                {p.public_visibility ? 'Dépublier' : 'Publier sur le site'}
                              </button>
                              <button
                                onClick={() => run(p.id, () => updatePaymentStatus(p.id, 'paid'))}
                                className="w-full px-3 py-2 text-xs text-gray-300 hover:bg-gray-700 hover:text-white text-left"
                              >
                                Marquer payé
                              </button>
                              <button
                                onClick={() => run(p.id, () => markLogoReceived(p.id, true))}
                                className="w-full px-3 py-2 text-xs text-gray-300 hover:bg-gray-700 hover:text-white text-left"
                              >
                                Marquer logo reçu
                              </button>
                              <div className="border-t border-gray-700 my-1" />
                              <button
                                onClick={() => {
                                  if (confirm(`Archiver ${p.company_name} ?`)) {
                                    run(p.id, () => archivePartner(p.id))
                                  } else {
                                    setOpenMenuId(null)
                                  }
                                }}
                                className="w-full px-3 py-2 text-xs text-amber-400 hover:bg-gray-700 text-left"
                              >
                                Archiver
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Supprimer définitivement ${p.company_name} ?`)) {
                                    run(p.id, () => deletePartner(p.id))
                                  } else {
                                    setOpenMenuId(null)
                                  }
                                }}
                                className="w-full px-3 py-2 text-xs text-red-400 hover:bg-gray-700 text-left"
                              >
                                Supprimer
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
