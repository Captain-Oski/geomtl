'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Exhibitor, ExhibitorStatus, PaymentStatus, BoothStatus, BoothSize } from '@/lib/supabase/types'
import { saveExhibitor } from '@/lib/actions/exhibitors'

interface Props {
  exhibitor?: Exhibitor
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 pb-2 border-b border-white/10">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
    </div>
  )
}

function Field({ label, children, span }: { label: string; children: React.ReactNode; span?: number }) {
  const cls = span === 2 ? 'sm:col-span-2' : span === 3 ? 'sm:col-span-2 lg:col-span-3' : ''
  return (
    <div className={cls}>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  )
}

const input = 'w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500'
const select = 'w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500'
const textarea = 'w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 resize-none'

const COMPLETENESS_FIELDS: (keyof Exhibitor)[] = [
  'company_name', 'primary_contact_name', 'primary_contact_email',
  'website_url', 'description_fr', 'logo_url',
  'booth_number', 'logo_received', 'company_name_confirmed', 'description_received',
]

export function ExhibitorForm({ exhibitor }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<Partial<Exhibitor>>(
    exhibitor ?? {
      year: 2027,
      public_visibility: false,
      display_order: 10,
      featured: false,
      status: 'prospect',
      payment_status: 'unpaid',
      booth_size: 'standard',
      booth_status: 'not_required',
      logo_received: false,
      logo_validated: false,
      company_name_confirmed: false,
      description_received: false,
      materials_received: false,
    },
  )

  function set<K extends keyof Exhibitor>(key: K, value: Exhibitor[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const completeness = useMemo(() => {
    const filled = COMPLETENESS_FIELDS.filter((k) => {
      const v = form[k]
      return v !== null && v !== undefined && v !== '' && v !== false
    })
    return Math.round((filled.length / COMPLETENESS_FIELDS.length) * 100)
  }, [form])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.company_name?.trim()) { setError("Le nom de l'entreprise est requis."); return }
    setSaving(true)
    setError(null)
    const res = await saveExhibitor(form, exhibitor?.id)
    setSaving(false)
    if (res.error) { setError(res.error); return }
    router.push('/admin/exhibitors')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      {/* Complétude */}
      <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Complétude du dossier</span>
          <span className="text-xs font-medium text-white">{completeness}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${completeness >= 80 ? 'bg-green-500' : completeness >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      {/* ── Identité ── */}
      <Section title="Identité">
        <Field label="Nom de l'entreprise *" span={2}>
          <input
            className={input}
            value={form.company_name ?? ''}
            onChange={(e) => set('company_name', e.target.value)}
            required
          />
        </Field>
        <Field label="Nom public (si différent)">
          <input
            className={input}
            value={form.public_name ?? ''}
            onChange={(e) => set('public_name', e.target.value || null)}
          />
        </Field>
        <Field label="Secteur d'activité" span={2}>
          <input
            className={input}
            placeholder="ex. Cartographie, Drone, IA, Open Source..."
            value={form.sector ?? ''}
            onChange={(e) => set('sector', e.target.value || null)}
          />
        </Field>
        <Field label="Année">
          <input
            type="number"
            className={input}
            value={form.year ?? 2027}
            onChange={(e) => set('year', parseInt(e.target.value))}
          />
        </Field>
      </Section>

      {/* ── Visibilité publique ── */}
      <Section title="Visibilité publique">
        <Field label="Site web">
          <input
            type="url"
            className={input}
            placeholder="https://..."
            value={form.website_url ?? ''}
            onChange={(e) => set('website_url', e.target.value || null)}
          />
        </Field>
        <Field label="URL du logo">
          <input
            type="url"
            className={input}
            placeholder="https://..."
            value={form.logo_url ?? ''}
            onChange={(e) => set('logo_url', e.target.value || null)}
          />
        </Field>
        <Field label="Texte alternatif du logo">
          <input
            className={input}
            value={form.logo_alt_text ?? ''}
            onChange={(e) => set('logo_alt_text', e.target.value || null)}
          />
        </Field>
        <Field label="Description (FR)" span={3}>
          <textarea
            className={textarea}
            rows={2}
            value={form.description_fr ?? ''}
            onChange={(e) => set('description_fr', e.target.value || null)}
          />
        </Field>
        <Field label="Description (EN)" span={3}>
          <textarea
            className={textarea}
            rows={2}
            value={form.description_en ?? ''}
            onChange={(e) => set('description_en', e.target.value || null)}
          />
        </Field>
        <Field label="Ordre d'affichage">
          <input
            type="number"
            className={input}
            value={form.display_order ?? 10}
            onChange={(e) => set('display_order', parseInt(e.target.value))}
          />
        </Field>
        <Field label="Visibilité publique">
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.public_visibility ?? false}
              onChange={(e) => set('public_visibility', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-300">Visible sur le site public</span>
          </label>
        </Field>
        <Field label="À la une">
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured ?? false}
              onChange={(e) => set('featured', e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-300">Exposant mis en avant</span>
          </label>
        </Field>
      </Section>

      {/* ── Contact ── */}
      <Section title="Contact">
        <Field label="Nom contact principal">
          <input
            className={input}
            value={form.primary_contact_name ?? ''}
            onChange={(e) => set('primary_contact_name', e.target.value || null)}
          />
        </Field>
        <Field label="Email contact principal">
          <input
            type="email"
            className={input}
            value={form.primary_contact_email ?? ''}
            onChange={(e) => set('primary_contact_email', e.target.value || null)}
          />
        </Field>
        <Field label="Téléphone contact principal">
          <input
            type="tel"
            className={input}
            value={form.primary_contact_phone ?? ''}
            onChange={(e) => set('primary_contact_phone', e.target.value || null)}
          />
        </Field>
        <Field label="Nom contact secondaire">
          <input
            className={input}
            value={form.secondary_contact_name ?? ''}
            onChange={(e) => set('secondary_contact_name', e.target.value || null)}
          />
        </Field>
        <Field label="Email contact secondaire">
          <input
            type="email"
            className={input}
            value={form.secondary_contact_email ?? ''}
            onChange={(e) => set('secondary_contact_email', e.target.value || null)}
          />
        </Field>
        <Field label="Notes contact" span={3}>
          <textarea
            className={textarea}
            rows={2}
            value={form.notes_contact ?? ''}
            onChange={(e) => set('notes_contact', e.target.value || null)}
          />
        </Field>
      </Section>

      {/* ── Suivi administratif ── */}
      <Section title="Suivi administratif">
        <Field label="Statut">
          <select className={select} value={form.status ?? 'prospect'} onChange={(e) => set('status', e.target.value as ExhibitorStatus)}>
            <option value="prospect">Prospect</option>
            <option value="contacted">Contacté</option>
            <option value="confirmed">Confirmé</option>
            <option value="invoiced">Facturé</option>
            <option value="paid">Payé</option>
            <option value="assets_pending">Actifs manquants</option>
            <option value="ready_to_publish">Prêt à publier</option>
            <option value="published">Publié</option>
            <option value="cancelled">Annulé</option>
          </select>
        </Field>
        <Field label="Statut paiement">
          <select className={select} value={form.payment_status ?? 'unpaid'} onChange={(e) => set('payment_status', e.target.value as PaymentStatus)}>
            <option value="unpaid">Non payé</option>
            <option value="pending">En attente</option>
            <option value="paid">Payé</option>
            <option value="cancelled">Annulé</option>
          </select>
        </Field>
        <Field label="Date de communication">
          <input type="date" className={input} value={form.communication_date ?? ''} onChange={(e) => set('communication_date', e.target.value || null)} />
        </Field>
        <Field label="Date envoi facture">
          <input type="date" className={input} value={form.invoice_sent_date ?? ''} onChange={(e) => set('invoice_sent_date', e.target.value || null)} />
        </Field>
        <Field label="Date paiement reçu">
          <input type="date" className={input} value={form.payment_received_date ?? ''} onChange={(e) => set('payment_received_date', e.target.value || null)} />
        </Field>
        <Field label="Date de relance">
          <input type="date" className={input} value={form.follow_up_date ?? ''} onChange={(e) => set('follow_up_date', e.target.value || null)} />
        </Field>
        <Field label="URL contrat">
          <input type="url" className={input} placeholder="https://..." value={form.contract_url ?? ''} onChange={(e) => set('contract_url', e.target.value || null)} />
        </Field>
        <Field label="URL facture">
          <input type="url" className={input} placeholder="https://..." value={form.invoice_url ?? ''} onChange={(e) => set('invoice_url', e.target.value || null)} />
        </Field>
        <Field label="Notes internes" span={3}>
          <textarea className={textarea} rows={3} value={form.internal_notes ?? ''} onChange={(e) => set('internal_notes', e.target.value || null)} />
        </Field>
      </Section>

      {/* ── Kiosque ── */}
      <Section title="Kiosque">
        <Field label="Numéro de kiosque">
          <input className={input} placeholder="ex. A-01" value={form.booth_number ?? ''} onChange={(e) => set('booth_number', e.target.value || null)} />
        </Field>
        <Field label="Taille du kiosque">
          <select className={select} value={form.booth_size ?? 'standard'} onChange={(e) => set('booth_size', e.target.value as BoothSize)}>
            <option value="standard">Standard</option>
            <option value="double">Double</option>
            <option value="corner">Coin</option>
            <option value="island">Îlot</option>
          </select>
        </Field>
        <Field label="Statut du kiosque">
          <select className={select} value={form.booth_status ?? 'not_required'} onChange={(e) => set('booth_status', e.target.value as BoothStatus)}>
            <option value="not_required">Non requis</option>
            <option value="to_assign">À attribuer</option>
            <option value="assigned">Attribué</option>
            <option value="confirmed">Confirmé</option>
          </select>
        </Field>
        <Field label="Zone">
          <input className={input} placeholder="ex. Zone A – Entrée principale" value={form.booth_zone ?? ''} onChange={(e) => set('booth_zone', e.target.value || null)} />
        </Field>
        <Field label="Date installation">
          <input type="date" className={input} value={form.setup_date ?? ''} onChange={(e) => set('setup_date', e.target.value || null)} />
        </Field>
        <Field label="Date démontage">
          <input type="date" className={input} value={form.teardown_date ?? ''} onChange={(e) => set('teardown_date', e.target.value || null)} />
        </Field>
        <Field label="Code promo">
          <input className={input} value={form.promo_code ?? ''} onChange={(e) => set('promo_code', e.target.value || null)} />
        </Field>
      </Section>

      {/* ── Actifs / Livrables ── */}
      <Section title="Actifs &amp; Livrables">
        {([
          ['logo_received', 'Logo reçu'],
          ['logo_validated', 'Logo validé'],
          ['company_name_confirmed', 'Nom confirmé'],
          ['description_received', 'Description reçue'],
          ['materials_received', 'Matériel promotionnel reçu'],
        ] as [keyof Exhibitor, string][]).map(([key, label]) => (
          <Field key={key} label={label}>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(form[key] as boolean) ?? false}
                onChange={(e) => set(key, e.target.checked as Exhibitor[typeof key])}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-300">{label}</span>
            </label>
          </Field>
        ))}
      </Section>

      {/* ── Responsables internes ── */}
      <Section title="Responsables internes">
        <Field label="Nom responsable interne">
          <input className={input} value={form.internal_owner_name ?? ''} onChange={(e) => set('internal_owner_name', e.target.value || null)} />
        </Field>
        <Field label="Email responsable interne">
          <input type="email" className={input} value={form.internal_owner_email ?? ''} onChange={(e) => set('internal_owner_email', e.target.value || null)} />
        </Field>
        <Field label="Responsable comité">
          <input className={input} value={form.committee_owner ?? ''} onChange={(e) => set('committee_owner', e.target.value || null)} />
        </Field>
      </Section>

      {/* Actions */}
      {error && (
        <div className="mb-4 bg-red-900/50 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          {saving ? 'Enregistrement...' : exhibitor ? 'Enregistrer les modifications' : 'Créer l\'exposant'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/exhibitors')}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
