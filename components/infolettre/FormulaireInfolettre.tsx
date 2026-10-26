'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr/CheckCircle';

const champ = 'w-full rounded-xl border border-geo-ink/15 bg-white/70 px-3 py-2.5 text-sm text-geo-ink placeholder:text-geo-ink-soft/60 focus:border-geo-teal-dark focus:outline-none dark:bg-geo-cream-dark';
const etiquette = 'mb-1 block text-sm font-medium text-geo-ink';

// Le formulaire est envoyé directement à Mailchimp, dans un nouvel onglet :
// Mailchimp y affiche la suite (confirmation ou erreur) et le visiteur reste sur le site.
export default function FormulaireInfolettre({
  locale,
  action,
  piege,
}: {
  locale: string;
  action: string;
  piege: string;
}) {
  const fr = locale === 'fr';
  const [envoye, setEnvoye] = useState(false);

  return (
    <>
      {envoye && (
        <div role="status" className="mb-6 flex gap-3 rounded-xl border border-geo-teal-dark/30 bg-white/70 p-4 text-left dark:bg-geo-cream-dark">
          <CheckCircle size={24} weight="light" className="flex-shrink-0 text-geo-teal-dark" aria-hidden="true" />
          <div className="text-sm text-geo-ink">
            <p className="font-semibold">{fr ? 'Merci!' : 'Thank you!'}</p>
            <p className="mt-1 text-geo-ink-soft">
              {fr
                ? 'La suite de votre inscription s\'affiche dans un nouvel onglet. Si vous recevez un courriel de confirmation, cliquez sur son lien pour la terminer.'
                : 'Your subscription continues in a new tab. If you receive a confirmation email, click its link to complete it.'}
            </p>
          </div>
        </div>
      )}

      {/* Le formulaire reste dans la page : le retirer pendant l'envoi l'annulerait */}
      <form
        action={action}
        method="post"
        target="_blank"
        onSubmit={() => setTimeout(() => setEnvoye(true), 100)}
        className="space-y-4 text-left"
      >
        <div>
          <label htmlFor="infolettre-courriel" className={etiquette}>
            {fr ? 'Courriel' : 'Email'} <span aria-hidden="true">*</span>
          </label>
          <input id="infolettre-courriel" name="EMAIL" type="email" required autoComplete="email" maxLength={254} className={champ} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="infolettre-prenom" className={etiquette}>{fr ? 'Prénom' : 'First name'}</label>
            <input id="infolettre-prenom" name="FNAME" type="text" autoComplete="given-name" maxLength={100} className={champ} />
          </div>
          <div>
            <label htmlFor="infolettre-nom" className={etiquette}>{fr ? 'Nom' : 'Last name'}</label>
            <input id="infolettre-nom" name="LNAME" type="text" autoComplete="family-name" maxLength={100} className={champ} />
          </div>
        </div>

        {/* Champ piège de Mailchimp, invisible pour les visiteurs */}
        <div aria-hidden="true" className="absolute -left-[5000px]">
          <input type="text" name={piege} tabIndex={-1} defaultValue="" autoComplete="off" />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-geo-ink px-6 py-3 font-semibold text-geo-cream transition-colors hover:bg-geo-ink/85"
        >
          <PaperPlaneTilt size={18} weight="light" aria-hidden="true" />
          {fr ? 'Je m\'abonne' : 'Subscribe'}
        </button>

        <p className="text-xs leading-relaxed text-geo-ink-soft">
          {fr ? (
            <>
              En vous abonnant, vous acceptez de recevoir l&apos;infolettre de GÉOMTL par courriel. Vous pourrez
              vous désabonner en tout temps grâce au lien présent dans chaque envoi. L&apos;infolettre est gérée
              avec Mailchimp, qui conserve votre adresse aux États-Unis. Voir notre{' '}
              <Link href={`/${locale}/confidentialite`} className="font-semibold text-geo-teal-dark hover:underline">
                politique de confidentialité
              </Link>.
            </>
          ) : (
            <>
              By subscribing, you agree to receive the GÉOMTL newsletter by email. You can unsubscribe at any
              time using the link in every issue. The newsletter is managed with Mailchimp, which stores your
              address in the United States. See our{' '}
              <Link href={`/${locale}/confidentialite`} className="font-semibold text-geo-teal-dark hover:underline">
                privacy policy
              </Link>.
            </>
          )}
        </p>
      </form>
    </>
  );
}
