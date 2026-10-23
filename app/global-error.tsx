'use client';

// Dernier recours : erreur dans une mise en page racine. Les styles du site
// ne sont pas chargés ici, d'où les styles en ligne.
export default function ErreurGlobale({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#F4F3ED', color: '#141412', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>GÉOMTL 2027 · Erreur 500</p>
          <h1 style={{ fontSize: '2rem', margin: '0.75rem 0' }}>Une erreur est survenue</h1>
          <p style={{ margin: 0, color: '#4A4944' }}>Something went wrong. Réessayez dans un instant / Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 0, background: '#141412', color: '#F4F3ED', fontWeight: 700, cursor: 'pointer' }}
          >
            Réessayer / Try again
          </button>
          {error.digest && <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: '#4A4944' }}>Code : {error.digest}</p>}
        </main>
      </body>
    </html>
  );
}
