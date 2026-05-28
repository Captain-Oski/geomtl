'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Profile, Role } from '@/lib/supabase/types'
import { UserMenu } from './UserMenu'

type NavItem = {
  href: string
  label: string
  roles: Role[]
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin',              label: 'Tableau de bord', roles: ['admin', 'editor', 'viewer'] },
  { href: '/admin/partners',     label: 'Partenaires',     roles: ['admin', 'editor', 'viewer'] },
  { href: '/admin/exhibitors',   label: 'Exposants',       roles: ['admin', 'editor', 'viewer'] },
  { href: '/admin/contacts',     label: 'Contacts',        roles: ['admin', 'editor'] },
  { href: '/admin/activations',  label: 'Activations',     roles: ['admin', 'editor', 'viewer'] },
  { href: '/admin/deliverables', label: 'Livrables',       roles: ['admin', 'editor', 'viewer'] },
  { href: '/admin/contracts',    label: 'Contrats',        roles: ['admin'] },
  { href: '/admin/users',        label: 'Utilisateurs',    roles: ['admin'] },
]

export function AdminLayout({
  profile,
  children,
}: {
  profile: Profile
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const role = profile.role ?? 'viewer'
  const visibleNav = NAV_ITEMS.filter((item) => item.roles.includes(role))

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="px-5 py-4 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-rose-500 font-bold text-lg tracking-tight">GeoMTL</span>
            <span className="text-gray-600 text-xs font-medium uppercase tracking-wider">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {visibleNav.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-rose-500/15 text-rose-400 font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-gray-800">
          <UserMenu profile={profile} />
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
