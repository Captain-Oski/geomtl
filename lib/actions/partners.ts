'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Partner, PartnerStatus, PaymentStatus } from '@/lib/supabase/types'

const MOCK_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL

// ─── CRUD ─────────────────────────────────────────────────

export async function savePartner(
  data: Partial<Partner>,
  id?: string
): Promise<{ error?: string; id?: string }> {
  if (MOCK_MODE) {
    return { error: 'Supabase non configuré — configurez .env.local pour sauvegarder les données.' }
  }

  if (!data.company_name?.trim()) return { error: 'Le nom de la compagnie est obligatoire.' }
  if (!data.partner_type) return { error: 'Le type de partenaire est obligatoire.' }
  if (!data.year) return { error: "L'année est obligatoire." }
  if (data.primary_contact_email && !isValidEmail(data.primary_contact_email)) {
    return { error: 'Adresse email du contact principal invalide.' }
  }
  if (data.website_url && !isValidUrl(data.website_url)) {
    return { error: 'URL du site web invalide (inclure https://).' }
  }

  const supabase = await createClient()
  const now = new Date().toISOString()

  if (id) {
    const { error } = await supabase
      .from('partners')
      .update({ ...data, updated_at: now })
      .eq('id', id)

    if (error) return { error: error.message }
    revalidatePath('/admin/partners')
    return { id }
  } else {
    const { data: created, error } = await supabase
      .from('partners')
      .insert({ ...data, created_at: now, updated_at: now })
      .select('id')
      .single()

    if (error) return { error: error.message }
    revalidatePath('/admin/partners')
    return { id: created.id }
  }
}

export async function deletePartner(id: string): Promise<{ error?: string }> {
  if (MOCK_MODE) return { error: 'Supabase non configuré.' }

  const supabase = await createClient()
  const { error } = await supabase.from('partners').delete().eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/partners')
  return {}
}

export async function archivePartner(id: string): Promise<{ error?: string }> {
  if (MOCK_MODE) return { error: 'Supabase non configuré.' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('partners')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/partners')
  return {}
}

// ─── Quick actions ─────────────────────────────────────────

export async function togglePartnerVisibility(
  id: string,
  visible: boolean
): Promise<{ error?: string }> {
  if (MOCK_MODE) return { error: 'Supabase non configuré.' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('partners')
    .update({ public_visibility: visible, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/partners')
  return {}
}

export async function updatePartnerStatus(
  id: string,
  status: PartnerStatus
): Promise<{ error?: string }> {
  if (MOCK_MODE) return { error: 'Supabase non configuré.' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('partners')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/partners')
  return {}
}

export async function updatePaymentStatus(
  id: string,
  payment_status: PaymentStatus
): Promise<{ error?: string }> {
  if (MOCK_MODE) return { error: 'Supabase non configuré.' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('partners')
    .update({ payment_status, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/partners')
  return {}
}

export async function markLogoReceived(
  id: string,
  received: boolean
): Promise<{ error?: string }> {
  if (MOCK_MODE) return { error: 'Supabase non configuré.' }

  const supabase = await createClient()
  const { error } = await supabase
    .from('partners')
    .update({ logo_received: received, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/partners')
  return {}
}

// ─── Validation helpers ────────────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
