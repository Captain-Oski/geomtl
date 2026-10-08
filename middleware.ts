import { type NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import { COOKIE_COMITE, accesComiteValide, siteEnConstruction } from '@/lib/acces-comite'

const intlMiddleware = createIntlMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
})

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Routes admin : vérification de session obligatoire
  if (pathname.startsWith('/admin')) {
    // Mode dev sans Supabase : accès libre
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.next()
    }

    let response = NextResponse.next({ request })

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return response
  }

  // Page login, callback OAuth et page de construction : pas de middleware i18n
  if (pathname === '/login' || pathname.startsWith('/auth/') || pathname === '/construction') {
    return NextResponse.next()
  }

  // Site en construction : le public voit /construction, le comité (cookie) voit le site
  if (siteEnConstruction()) {
    const comite = await accesComiteValide(request.cookies.get(COOKIE_COMITE)?.value)
    let response: NextResponse
    if (comite) {
      response = intlMiddleware(request)
    } else {
      const url = request.nextUrl.clone()
      url.pathname = '/construction'
      response = NextResponse.rewrite(url)
    }
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // Toutes les autres routes : middleware i18n next-intl
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
