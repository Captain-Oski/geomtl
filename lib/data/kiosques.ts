import { unstable_cache } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { KIOSQUES_REPLI } from '@/data/kiosques';
import type { DemandeKiosque, Kiosque, KiosquePublic } from '@/lib/supabase/types';

// Étiquette de cache du plan public : l'admin l'invalide à chaque changement
// d'état d'un kiosque (lib/actions/kiosques.ts).
export const ETIQUETTE_KIOSQUES = 'kiosques';

const supabaseConfigure = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

// Complète avec le repli : le plan a toujours ses 26 kiosques
const completer = <T extends { numero: number }>(lignes: T[], repli: T[]) =>
  repli.map((k) => lignes.find((l) => l.numero === k.numero) ?? k);

// ─── Site public ──────────────────────────────────────────
// Lu côté serveur avec la clé service role : le public ne reçoit que les
// colonnes publiques, et le rôle anon n'a aucun droit sur la table.

export const getKiosquesPublics = unstable_cache(
  async (): Promise<KiosquePublic[]> => {
    if (!supabaseConfigure()) return KIOSQUES_REPLI;
    try {
      const { data, error } = await createAdminClient()
        .from('kiosques')
        .select('numero, statut, organisation_affichee, logo_url, site_url')
        .order('numero');
      if (error || !data) {
        console.error('[getKiosquesPublics]', error?.message);
        return KIOSQUES_REPLI;
      }
      return completer(data as KiosquePublic[], KIOSQUES_REPLI);
    } catch (e) {
      console.error('[getKiosquesPublics]', e);
      return KIOSQUES_REPLI;
    }
  },
  ['kiosques-publics'],
  { tags: [ETIQUETTE_KIOSQUES], revalidate: 300 }
);

// ─── Admin ────────────────────────────────────────────────
// Session de l'utilisateur : la RLS limite la lecture aux membres du comité.

const KIOSQUES_ADMIN_REPLI: Kiosque[] = KIOSQUES_REPLI.map((k) => ({
  ...k,
  exhibitor_id: null,
  partner_id: null,
  notes_internes: null,
  updated_by: null,
  updated_at: new Date(0).toISOString(),
}));

export async function getKiosquesAdmin(): Promise<Kiosque[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return KIOSQUES_ADMIN_REPLI;
  const supabase = await createClient();
  const { data, error } = await supabase.from('kiosques').select('*').order('numero');
  if (error || !data) {
    console.error('[getKiosquesAdmin]', error?.message);
    return KIOSQUES_ADMIN_REPLI;
  }
  return completer(data as Kiosque[], KIOSQUES_ADMIN_REPLI);
}

export async function getDemandesKiosques(): Promise<DemandeKiosque[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('demandes_kiosques')
    .select('*')
    .order('created_at', { ascending: false });
  if (error || !data) {
    console.error('[getDemandesKiosques]', error?.message);
    return [];
  }
  return data as DemandeKiosque[];
}

// Pastille du menu de l'admin : nombre de demandes jamais ouvertes
export async function compterNouvellesDemandes(): Promise<number> {
  if (!supabaseConfigure()) return 0;
  try {
    const { count, error } = await createAdminClient()
      .from('demandes_kiosques')
      .select('id', { count: 'exact', head: true })
      .eq('statut', 'nouvelle');
    return error ? 0 : count ?? 0;
  } catch {
    return 0;
  }
}
