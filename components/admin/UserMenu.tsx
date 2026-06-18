'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

const ROLE_LABELS: Record<string, string> = {
  admin: 'Administrateur',
  editor: 'Éditeur',
  viewer: 'Lecteur',
}

function getInitials(name: string | null, email: string): string {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return email[0].toUpperCase()
}

export function UserMenu({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    // Mode dev sans Supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      router.push('/login')
      return
    }
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const initials = getInitials(profile.full_name, profile.email)
  const roleLabel = ROLE_LABELS[profile.role ?? 'viewer'] ?? 'Lecteur'

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 rounded-lg p-2 hover:bg-gray-800 transition-colors text-left"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-white truncate">
            {profile.full_name ?? profile.email}
          </div>
          <div className="text-xs text-gray-500">{roleLabel}</div>
        </div>
        <svg
          className={`w-3.5 h-3.5 text-gray-600 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-gray-700 rounded-xl py-1 shadow-xl z-50">
            <div className="px-3 py-2 border-b border-gray-700 mb-1">
              <div className="text-xs text-gray-400 truncate">{profile.email}</div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/60 transition-colors rounded-lg disabled:opacity-50"
            >
              {loading ? 'Déconnexion…' : 'Se déconnecter'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
