import { createHash } from 'crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { COOKIE_COMITE, accesComiteValide, siteEnConstruction } from '@/lib/acces-comite';
import { DELAI_MINIMUM_MS, LIBELLES_NIVEAUX, SANS_PREFERENCE, validerDemande, type DonneesDemande } from '@/lib/demandes-kiosques';
import { EVENT_CONFIG } from '@/data/config';

// Demandes « Devenir partenaire ou exposant » envoyées depuis le plan des
// kiosques de la page Devenir partenaire. Le public n'écrit jamais directement dans la base :
// cette route valide la demande, applique les protections ci-dessous, puis
// l'enregistre avec la clé service role. Une demande ne change jamais l'état
// public d'un kiosque ; seul le comité le fait, dans /admin/kiosques.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TAILLE_MAX = 10_000; // octets
const LIMITE_PAR_IP_HEURE = 5;
const LIMITE_PAR_COURRIEL_JOUR = 5;

const reponse = (status: number, corps: Record<string, unknown>) => NextResponse.json(corps, { status });

function adresseIp(request: NextRequest) {
  return (request.headers.get('x-forwarded-for')?.split(',')[0] ?? request.headers.get('x-real-ip') ?? '').trim();
}

// Hachage salé : sert à limiter les envois sans conserver l'adresse IP
function empreinte(ip: string) {
  const sel = process.env.DEMANDES_SEL;
  if (!sel) console.warn('[demandes-kiosques] DEMANDES_SEL absent : empreinte IP moins robuste.');
  return createHash('sha256').update(`${sel ?? 'geomtl-demandes'}:${ip}`).digest('hex');
}

export async function POST(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return reponse(503, { erreur: 'service_indisponible' });
  }

  // 1. Site encore caché : seul le comité peut envoyer
  if (siteEnConstruction() && !(await accesComiteValide(request.cookies.get(COOKIE_COMITE)?.value))) {
    return reponse(403, { erreur: 'acces_refuse' });
  }

  // 2. Même origine seulement (protection CSRF)
  const origine = request.headers.get('origin');
  try {
    if (!origine || new URL(origine).host !== request.headers.get('host')) return reponse(403, { erreur: 'origine' });
  } catch {
    return reponse(403, { erreur: 'origine' });
  }

  // 3. Corps JSON de taille raisonnable
  const brut = await request.text();
  if (brut.length > TAILLE_MAX) return reponse(413, { erreur: 'trop_volumineux' });
  let corps: Record<string, unknown>;
  try {
    corps = JSON.parse(brut);
    if (!corps || typeof corps !== 'object' || Array.isArray(corps)) throw new Error();
  } catch {
    return reponse(400, { erreur: 'format' });
  }

  // 4. Anti-robots : champ piège (on répond « reçu » sans rien enregistrer)
  // et délai minimal entre l'ouverture du formulaire et l'envoi
  if (typeof corps.site_web === 'string' && corps.site_web.trim() !== '') return reponse(200, { ok: true });
  if (!(Number(corps.duree_ms) >= DELAI_MINIMUM_MS)) return reponse(400, { erreur: 'trop_rapide' });

  // 5. Validation (la même que dans le formulaire)
  const { donnees, erreurs } = validerDemande(corps);
  if (Object.keys(erreurs).length > 0) return reponse(400, { erreur: 'validation', erreurs });

  const supabase = createAdminClient();
  const ip = empreinte(adresseIp(request));
  const ilYa = (ms: number) => new Date(Date.now() - ms).toISOString();

  // 6. Limite d'envois, par adresse IP et par courriel
  const [parIp, parCourriel] = await Promise.all([
    supabase.from('demandes_kiosques').select('id', { count: 'exact', head: true }).eq('empreinte_ip', ip).gte('created_at', ilYa(3_600_000)),
    supabase.from('demandes_kiosques').select('id', { count: 'exact', head: true }).eq('principal_courriel', donnees.principal_courriel).gte('created_at', ilYa(86_400_000)),
  ]);
  if (parIp.error || parCourriel.error) {
    console.error('[demandes-kiosques] comptage', parIp.error?.message ?? parCourriel.error?.message);
    return reponse(503, { erreur: 'service_indisponible' });
  }
  if ((parIp.count ?? 0) >= LIMITE_PAR_IP_HEURE || (parCourriel.count ?? 0) >= LIMITE_PAR_COURRIEL_JOUR) {
    return reponse(429, { erreur: 'trop_de_demandes' });
  }

  // 7. Kiosque choisi déjà réservé par le comité
  const kiosqueChoisi = donnees.kiosque === SANS_PREFERENCE ? null : donnees.kiosque;
  if (kiosqueChoisi !== null) {
    const { data: kiosque, error: erreurKiosque } = await supabase.from('kiosques').select('statut').eq('numero', kiosqueChoisi).single();
    if (erreurKiosque || !kiosque) {
      console.error('[demandes-kiosques] kiosque', erreurKiosque?.message);
      return reponse(503, { erreur: 'service_indisponible' });
    }
    if (kiosque.statut === 'reserve') return reponse(409, { erreur: 'kiosque_reserve' });
  }

  // 8. Enregistrement
  const { error: erreurInsertion } = await supabase.from('demandes_kiosques').insert({
    kiosque_numero: kiosqueChoisi,
    niveau: donnees.niveau,
    organisation: donnees.organisation,
    principal_nom: donnees.principal_nom,
    principal_courriel: donnees.principal_courriel,
    principal_telephone: donnees.principal_telephone,
    kiosque_nom: donnees.kiosque_nom,
    kiosque_courriel: donnees.kiosque_courriel,
    kiosque_telephone: donnees.kiosque_telephone,
    message: donnees.message || null,
    langue: donnees.langue,
    consentement: donnees.consentement,
    empreinte_ip: ip,
  });
  if (erreurInsertion) {
    console.error('[demandes-kiosques] insertion', erreurInsertion.message);
    return reponse(503, { erreur: 'service_indisponible' });
  }

  // 9. Courriels : un échec est consigné, la demande reste enregistrée
  await envoyerCourriels(donnees, origine);

  return reponse(201, { ok: true });
}

