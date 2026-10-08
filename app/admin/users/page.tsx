import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProfiles, MOCK_PROFILES } from '@/lib/data/users'
import { AdminUsersPage } from '@/components/admin/users/AdminUsersPage'

export const metadata = {
  title: 'Utilisateurs — Admin GÉOMTL',
}

export default async function UsersPage() {
  const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL

  // Mode mock : pas d'auth réelle
  if (isMock) {
    return (
      <AdminUsersPage
        profiles={MOCK_PROFILES}
        currentUserId="u1"
      />
    )
  }

  // Vérification serveur : admin seulement
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/admin')

  const profiles = await getProfiles()

  return <AdminUsersPage profiles={profiles} currentUserId={user.id} />
}
