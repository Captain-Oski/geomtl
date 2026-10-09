import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { AdminLayout } from '@/components/admin/AdminLayout'
import type { Profile } from '@/lib/supabase/types'
import '@/styles/globals.css'

export const metadata = {
  title: 'Admin — GÉOMTL 2027',
  robots: 'noindex, nofollow',
}

const MOCK_PROFILE: Profile = {
  id: 'mock-id',
  email: 'info@geomtl.com',
  full_name: 'Admin GÉOMTL',
  role: 'admin',
  created_at: new Date().toISOString(),
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mode dev sans Supabase : profil mock, accès libre
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <html lang="fr">
        <body className="bg-gray-950">
          <AdminLayout profile={MOCK_PROFILE}>{children}</AdminLayout>
        </body>
      </html>
    )
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Utilise le client service role pour bypasser RLS et les problèmes de schéma.
  // Sécuritaire : server component uniquement, clé jamais exposée au client.
  const adminClient = createAdminClient()
  const { data: profile, error: profileError } = await adminClient
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  if (profileError) {
    console.error('[admin/layout] profile fetch error:', profileError.message)
  }

  // Profil sans rôle attribué = non autorisé
  if (!profile || !profile.role) {
    redirect('/login?error=unauthorized')
  }

  return (
    <html lang="fr">
      <body className="bg-gray-950">
        <AdminLayout profile={profile as Profile}>{children}</AdminLayout>
      </body>
    </html>
  )
}
