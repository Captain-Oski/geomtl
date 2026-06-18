'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Exhibitor, ExhibitorStatus, PaymentStatus } from '@/lib/supabase/types'
import { ExhibitorStatusBadge, PaymentStatusBadge, BoothStatusBadge } from './ExhibitorStatusBadge'
import {
  archiveExhibitor,
  deleteExhibitor,
  toggleExhibitorVisibility,
  updateExhibitorStatus,
  updateExhibitorPaymentStatus,
  markExhibitorLogoReceived,
} from '@/lib/actions/exhibitors'

interface Props {
  exhibitors: Exhibitor[]
}

export function ExhibitorTable({ exhibitors }: Props) {
  const router = useRouter()
  const [toast, setToast] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  function showError(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  async function run(fn: () => Promise<{ error?: string }>) {
    const res = await fn()
    if (res.error) { showError(res.error); return }
    router.refresh()
    setOpenMenuId(null)
  }

  if (exhibitors.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg">Aucun exposant trouvé</p>
        <p className="text-sm mt-1">Ajustez les filtres ou créez un nouvel exposant.</p>
      </div>
    )
  }

  return (
    <>
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg shadow-lg text-sm">
          {toast}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
              <th className="text-left py-3 px-3 font-medium">Entreprise</th>
              <th className="text-left py-3 px-3 font-medium">Secteur</th>
              <th className="text-left py-3 px-3 font-medium">Statut</th>
              <th className="text-left py-3 px-3 font-medium">Contact</th>
              <th className="text-left py-3 px-3 font-medium">Paiement</th>
              <th className="text-center py-3 px-3 font-medium">Logo</th>
              <th className="text-left py-3 px-3 font-medium">Kiosque</th>
              <th className="text-center py-3 px-3 font-medium">Public</th>
              <th className="text-left py-3 px-3 font-medium">Responsable</th>
              <th className="text-left py-3 px-3 font-medium">Relance</th>
              <th className="text-right py-3 px-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {exhibitors.map((e) => {
              const isOverdue = e.follow_up_date && new Date(e.follow_up_date) <= today
              const hasWarning =
                isOverdue ||
                (!e.logo_received &&
                  !['prospect', 'contacted'].includes(e.status))

              return (
                <tr
                  key={e.id}
                  className={`hover:bg-white/5 transition-colors ${hasWarning ? 'border-l-2 border-amber-500/50' : ''}`}
                >
                  {/* Entreprise */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <Link
                          href={`/admin/exhibitors/${e.id}/edit`}
                          className="font-medium text-white hover:text-blue-400 transition-colors"
                        >
                          {e.company_name}
                        </Link>
                        {e.public_name && e.public_name !== e.company_name && (
                          <p className="text-gray-500 text-xs">{e.public_name}</p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Secteur */}
                  <td className="py-3 px-3 text-gray-400 text-xs">
                    {e.sector ?? <span className="text-gray-600">—</span>}
                  </td>

                  {/* Statut */}
                  <td className="py-3 px-3">
                    <ExhibitorStatusBadge status={e.status} />
                  </td>

                  {/* Contact */}
                  <td className="py-3 px-3">
                    {e.primary_contact_name ? (
                      <div>
                        <p className="text-white text-xs">{e.primary_contact_name}</p>
                        {e.primary_contact_email && (
                          <a
                            href={`mailto:${e.primary_contact_email}`}
                            className="text-gray-500 text-xs hover:text-blue-400 transition-colors"
                          >
                            {e.primary_contact_email}
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  {/* Paiement */}
                  <td className="py-3 px-3">
                    <PaymentStatusBadge status={e.payment_status} />
                  </td>

                  {/* Logo */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => run(() => markExhibitorLogoReceived(e.id, !e.logo_received))}
                      className={`w-6 h-6 rounded border transition-colors ${
                        e.logo_received
                          ? 'bg-green-600 border-green-500 text-white'
                          : 'border-gray-600 text-gray-600 hover:border-gray-400'
                      }`}
                      title={e.logo_received ? 'Marquer non reçu' : 'Marquer reçu'}
                    >
                      {e.logo_received && '✓'}
                    </button>
                  </td>

                  {/* Kiosque */}
                  <td className="py-3 px-3">
                    {e.booth_number ? (
                      <div>
                        <p className="text-white text-xs font-mono">{e.booth_number}</p>
                        <BoothStatusBadge status={e.booth_status} />
                      </div>
                    ) : (
                      <BoothStatusBadge status={e.booth_status} />
                    )}
                  </td>

                  {/* Public */}
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => run(() => toggleExhibitorVisibility(e.id, !e.public_visibility))}
                      className={`w-6 h-6 rounded border transition-colors ${
                        e.public_visibility
                          ? 'bg-teal-600 border-teal-500 text-white'
                          : 'border-gray-600 text-gray-600 hover:border-gray-400'
                      }`}
                      title={e.public_visibility ? 'Masquer' : 'Rendre public'}
                    >
                      {e.public_visibility && '✓'}
                    </button>
                  </td>

                  {/* Responsable */}
                  <td className="py-3 px-3 text-gray-400 text-xs">
                    {e.internal_owner_name ?? <span className="text-gray-600">—</span>}
                  </td>

                  {/* Relance */}
                  <td className="py-3 px-3">
                    {e.follow_up_date ? (
                      <span className={`text-xs ${isOverdue ? 'text-amber-400 font-medium' : 'text-gray-400'}`}>
                        {isOverdue && '⚠ '}
                        {new Date(e.follow_up_date).toLocaleDateString('fr-CA')}
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === e.id ? null : e.id)}
                        className="text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors text-lg leading-none"
                      >
                        ⋮
                      </button>

                      {openMenuId === e.id && (
                        <div className="absolute right-0 top-8 z-20 bg-gray-900 border border-white/20 rounded-lg shadow-xl w-48 py-1">
                          <Link
                            href={`/admin/exhibitors/${e.id}/edit`}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                          >
                            Modifier
                          </Link>

                          {e.status !== 'published' && (
                            <button
                              onClick={() => run(() => updateExhibitorStatus(e.id, 'published' as ExhibitorStatus))}
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                              Publier
                            </button>
                          )}

                          {e.status === 'published' && (
                            <button
                              onClick={() => run(() => updateExhibitorStatus(e.id, 'ready_to_publish' as ExhibitorStatus))}
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                              Dépublier
                            </button>
                          )}

                          {e.payment_status !== 'paid' && (
                            <button
                              onClick={() => run(() => updateExhibitorPaymentStatus(e.id, 'paid' as PaymentStatus))}
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                              Marquer payé
                            </button>
                          )}

                          {!e.logo_received && (
                            <button
                              onClick={() => run(() => markExhibitorLogoReceived(e.id, true))}
                              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                            >
                              Marquer logo reçu
                            </button>
                          )}

                          <div className="border-t border-white/10 my-1" />

                          <button
                            onClick={() => {
                              if (confirm('Archiver cet exposant ?')) {
                                run(() => archiveExhibitor(e.id))
                              }
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-amber-400 hover:bg-white/10"
                          >
                            Archiver
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Supprimer définitivement "${e.company_name}" ?`)) {
                                run(() => deleteExhibitor(e.id))
                              }
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
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
