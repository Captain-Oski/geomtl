import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="fr">
      <body style={{ background: '#0a1628', color: '#f0f4f8', fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background SVG */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
            viewBox="0 0 800 600"
            fill="none"
          >
            <path d="M0 300 C150 180, 350 120, 500 180 C650 240, 720 320, 700 400 C680 480, 580 520, 400 500 C220 480, 80 420, 0 300Z" stroke="#e91e8c" strokeWidth="1.5" fill="none"/>
            <path d="M0 300 C130 160, 330 95, 510 158 C690 221, 760 310, 735 402 C710 494, 600 540, 405 517 C210 494, 60 432, 0 300Z" stroke="#e91e8c" strokeWidth="0.8" fill="none"/>
            <path d="M100 300 C220 220, 350 195, 450 215 C550 235, 590 290, 570 340 C550 390, 470 410, 360 400 C250 390, 150 350, 100 300Z" stroke="#ff6b35" strokeWidth="1.5" fill="none"/>
            <path d="M700 100 C820 60, 900 120, 880 200 C860 280, 760 300, 660 260 C560 220, 540 140, 700 100Z" stroke="#ffd60a" strokeWidth="1" fill="none"/>
          </svg>

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* 404 */}
            <div style={{ fontSize: '8rem', fontWeight: 900, lineHeight: 1, marginBottom: '0.5rem' }}>
              <span style={{ color: 'white' }}>4</span>
              <span style={{ background: 'linear-gradient(135deg, #e91e8c, #ff6b35)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>0</span>
              <span style={{ color: 'white' }}>4</span>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
              Page introuvable
            </h1>
            <p style={{ color: '#8896a8', marginBottom: '2rem', maxWidth: '400px' }}>
              Cette coordonnée n&apos;existe pas sur notre carte. — This coordinate doesn&apos;t exist on our map.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/fr"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: 700,
                  color: 'white',
                  background: 'linear-gradient(135deg, #e91e8c, #ff6b35)',
                  textDecoration: 'none'
                }}
              >
                ← Accueil / Home
              </a>
            </div>

            {/* Logo */}
            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white' }}>GÉO</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#e91e8c' }}>MTL</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8896a8', marginLeft: '0.25rem' }}>2027</span>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
