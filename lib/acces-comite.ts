export const COOKIE_COMITE = 'geomtl_comite';

export function siteEnConstruction() {
  return process.env.SITE_PUBLIC !== 'true';
}

// Le cookie garde une empreinte du code, jamais le code lui-même :
// changer CODE_ACCES_COMITE invalide tous les accès déjà donnés.
export async function empreinteCode(code: string) {
  const octets = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`geomtl-comite:${code}`));
  return Array.from(new Uint8Array(octets), (o) => o.toString(16).padStart(2, '0')).join('');
}

export async function accesComiteValide(cookie: string | undefined) {
  const code = process.env.CODE_ACCES_COMITE;
  if (!code || !cookie) return false;
  return cookie === (await empreinteCode(code));
}
