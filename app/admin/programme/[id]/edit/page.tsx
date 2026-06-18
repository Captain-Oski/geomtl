import { notFound } from 'next/navigation'
import { getSessionById } from '@/lib/data/programme'
import { SessionForm } from '@/components/admin/programme/SessionForm'
import Link from 'next/link'

export const metadata = {
  title: 'Modifier session — Admin GeoMTL',
}

export default async function EditSessionPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSessionById(params.id)
  if (!session) notFound()

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <Link href="/admin/programme" className="text-xs text-gray-500 hover:text-white transition-colors">
          ← Retour à la programmation
        </Link>
        <h1 className="text-2xl font-bold text-white mt-2">Modifier la session</h1>
        <p className="text-gray-500 text-sm mt-0.5 truncate">{session.title_fr}</p>
      </div>
      <SessionForm session={session} />
    </div>
  )
}
