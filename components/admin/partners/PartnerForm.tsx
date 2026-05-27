'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { savePartner } from '@/lib/actions/partners'
import type {
  Partner, PartnerType, PartnerStatus, PaymentStatus, BoothStatus,
} from '@/lib/supabase/types'

// ─── Default values ────────────────────────────────────────

const DEFAULTS: Partial<Partner> = {
  partner_type: 'Gold',
  status: 'prospect',
  year: 2027,
  payment_status: 'unpaid',
  booth_status: 'not_required',
  public_visibility: false,
  display_order: 10,
  featured: false,
  logo_received: false,
  company_name_confirmed: false,
  description_received: false,
}

// ─── Option lists ──────────────────────────────────────────

const TYPES: { value: PartnerType; label: string }[] = [
  { value: 'Platinum', label: 'Platine' },
  { value: 'Gold',     label: 'Or' },
  { value: 'Silver',   label: 'Argent' },
  { value: 'Bronze',   label: 'Bronze' },
  { value: 'Exhibitor',label: 'Exposant' },
  { value: 'Other',    label: 'Autre' },
]

const STATUSES: { value: PartnerStatus; label: string }[] = [
  { value: 'prospect',         label: 'Prospect' },
  { value: 'contacted',        label: 'Contacté' },
  { value: 'confirmed',        label: 'Confirmé' },
  { value: 'invoiced',         label: 'Facturé' },
  { value: 'paid',             label: 'Payé' },
  { value: 'assets_pending',   label: 'Actifs manquants' },
  { value: 'ready_to_publish', label: 'Prêt à publier' },
  { value: 'published',        label: 'Publié' },
  { value: 'cancelled',        label: 'Annulé' },
]

const PAYMENT_STATUSES: { value: PaymentStatus; label: string }[] = [
  { value: 'unpaid',   label: 'Impayé' },
  { value: 'pending',  label: 'En cours' },
  { value: 'paid',     label: 'Payé' },
  { value: 'cancelled',label: 'Annulé' },
]

const BOOTH_STATUSES: { value: BoothStatus; label: string }[] = [
  { value: 'not_required', label: 'Non requis' },
  { value: 'to_assign',    label: 'À attribuer' },
  { value: 'assigned',     label: 'Attribué' },
  { value: 'confirmed',    label: 'Confirmé' },
]

// ─── Style helpers ─────────────────────────────────────────

const inputClass =
  'w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-rose-500'

const labelClass = 'block text-xs font-medium text-gray-400 mb-1'

// ─── Sub-components ────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-white mb-4 pb-3 border-b border-gray-800">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
}

// ─── Main form ─────────────────────────────────────────────

