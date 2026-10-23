'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Container from '@/components/ui/Container';

// Page 404 du site public : adresse inconnue sous /fr ou /en (voir [...rest]),
// ou contenu introuvable (actualité, fiche...).
export default function PageIntrouvable() {
  const { locale } = useParams<{ locale: string }>();
  const fr = locale !== 'en';
  const base = fr ? '/fr' : '/en';

  const liens = [
    { href: `${base}/billetterie`, libelle: fr ? 'Billetterie' : 'Tickets' },
    { href: `${base}/devenir-partenaire`, libelle: fr ? 'Devenir partenaire' : 'Become a partner' },
    { href: `${base}/infos`, libelle: fr ? 'Infos pratiques' : 'Practical info' },
  ];

  return (
    <div className="min-h-screen bg-geo-cream pt-20">
      <div className="page-header-2027 py-20 sm:py-28">
        <Container className="text-center">
          <p className="font-display text-7xl font-bold leading-none text-geo-ink sm:text-8xl">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-geo-ink sm:text-4xl">
            {fr ? 'Page introuvable' : 'Page not found'}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-geo-ink">
            {fr
              ? 'Cette coordonnée n\'existe pas sur notre carte : la page a peut-être été déplacée, ou elle n\'est pas encore publiée.'
              : 'This coordinate doesn\'t exist on our map: the page may have moved, or it isn\'t published yet.'}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href={base}
              className="rounded-xl bg-geo-ink px-6 py-3 text-sm font-bold text-geo-cream transition-opacity hover:opacity-90"
            >
              {fr ? 'Retour à l\'accueil' : 'Back to home'}
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-12 text-center">
        <p className="text-sm text-geo-ink-soft">{fr ? 'Vous cherchiez peut-être :' : 'You may be looking for:'}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-3">
          {liens.map((lien) => (
            <li key={lien.href}>
              <Link
                href={lien.href}
                className="inline-block rounded-xl border border-geo-ink/15 px-5 py-2.5 text-sm font-semibold text-geo-ink transition-colors hover:bg-geo-ink/5"
              >
                {lien.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
