import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

const locales = ['fr', 'en'] as const;

const messagesByLocale = {
  fr: () => import('./messages/fr.json'),
  en: () => import('./messages/en.json')
} as const;

// next-intl 4 : la langue de la requête arrive par `requestLocale` (le paramètre
// `locale` n'est renseigné que si on la passe explicitement, sinon on retombait sur le français).
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : 'fr';
  return {
    locale,
    messages: (await messagesByLocale[locale]()).default
  };
});
