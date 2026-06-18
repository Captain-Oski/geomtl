'use client'

import { useRef } from 'react'
import { createSession, updateSession } from '@/lib/actions/programme'
import type { Session, SessionType, SessionDay, SessionStatus } from '@/lib/supabase/types'

const TYPES: { value: SessionType; label: string }[] = [
  { value: 'keynote',    label: 'Keynote' },
  { value: 'conference', label: 'Conférence' },
  { value: 'panel',      label: 'Panel' },
  { value: 'workshop',   label: 'Atelier' },
  { value: 'networking', label: 'Réseautage' },
  { value: 'demo',       label: 'Démo' },
  { value: 'awards',     label: 'Remise de prix' },
]

const DAYS: { value: SessionDay; label: string }[] = [
  { value: 'evening', label: 'Soirée — 3 octobre' },
  { value: 'day1',    label: 'Jour 1 — 4 octobre' },
  { value: 'day2',    label: 'Jour 2 — 5 octobre' },
]

const STATUSES: { value: SessionStatus; label: string }[] = [
  { value: 'draft',     label: 'Brouillon' },
  { value: 'confirmed', label: 'Confirmée' },
  { value: 'cancelled', label: 'Annulée' },
]

const inputClass =
  'w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-rose-500'
const labelClass = 'block text-xs font-medium text-gray-400 mb-1'

export function SessionForm({ session }: { session?: Session }) {
  const formRef = useRef<HTMLFormElement>(null)

  const action = session
    ? updateSession.bind(null, session.id)
    : createSession

  return (
    <form ref={formRef} action={action} className="space-y-6 max-w-3xl">
      {/* Titre */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Titre (FR) *</label>
          <input name="title_fr" required defaultValue={session?.title_fr ?? ''} className={inputClass} placeholder="Titre de la session" />
        </div>
        <div>
          <label className={labelClass}>Titre (EN)</label>
          <input name="title_en" defaultValue={session?.title_en ?? ''} className={inputClass} placeholder="Session title" />
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Description (FR)</label>
          <textarea name="description_fr" rows={3} defaultValue={session?.description_fr ?? ''} className={inputClass} placeholder="Description en français" />
        </div>
        <div>
          <label className={labelClass}>Description (EN)</label>
          <textarea name="description_en" rows={3} defaultValue={session?.description_en ?? ''} className={inputClass} placeholder="Description in English" />
        </div>
      </div>

      {/* Type / Jour / Statut */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Type *</label>
          <select name="type" defaultValue={session?.type ?? 'conference'} className={inputClass}>
            {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Journée *</label>
          <select name="day" defaultValue={session?.day ?? 'day1'} className={inputClass}>
            {DAYS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Statut</label>
          <select name="status" defaultValue={session?.status ?? 'draft'} className={inputClass}>
            {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Horaire / Salle */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>Début *</label>
          <input name="start_time" type="time" required defaultValue={session?.start_time ?? '09:00'} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Fin *</label>
          <input name="end_time" type="time" required defaultValue={session?.end_time ?? '10:00'} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Salle</label>
          <input name="room" defaultValue={session?.room ?? ''} className={inputClass} placeholder="ex. Salle principale, Salle A…" />
        </div>
      </div>

      {/* Conférenciers / Modérateur */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Conférencier(s)</label>
          <input name="speakers" defaultValue={session?.speakers ?? ''} className={inputClass} placeholder="Noms séparés par virgule" />
          <p className="text-xs text-gray-600 mt-1">Séparer plusieurs noms par une virgule</p>
        </div>
        <div>
          <label className={labelClass}>Modérateur</label>
          <input name="moderator" defaultValue={session?.moderator ?? ''} className={inputClass} placeholder="Nom du modérateur" />
        </div>
      </div>

      {/* Ordre / Visibilité */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className={labelClass}>Ordre d'affichage</label>
          <input name="display_order" type="number" min={0} defaultValue={session?.display_order ?? 99} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Visibilité publique</label>
          <select name="public_visibility" defaultValue={session?.public_visibility ? 'true' : 'false'} className={inputClass}>
            <option value="true">Visible</option>
            <option value="false">Masquée</option>
          </select>
        </div>
      </div>

      {/* Notes internes */}
      <div>
        <label className={labelClass}>Notes internes</label>
        <textarea name="notes" rows={2} defaultValue={session?.notes ?? ''} className={inputClass} placeholder="Notes visibles uniquement par l'équipe admin" />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors"
        >
          {session ? 'Enregistrer' : 'Créer la session'}
        </button>
        <a
          href="/admin/programme"
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium px-5 py-2 rounded-xl transition-colors"
        >
          Annuler
        </a>
      </div>
    </form>
  )
}