export function PartnerForm({ partner }: { partner?: Partner }) {
  const router = useRouter()
  const [form, setForm] = useState<Partial<Partner>>(partner ?? DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function set<K extends keyof Partner>(key: K, value: Partner[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const txt = (key: keyof Partner) => (
    <input
      type="text"
      value={String(form[key] ?? '')}
      onChange={(e) => set(key, e.target.value as Partner[typeof key])}
      className={inputClass}
    />
  )

  const date = (key: keyof Partner) => (
    <input
      type="date"
      value={String(form[key] ?? '')}
      onChange={(e) => set(key, e.target.value as Partner[typeof key])}
      className={inputClass}
    />
  )

  const textarea = (key: keyof Partner, rows = 3) => (
    <textarea
      rows={rows}
      value={String(form[key] ?? '')}
      onChange={(e) => set(key, e.target.value as Partner[typeof key])}
      className={inputClass}
    />
  )

  const checkbox = (key: keyof Partner, label: string) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={Boolean(form[key])}
        onChange={(e) => set(key, e.target.checked as Partner[typeof key])}
        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-rose-500 focus:ring-rose-500"
      />
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  )

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const result = await savePartner(form, partner?.id)

    if (result.error) {
      setError(result.error)
      setSaving(false)
      return
    }

    router.push('/admin/partners')
    router.refresh()
  }

  // Completeness indicator
  const completenessChecks = [
    !!form.company_name,
    !!form.partner_type,
    !!form.primary_contact_email,
    !!form.website_url,
    form.status !== 'prospect',
    form.payment_status === 'paid',
    !!form.logo_received,
    !!form.description_fr,
  ]
  const completeness = Math.round(
    (completenessChecks.filter(Boolean).length / completenessChecks.length) * 100
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      {/* Completeness bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-3 flex items-center gap-4">
        <span className="text-xs text-gray-400">Complétude</span>
        <div className="flex-1 bg-gray-800 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all ${
              completeness >= 80 ? 'bg-emerald-500' : completeness >= 50 ? 'bg-amber-400' : 'bg-rose-500'
            }`}
            style={{ width: `${completeness}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-300 w-8 text-right">{completeness}%</span>
        {form.status === 'ready_to_publish' && !form.public_visibility && (
          <span className="text-xs text-violet-400 ml-2">Prêt — activer la visibilité publique</span>
        )}
      </div>

      {/* ① Identité */}
      <Section title="① Identité">
        <Grid>
          <div className="lg:col-span-2">
            <label className={labelClass}>Nom de la compagnie *</label>
            <input
              type="text"
              required
              value={String(form.company_name ?? '')}
              onChange={(e) => set('company_name', e.target.value)}
              className={inputClass}
              placeholder="Nom légal de l'entreprise"
            />
          </div>
          <div>
            <label className={labelClass}>Nom public</label>
            <input
              type="text"
              value={String(form.public_name ?? '')}
              onChange={(e) => set('public_name', e.target.value)}
              className={inputClass}
              placeholder="Affiché sur le site"
            />
          </div>
        </Grid>
        <Grid>
          <div>
            <label className={labelClass}>Type *</label>
            <select
              required
              value={form.partner_type ?? ''}
              onChange={(e) => set('partner_type', e.target.value as PartnerType)}
              className={inputClass}
            >
              {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Statut</label>
            <select
              value={form.status ?? 'prospect'}
              onChange={(e) => set('status', e.target.value as PartnerStatus)}
              className={inputClass}
            >
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Année *</label>
            <input
              type="number"
              required
              value={form.year ?? 2027}
              onChange={(e) => set('year', parseInt(e.target.value))}
              className={inputClass}
              min={2025}
              max={2035}
            />
          </div>
        </Grid>
        <div className="flex gap-6">
          {checkbox('featured', 'Mis en avant (featured)')}
        </div>
      </Section>

      {/* ② Visibilité publique */}
      <Section title="② Visibilité publique">
        <Grid>
          <div>
            <label className={labelClass}>Site web</label>
            <input
              type="url"
              value={String(form.website_url ?? '')}
              onChange={(e) => set('website_url', e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={labelClass}>URL du logo</label>
            <input
              type="url"
              value={String(form.logo_url ?? '')}
              onChange={(e) => set('logo_url', e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={labelClass}>Texte alternatif du logo</label>
            {txt('logo_alt_text')}
          </div>
        </Grid>
        <div>
          <label className={labelClass}>Description (français)</label>
          {textarea('description_fr')}
        </div>
        <div>
          <label className={labelClass}>Description (anglais)</label>
          {textarea('description_en')}
        </div>
        <Grid>
          <div>
            <label className={labelClass}>Ordre d&apos;affichage</label>
            <input
              type="number"
              value={form.display_order ?? 10}
              onChange={(e) => set('display_order', parseInt(e.target.value))}
              className={inputClass}
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(form.public_visibility)}
                onChange={(e) => set('public_visibility', e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-rose-500 focus:ring-rose-500"
              />
              <span className="text-sm text-gray-300">Visible sur le site public</span>
            </label>
          </div>
        </Grid>
      </Section>

      {/* ③ Contact */}
      <Section title="③ Contact">
        <Grid>
          <div>
            <label className={labelClass}>Nom du contact principal</label>
            {txt('primary_contact_name')}
          </div>
          <div>
            <label className={labelClass}>Email principal</label>
            <input
              type="email"
              value={String(form.primary_contact_email ?? '')}
              onChange={(e) => set('primary_contact_email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Téléphone principal</label>
            {txt('primary_contact_phone')}
          </div>
        </Grid>
        <Grid>
          <div>
            <label className={labelClass}>Nom du contact secondaire</label>
            {txt('secondary_contact_name')}
          </div>
          <div>
            <label className={labelClass}>Email secondaire</label>
            <input
              type="email"
              value={String(form.secondary_contact_email ?? '')}
              onChange={(e) => set('secondary_contact_email', e.target.value)}
              className={inputClass}
            />
          </div>
        </Grid>
        <div>
          <label className={labelClass}>Notes de contact</label>
          {textarea('notes_contact', 2)}
        </div>
      </Section>

      {/* ④ Administratif */}
      <Section title="④ Suivi administratif">
        <Grid>
          <div>
            <label className={labelClass}>Statut de paiement</label>
            <select
              value={form.payment_status ?? 'unpaid'}
              onChange={(e) => set('payment_status', e.target.value as PaymentStatus)}
              className={inputClass}
            >
              {PAYMENT_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Date de communication initiale</label>
            {date('communication_date')}
          </div>
          <div>
            <label className={labelClass}>Date d&apos;envoi de la facture</label>
            {date('invoice_sent_date')}
          </div>
          <div>
            <label className={labelClass}>Date de réception du paiement</label>
            {date('payment_received_date')}
          </div>
          <div>
            <label className={labelClass}>Date de demande d&apos;informations</label>
            {date('information_requested_date')}
          </div>
          <div>
            <label className={labelClass}>Date de relance prévue</label>
            {date('follow_up_date')}
          </div>
        </Grid>
        <Grid>
          <div>
            <label className={labelClass}>URL du contrat</label>
            <input type="url" value={String(form.contract_url ?? '')} onChange={(e) => set('contract_url', e.target.value)} className={inputClass} placeholder="https://..." />
          </div>
          <div>
            <label className={labelClass}>URL de la facture</label>
            <input type="url" value={String(form.invoice_url ?? '')} onChange={(e) => set('invoice_url', e.target.value)} className={inputClass} placeholder="https://..." />
          </div>
        </Grid>
        <div>
          <label className={labelClass}>Notes internes</label>
          {textarea('internal_notes', 3)}
        </div>
      </Section>

      {/* ⑤ Activation / Kiosque */}
      <Section title="⑤ Activation &amp; Kiosque">
        <Grid>
          <div>
            <label className={labelClass}>Statut du kiosque</label>
            <select
              value={form.booth_status ?? 'not_required'}
              onChange={(e) => set('booth_status', e.target.value as BoothStatus)}
              className={inputClass}
            >
              {BOOTH_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Numéro de kiosque</label>
            <input
              type="text"
              value={String(form.booth_number ?? '')}
              onChange={(e) => set('booth_number', e.target.value)}
              className={inputClass}
              placeholder="Ex : A-01"
            />
          </div>
          <div>
            <label className={labelClass}>Code promotionnel</label>
            <input
              type="text"
              value={String(form.promo_code ?? '')}
              onChange={(e) => set('promo_code', e.target.value.toUpperCase())}
              className={`${inputClass} font-mono`}
              placeholder="PARTENAIRE2027"
            />
          </div>
        </Grid>
        <Grid>
          <div>
            <label className={labelClass}>Type d&apos;activation</label>
            {txt('activation_type')}
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description de l&apos;activation</label>
            {textarea('activation_description', 2)}
          </div>
        </Grid>
        <Grid>
          <div>
            <label className={labelClass}>Livrables attendus</label>
            {textarea('deliverables', 2)}
          </div>
          <div>
            <label className={labelClass}>Échéances</label>
            {textarea('deadlines', 2)}
          </div>
        </Grid>
        <div className="flex flex-wrap gap-6">
          {checkbox('logo_received', 'Logo reçu')}
          {checkbox('company_name_confirmed', 'Nom de compagnie confirmé')}
          {checkbox('description_received', 'Description reçue')}
        </div>
      </Section>

      {/* ⑥ Responsables */}
      <Section title="⑥ Responsables internes">
        <Grid>
          <div>
            <label className={labelClass}>Responsable interne</label>
            {txt('internal_owner_name')}
          </div>
          <div>
            <label className={labelClass}>Email du responsable</label>
            <input
              type="email"
              value={String(form.internal_owner_email ?? '')}
              onChange={(e) => set('internal_owner_email', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Comité responsable</label>
            {txt('committee_owner')}
          </div>
        </Grid>
      </Section>

      {/* Error + actions */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-colors"
        >
          {saving ? 'Enregistrement…' : partner ? 'Enregistrer les modifications' : 'Créer le partenaire'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}
