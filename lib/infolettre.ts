import { EVENT_CONFIG } from '@/data/config';

// Formulaire Mailchimp de la page /infolettre. L'adresse vient du code du
// formulaire intégré (Forms > Embedded form dans Mailchimp, attribut
// action du <form>). Seule une adresse https de list-manage.com est acceptée :
// sinon, les boutons reviennent au courriel prérempli.
export function formulaireMailchimp(): { action: string; piege: string } | null {
  const valeur = EVENT_CONFIG.mailchimpAction;
  if (!valeur) return null;
  try {
    // Copiée depuis le code HTML, l'adresse contient souvent &amp;
    const url = new URL(valeur.trim().replace(/&amp;/g, '&'));
    const u = url.searchParams.get('u');
    const id = url.searchParams.get('id');
    if (url.protocol !== 'https:' || !url.hostname.endsWith('.list-manage.com') || !u || !id) return null;
    // L'adresse du formulaire hébergé (/subscribe) reçoit aussi les envois sur /subscribe/post
    if (url.pathname === '/subscribe') url.pathname = '/subscribe/post';
    // Champ piège de Mailchimp : un robot qui le remplit est ignoré
    return { action: url.toString(), piege: `b_${u}_${id}` };
  } catch {
    return null;
  }
}

// Courriel prérempli, tant que le formulaire n'est pas configuré
export function courrielInfolettre(fr: boolean): string {
  return `mailto:${EVENT_CONFIG.courriels.info}?subject=${encodeURIComponent(
    fr ? 'Inscription à l\'infolettre GÉOMTL' : 'GÉOMTL newsletter subscription'
  )}&body=${encodeURIComponent(
    fr
      ? 'Bonjour,\n\nJe souhaite recevoir l\'infolettre de GÉOMTL à cette adresse.\n\nMerci!'
      : 'Hello,\n\nI would like to receive the GÉOMTL newsletter at this address.\n\nThank you!'
  )}`;
}

// Destination des liens « S'abonner à l'infolettre »
export function lienInfolettre(locale: string): string {
  return formulaireMailchimp() ? `/${locale}/infolettre` : courrielInfolettre(locale === 'fr');
}
