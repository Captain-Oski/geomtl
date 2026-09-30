import type { Config } from 'tailwindcss';

// Couleur de la charte lue dans une variable CSS, opacité Tailwind comprise
// (bg-geo-ink/85, border-geo-ink/10…).
const token = (nom: string) => `rgb(var(--rgb-geo-${nom}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Legacy palette (encore utilisée par /admin) ──────────────
        'deep-blue': '#0a1628',
        'deep-blue-light': '#0f2040',
        'deep-blue-mid': '#122035',
        'rose-geo': '#e91e8c',
        'rose-geo-light': '#f050a8',
        'rose-geo-dark': '#c0156e',
        'orange-geo': '#ff6b35',
        'orange-geo-light': '#ff8c5a',
        'orange-geo-dark': '#e05520',
        'yellow-geo': '#ffd60a',
        'yellow-geo-light': '#ffe54d',
        'light-gray': '#f0f4f8',
        'mid-gray': '#8896a8',
        'dark-glass': 'rgba(10, 22, 40, 0.7)',

        // ── Nouvelle identité 2027 (Studio Le Séisme) — site public ──
        // Relevées dans les visuels du globe en trame de points ; les
        // variantes "-dark" sont dérivées (même teinte, plus foncée).
        // Les valeurs vivent dans styles/globals.css (variables --rgb-geo-*)
        // pour que le mode sombre (.dark sur <html>) puisse les inverser :
        // la crème devient le fond encre, l'encre devient le texte crème.
        'geo-cream': token('cream'),
        'geo-cream-dark': token('cream-dark'),
        'geo-ink': token('ink'),
        'geo-ink-soft': token('ink-soft'),
        'geo-cyan': token('cyan'),
        'geo-teal': token('teal'),
        'geo-teal-dark': token('teal-dark'),
        'geo-green': token('green'),
        'geo-lime': token('lime'),
        'geo-lime-dark': token('lime-dark'),
        'geo-olive': token('olive'),
        // Fixes quel que soit le thème : texte posé sur le dégradé
        // signature (toujours clair) et pied de page (toujours noir).
        'geo-noir': '#141412',
        'geo-papier': '#F4F3ED',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-geo': 'linear-gradient(135deg, #e91e8c 0%, #ff6b35 100%)',
        'gradient-geo-blue': 'linear-gradient(135deg, #0a1628 0%, #122035 100%)',
        'gradient-rose-orange': 'linear-gradient(90deg, #e91e8c, #ff6b35)',
        // Dégradé signature 2027 : cyan → turquoise → vert → citron
        'gradient-geo-2027': 'linear-gradient(135deg, #20FEFD 0%, #01CDA5 35%, #1BC868 65%, #D0DC00 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'geo': '0 0 40px rgba(233, 30, 140, 0.15)',
        'geo-lg': '0 0 80px rgba(233, 30, 140, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        // Nouvelle identité 2027
        'geo-2027': '0 0 40px rgba(1, 205, 165, 0.18)',
        'geo-2027-lg': '0 0 80px rgba(208, 220, 0, 0.22)',
        'card-2027': '0 4px 24px rgba(20, 20, 18, 0.08)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};

export default config;
