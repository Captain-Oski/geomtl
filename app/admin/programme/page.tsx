import { getSessions } from '@/lib/data/programme'
import { AdminProgrammePage } from '@/components/admin/programme/AdminProgrammePage'

export const metadata = {
  title: 'Programmation — Admin GÉOMTL',
}

export default async function ProgrammePage() {
  const sessions = await getSessions()
  return <AdminProgrammePage sessions={sessions} />
}
