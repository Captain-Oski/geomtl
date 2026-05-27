'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Exhibitor, ExhibitorStatus, PaymentStatus } from '@/lib/supabase/types'

const MOCK_MSG = 'Supabase non configuré — modifications non persistées en mode mock.'

export async function saveExhibitor(
  data: Partial<Exhibitor>,
  id?: string,
): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()

  if (id) {
    const { error } = await supabase
      .from('exhibitors')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('exhibitors').insert(data)
    if (error) return { error: error.message }
  }

  revalidatePath('/admin/exhibitors')
  return {}
}

export async function deleteExhibitor(id: string): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()
  const { error } = await supabase.from('exhibitors').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/exhibitors')
  return {}
}

export async function archiveExhibitor(id: string): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()
  const { error } = await supabase
    .from('exhibitors')
    .update({ archived_at: new Date().toISOString() })
    .eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/exhibitors')
  return {}
}

export async function toggleExhibitorVisibility(
  id: string,
  visible: boolean,
): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()
  const { error } = await supabase
    .from('exhibitors')
    .update({ public_visibility: visible })
    .eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/exhibitors')
  return {}
}

export async function updateExhibitorStatus(
  id: string,
  status: ExhibitorStatus,
): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()
  const { error } = await supabase.from('exhibitors').update({ status }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/exhibitors')
  return {}
}

export async function updateExhibitorPaymentStatus(
  id: string,
  payment_status: PaymentStatus,
): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()
  const { error } = await supabase.from('exhibitors').update({ payment_status }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/exhibitors')
  return {}
}

export async function markExhibitorLogoReceived(
  id: string,
  received: boolean,
): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()
  const { error } = await supabase
    .from('exhibitors')
    .update({ logo_received: received })
    .eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/exhibitors')
  return {}
}
