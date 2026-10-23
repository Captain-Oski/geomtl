import GeoMTLLogo from '@/components/ui/GeoMTLLogo';

// 404 hors des pages du site (/admin/..., fichiers inexistants...). La mise
// en page racine ne fournit ni html ni styles : tout est en ligne ici.
const ENCRE = '#141412';

export default function NotFound() {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#F4F3ED', color: ENCRE, fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif' }}>
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            boxSizing: 'border-box',
            background: "#01CDA5 url('/images/brand/degrade-trame.webp') center 40% / cover no-repeat",
          }}
        >
          <GeoMTLLogo height={44} />
          <p style={{ margin: '2.5rem 0 0', fontSize: '6rem', fontWeight: 800, lineHeight: 1 }}>404</p>
          <h1 style={{ margin: '1rem 0 0', fontSize: '1.75rem' }}>Page introuvable · Page not found</h1>
          <p style={{ margin: '1rem auto 0', maxWidth: '34rem', lineHeight: 1.5 }}>
            Cette coordonnée n&apos;existe pas sur notre carte.
            <br />
            This coordinate doesn&apos;t exist on our map.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/fr" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: ENCRE, color: '#F4F3ED', fontWeight: 700, textDecoration: 'none' }}>
              Accueil
            </a>
            <a href="/en" style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: `1px solid ${ENCRE}`, color: ENCRE, fontWeight: 700, textDecoration: 'none' }}>
              Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
