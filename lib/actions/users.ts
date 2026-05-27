'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Role } from '@/lib/supabase/types'

const MOCK_MSG = 'Supabase non configuré — modifications non persistées en mode mock.'

// ─── Vérification que l'appelant est admin ─────────────────
// Chaque action re-vérifie indépendamment — ne pas faire confiance au client.

async function assertAdmin(): Promise<{ error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non authentifié.' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') return { error: 'Accès refusé — rôle admin requis.' }
  return {}
}

// ─── Modifier le rôle d'un utilisateur ────────────────────

export async function updateUserRole(
  targetId: string,
  role: Role | null,
): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()

  // Empêcher de modifier son propre rôle
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.id === targetId) {
    return { error: 'Vous ne pouvez pas modifier votre propre rôle.' }
  }

  const check = await assertAdmin()
  if (check.error) return check

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', targetId)

  if (error) return { error: error.message }

  revalidatePath('/admin/users')
  return {}
}

// ─── Révoquer l'accès (role → null) ───────────────────────

export async function revokeUserAccess(targetId: string): Promise<{ error?: string }> {
  return updateUserRole(targetId, null)
}

// ─── Supprimer définitivement un utilisateur ──────────────
// Nécessite le service role (SUPABASE_SERVICE_ROLE_KEY)

export async function deleteUser(targetId: string): Promise<{ error?: string }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { error: MOCK_MSG }

  const supabase = await createClient()

  // Empêcher de se supprimer soi-même
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.id === targetId) {
    return { error: 'Vous ne pouvez pas supprimer votre propre compte.' }
  }

  const check = await assertAdmin()
  if (check.error) return check

  try {
    const adminClient = createAdminClient()
    const { error } = await adminClient.auth.admin.deleteUser(targetId)
    if (error) return { error: error.message }
  } catch (e) {
    return { error: 'Client admin indisponible — vérifiez SUPABASE_SERVICE_ROLE_KEY.' }
  }

  revalidatePath('/admin/users')
  return {}
}