// ─── Courriels (Resend) ───────────────────────────────────
// Texte brut seulement : rien de ce que tape le visiteur n'est interprété.

async function envoyerCourriel(message: { to: string; cc?: string[]; reply_to: string; subject: string; text: string }) {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) return;
  const expediteur = process.env.COURRIEL_EXPEDITEUR ?? 'GÉOMTL 2027 <kiosques@geomtl.com>';
  const retour = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: expediteur, ...message }),
    signal: AbortSignal.timeout(8000),
  });
  if (!retour.ok) throw new Error(`Resend ${retour.status} : ${await retour.text()}`);
}

async function envoyerCourriels(d: DonneesDemande, origine: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[demandes-kiosques] RESEND_API_KEY absent : aucun courriel envoyé.');
    return;
  }
  const comite = EVENT_CONFIG.courriels.partenariat;
  const niveau = LIBELLES_NIVEAUX[d.niveau].fr;
  const fr = d.langue === 'fr';
  const sansPreference = d.kiosque === SANS_PREFERENCE;
  const kiosqueFr = sansPreference ? 'sans préférence' : `kiosque ${d.kiosque}`;
  const kiosqueEn = sansPreference ? 'no booth preference' : `booth ${d.kiosque}`;
  // Le responsable du kiosque reçoit aussi l'accusé de réception s'il est différent
  const copie = !d.kiosque_meme_contact && d.kiosque_courriel !== d.principal_courriel ? [d.kiosque_courriel] : undefined;

  const resultats = await Promise.allSettled([
    envoyerCourriel({
      to: process.env.COURRIEL_COMITE || comite,
      reply_to: d.principal_courriel,
      subject: `Demande ${niveau} (${kiosqueFr}) : ${d.organisation}`,
      text: [
        'Nouvelle demande « Devenir partenaire ou exposant » reçue sur le site.',
        '',
        `Organisation : ${d.organisation}`,
        `Niveau souhaité : ${niveau}`,
        `Kiosque souhaité : ${sansPreference ? 'sans préférence' : d.kiosque}`,
        `Langue : ${fr ? 'français' : 'anglais'}`,
        '',
        'Contact principal :',
        `  ${d.principal_nom}, ${d.principal_courriel}, ${d.principal_telephone}`,
        'Responsable du kiosque :',
        d.kiosque_meme_contact ? '  (le contact principal)' : `  ${d.kiosque_nom}, ${d.kiosque_courriel}, ${d.kiosque_telephone}`,
        '',
        'Message :',
        d.message || '(aucun)',
        '',
        `Traiter la demande : ${origine}/admin/kiosques`,
        'Le kiosque reste affiché disponible jusqu\'à ce que le comité confirme la réservation dans l\'admin.',
      ].join('\n'),
    }),
    envoyerCourriel({
      to: d.principal_courriel,
      cc: copie,
      reply_to: comite,
      subject: fr ? `GÉOMTL 2027 : demande reçue (${kiosqueFr})` : `GÉOMTL 2027: request received (${kiosqueEn})`,
      text: fr
        ? [
            `Bonjour ${d.principal_nom},`,
            '',
            `Nous avons bien reçu la demande de ${d.organisation} (${niveau}, ${kiosqueFr}).`,
            'Le comité vous répond sous peu. La réservation d\'un kiosque n\'est confirmée qu\'après la réponse du comité.',
            '',
            `Pour toute question : ${comite}`,
            '',
            'L\'équipe GÉOMTL 2027',
          ].join('\n')
        : [
            `Hello ${d.principal_nom},`,
            '',
            `We have received the request from ${d.organisation} (${LIBELLES_NIVEAUX[d.niveau].en}, ${kiosqueEn}).`,
            'The committee will get back to you shortly. A booth booking is only confirmed once the committee replies.',
            '',
            `Questions: ${comite}`,
            '',
            'The GÉOMTL 2027 team',
          ].join('\n'),
    }),
  ]);
  resultats.forEach((r) => {
    if (r.status === 'rejected') console.error('[demandes-kiosques] courriel', r.reason);
  });
}
