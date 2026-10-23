import { redirect } from 'next/navigation'

// Lien des courriels de demande déjà envoyés au comité
export default function KiosquesPage() {
  redirect('/admin/organisations?onglet=demandes')
}
