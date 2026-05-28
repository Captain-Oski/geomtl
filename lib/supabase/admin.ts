import { createClient } from '@supabase/supabase-js'

// Client avec service role — serveur uniquement, jamais exposé côté client.
// Utilisé pour les opérations admin sur auth.users (suppression, liste complète).
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Variables Supabase manquantes pour le client admin.')
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
    db: { schema: 'geomtl2027' },
  })
}
