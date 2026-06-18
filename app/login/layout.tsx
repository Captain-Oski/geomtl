import '@/styles/globals.css'

export const metadata = {
  title: 'Connexion — GeoMTL 2027',
  robots: 'noindex, nofollow',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-950">{children}</body>
    </html>
  )
}
