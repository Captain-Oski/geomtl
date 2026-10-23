import type { PartnerType } from '@/lib/supabase/types'

// Niveaux de partenariat vendus pour GÉOMTL 2027 (contrainte de la migration V008).
// Module sans dépendance serveur : utilisé par l'admin et par les pages serveur.
export const TYPES_PARTENAIRE: { value: PartnerType; label: string }[] = [
  { value: 'Gold', label: 'Or' },
  { value: 'Silver', label: 'Argent' },
  { value: 'Bronze', label: 'Bronze' },
  { value: 'Networking', label: 'Soirée réseautage' },
]

export const LIBELLES_TYPES_PARTENAIRE = Object.fromEntries(
  TYPES_PARTENAIRE.map((t) => [t.value, t.label])
) as Record<PartnerType, string>
