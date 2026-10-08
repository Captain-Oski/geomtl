import type { Metadata } from 'next';
import GlobeTrame from '@/components/home/GlobeTrame';
import GeoMTLLogo from '@/components/ui/GeoMTLLogo';
import { EVENT_CONFIG } from '@/data/config';

export const metadata: Metadata = {
  title: 'GÉOMTL 2027 — Site en construction',
  robots: { index: false, follow: false },
};

export default function ConstructionPage({ searchParams }: { searchParams: { acces?: string } }) {
  const refuse = searchParams.acces === 'refuse';

  return (
    <main className="relative min-h-svh overflow-hidden bg-geo-cream">
      <GlobeTrame className="absolute inset-x-0 bottom-0 top-56 sm:top-0 w-full h-[calc(100%-14rem)] sm:h-full pointer-events-none select-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 pb-8 min-h-svh flex flex-col">
        <div className="flex items-start justify-between gap-6 font-semibold text-base sm:text-lg leading-snug text-geo-ink">
          <p>
            {EVENT_CONFIG.dates.fr}
            <br />
            {EVENT_CONFIG.venue.fr}
          </p>
          <span className="flex-shrink-0 rounded-md px-3 py-1 font-display text-xl sm:text-2xl lg:text-3xl font-bold bg-geo-ink text-geo-cream">
            2027
          </span>
        </div>

        <div className="mt-auto pt-16">
          <h1 className="sr-only">GÉOMTL 2027 — Site en construction</h1>
          <GeoMTLLogo showYear={false} className="w-full h-auto text-geo-ink" />

          <div className="mt-8 text-center text-geo-ink">
            <p className="font-display text-2xl sm:text-3xl font-bold">Site en construction</p>
            <p className="mt-3 text-lg sm:text-xl font-bold text-geo-ink">
              Le nouveau site de GÉOMTL 2027 sera bientôt en ligne.
              <br />
              <span lang="en">Our new website is under construction. Coming soon.</span>
            </p>
          </div>

          <details open={refuse} className="mx-auto mt-10 max-w-xs text-sm text-geo-ink-soft">
            <summary className="cursor-pointer text-center hover:text-geo-ink">Accès comité</summary>
            <form method="post" action="/api/acces-comite" className="mt-3 flex gap-2">
              <label htmlFor="code" className="sr-only">Code d&apos;accès</label>
              <input
                id="code"
                name="code"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Code d'accès"
                className="min-w-0 flex-1 rounded-lg border border-geo-ink/20 bg-geo-cream px-3 py-2 text-geo-ink placeholder:text-geo-ink-soft focus:border-geo-ink/50 focus:outline-none"
              />
              <button type="submit" className="rounded-lg bg-geo-ink px-4 py-2 font-semibold text-geo-cream hover:bg-geo-ink/85">
                Entrer
              </button>
            </form>
            {refuse && <p role="alert" className="mt-2 text-center text-red-700 dark:text-red-400">Code invalide.</p>}
          </details>
        </div>
      </div>
    </main>
  );
}
