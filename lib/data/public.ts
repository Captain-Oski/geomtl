import { createClient } from '@supabase/supabase-js'
import { MOCK_PARTNERS, MOCK_EXHIBITORS, MOCK_ACTIVATIONS } from './mock'
import type { Partner, Exhibitor, Activation } from '@/lib/supabase/types'

function isSupabaseConfigured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

function getPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function getPublicPartners(): Promise<Partner[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PARTNERS.filter(
      (p) => p.public_visibility && p.status === 'confirmed' && p.logo_validated
    )
  }

  const supabase = getPublicClient()
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('public_visibility', true)
    .eq('status', 'confirmed')
    .eq('logo_validated', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[getPublicPartners]', error.message)
    return []
  }

  return (data ?? []) as Partner[]
}

export async function getPublicExhibitors(): Promise<Exhibitor[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_EXHIBITORS.filter(
      (e) => e.public_visibility && e.status === 'confirmed' && e.logo_validated
    )
  }

  const supabase = getPublicClient()
  const { data, error } = await supabase
    .from('exhibitors')
    .select('*')
    .eq('public_visibility', true)
    .eq('status', 'confirmed')
    .eq('logo_validated', true)
    .order('booth_number', { ascending: true })

  if (error) {
    console.error('[getPublicExhibitors]', error.message)
    return []
  }

  return (data ?? []) as Exhibitor[]
}

export async function getPublicActivations(): Promise<Activation[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_ACTIVATIONS.filter(
      (a) => a.public_visibility && ['active', 'completed'].includes(a.status)
    )
  }

  const supabase = getPublicClient()
  const { data, error } = await supabase
    .from('activations')
    .select('*')
    .eq('public_visibility', true)
    .in('status', ['active', 'completed'])
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[getPublicActivations]', error.message)
    return []
  }

  return (data ?? []) as Activation[]
}
