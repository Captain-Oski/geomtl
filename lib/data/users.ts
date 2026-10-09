import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/supabase/types'

// ─── Mock data ────────────────────────────────────────────

export const MOCK_PROFILES: Profile[] = [
  {
    id: 'u1',
    email: 'sophie@example.com',
    full_name: 'Sophie Martin',
    role: 'admin',
    created_at: '2025-01-10T09:00:00Z',
  },
  {
    id: 'u2',
    email: 'marc@example.com',
    full_name: 'Marc Bouchard',
    role: 'editor',
    created_at: '2025-01-12T10:30:00Z',
  },
  {
    id: 'u3',
    email: 'julie@example.com',
    full_name: 'Julie Arsenault',
    role: 'viewer',
    created_at: '2025-02-05T14:00:00Z',
  },
  {
    id: 'u4',
    email: 'nouveau@example.com',
    full_name: null,
    role: null,
    created_at: '2025-04-20T16:45:00Z',
  },
]

// ─── Data fetching ────────────────────────────────────────

export async function getProfiles(): Promise<Profile[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_PROFILES
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[getProfiles]', error.message)
    return []
  }

  return (data ?? []) as Profile[]
}
