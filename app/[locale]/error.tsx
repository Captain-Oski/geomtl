'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Container from '@/components/ui/Container';

// Page 500 du site public : une erreur imprévue dans une page.
export default function Erreur({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale } = useParams<{ locale: string }>();
  const fr = locale !== 'en';

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-geo-cream pt-20">
      <div className="page-header-2027 py-20 sm:py-28">
        <Container className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geo-ink">{fr ? 'Erreur 500' : 'Error 500'}</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-geo-ink sm:text-5xl">
            {fr ? 'Une erreur est survenue' : 'Something went wrong'}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-geo-ink">
            {fr
              ? 'Le problème vient de notre côté. Réessayez dans un instant ; s\'il persiste, écrivez-nous à info@geomtl.com.'
              : 'The problem is on our side. Please try again in a moment; if it persists, write to us at info@geomtl.com.'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-geo-ink px-6 py-3 text-sm font-bold text-geo-cream transition-opacity hover:opacity-90"
            >
              {fr ? 'Réessayer' : 'Try again'}
            </button>
            <Link
              href={fr ? '/fr' : '/en'}
              className="rounded-xl border border-geo-ink/30 px-6 py-3 text-sm font-bold text-geo-ink transition-colors hover:bg-geo-ink/5"
            >
              {fr ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
          </div>
          {error.digest && (
            <p className="mt-6 text-xs text-geo-ink/70">
              {fr ? 'Code de l\'erreur : ' : 'Error code: '}
              {error.digest}
            </p>
          )}
        </Container>
      </div>
    </div>
  );
}
