'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: "Accès non autorisé. Votre compte n'a pas encore de rôle attribué — contactez l'administrateur.",
  auth_callback_error: 'Erreur lors de la connexion. Veuillez réessayer.',
  no_profile: 'Profil introuvable. Contactez l\'administrateur.',
}

function ErrorBanner() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  if (!error) return null
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
      {ERROR_MESSAGES[error] ?? 'Une erreur est survenue.'}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
      <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
      <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
      <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" />
      <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" />
    </svg>
  )
}

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabaseConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
      <h1 className="text-white font-semibold text-xl mb-1">Connexion</h1>
      <p className="text-gray-400 text-sm mb-6">
        Accès réservé à l&apos;équipe GeoMTL.
      </p>

      <Suspense fallback={null}>
        <ErrorBanner />
      </Suspense>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {!supabaseConfigured ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 text-yellow-400 text-sm">
          Supabase n&apos;est pas encore configuré. Ajoutez les variables d&apos;environnement dans <code className="font-mono">.env.local</code> pour activer l&apos;authentification.
        </div>
      ) : (
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium rounded-xl px-4 py-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
          {loading ? 'Connexion en cours…' : 'Continuer avec Google'}
        </button>
      )}

      <p className="text-gray-600 text-xs text-center mt-6">
        Accès non autorisé ? Contactez l&apos;administrateur GeoMTL.
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-rose-500 font-bold text-3xl tracking-tight">GeoMTL</span>
          <p className="text-gray-500 mt-2 text-sm">Administration — GeoMTL 2027</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
