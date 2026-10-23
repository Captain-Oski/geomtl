import { redirect } from 'next/navigation'

export default function ExhibitorsPage() {
  redirect('/admin/organisations?onglet=organisations')
}
