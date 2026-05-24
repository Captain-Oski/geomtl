'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { EVENT_CONFIG } from '@/data/config';

function TopoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(233, 30, 140, 0.12) 0%, transparent 70%)',
          top: '-10%',
          right: '-5%',
          animation: 'float 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 53, 0.08) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-5%',
          animation: 'float 12s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(26, 74, 138, 0.2) 0%, transparent 70%)',
          top: '30%',
          left: '20%',
          animation: 'float 8s ease-in-out infinite 2s',
        }}
      />

      {/* Topographic SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large organic topo contours - left cluster */}
        <path
          d="M-50 400 C100 250, 300 180, 450 220 C600 260, 650 350, 600 420 C550 490, 450 520, 320 500 C190 480, 80 440, -50 400Z"
          stroke="rgba(233, 30, 140, 0.25)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M-80 400 C80 230, 280 150, 460 195 C640 240, 700 340, 645 425 C590 510, 480 545, 335 522 C190 499, 60 448, -80 400Z"
          stroke="rgba(233, 30, 140, 0.15)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M-110 400 C60 210, 260 120, 470 170 C680 220, 750 330, 690 430 C630 530, 510 570, 350 544 C190 518, 40 456, -110 400Z"
          stroke="rgba(233, 30, 140, 0.08)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M80 380 C200 290, 330 260, 420 280 C510 300, 540 360, 510 410 C480 460, 400 478, 300 465 C200 452, 120 418, 80 380Z"
          stroke="rgba(255, 107, 53, 0.3)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M60 380 C180 270, 320 235, 430 257 C540 279, 575 348, 542 402 C509 456, 422 476, 308 462 C194 448, 100 412, 60 380Z"
          stroke="rgba(255, 107, 53, 0.15)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M160 370 C260 310, 350 292, 415 308 C480 324, 504 368, 480 403 C456 438, 390 452, 302 440 C214 428, 148 400, 160 370Z"
          stroke="rgba(255, 214, 10, 0.2)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Right cluster */}
        <path
          d="M900 150 C1050 80, 1200 90, 1320 160 C1440 230, 1480 350, 1420 430 C1360 510, 1220 540, 1080 510 C940 480, 840 400, 860 310 C880 220, 900 150, 900 150Z"
          stroke="rgba(233, 30, 140, 0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M920 160 C1060 95, 1200 105, 1310 170 C1420 235, 1455 345, 1398 420 C1341 495, 1208 523, 1073 494 C938 465, 844 392, 862 306 C880 220, 920 160, 920 160Z"
          stroke="rgba(233, 30, 140, 0.12)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M960 180 C1080 120, 1200 130, 1300 185 C1400 240, 1430 340, 1380 408 C1330 476, 1210 502, 1090 476 C970 450, 882 385, 898 308 C914 231, 960 180, 960 180Z"
          stroke="rgba(255, 107, 53, 0.15)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M1000 200 C1100 148, 1200 155, 1290 200 C1380 245, 1406 334, 1360 395 C1314 456, 1206 479, 1100 456 C994 433, 918 376, 932 308 C946 240, 1000 200, 1000 200Z"
          stroke="rgba(255, 214, 10, 0.15)"
          strokeWidth="1"
          fill="none"
        />

        {/* Bottom cluster */}
        <path
          d="M300 650 C450 580, 650 560, 800 590 C950 620, 1050 680, 1020 740 C990 800, 850 830, 680 820 C510 810, 350 770, 280 720 C210 670, 300 650, 300 650Z"
          stroke="rgba(26, 74, 138, 0.4)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M320 660 C462 592, 655 573, 800 601 C945 629, 1040 685, 1012 742 C984 799, 850 827, 683 817 C516 807, 358 768, 288 720 C218 672, 320 660, 320 660Z"
          stroke="rgba(26, 74, 138, 0.25)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M400 670 C520 615, 660 600, 790 624 C920 648, 1000 698, 976 748 C952 798, 836 820, 690 811 C544 802, 402 766, 342 724 C282 682, 400 670, 400 670Z"
          stroke="rgba(91, 155, 213, 0.2)"
          strokeWidth="1"
          fill="none"
        />

        {/* Crossing detail lines */}
        <path
          d="M600 0 C620 100, 580 200, 560 300 C540 400, 500 450, 480 550 C460 650, 440 750, 420 800"
          stroke="rgba(233, 30, 140, 0.1)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M700 0 C720 120, 680 240, 660 360 C640 480, 600 560, 580 680 C560 800, 560 800, 540 800"
          stroke="rgba(255, 107, 53, 0.08)"
          strokeWidth="1"
          fill="none"
        />

        {/* Dot grid pattern */}
        {Array.from({ length: 8 }).map((_, rowIdx) =>
          Array.from({ length: 16 }).map((_, colIdx) => (
            <circle
              key={`${rowIdx}-${colIdx}`}
              cx={colIdx * 90 + 20}
              cy={rowIdx * 110 + 30}
              r="1"
              fill="rgba(255, 255, 255, 0.06)"
            />
          ))
        )}

        {/* Coordinate-like cross marks */}
        <g stroke="rgba(233, 30, 140, 0.2)" strokeWidth="1">
          <line x1="700" y1="390" x2="720" y2="390" />
          <line x1="710" y1="380" x2="710" y2="400" />
        </g>
        <g stroke="rgba(255, 107, 53, 0.2)" strokeWidth="1">
          <line x1="400" y1="180" x2="420" y2="180" />
          <line x1="410" y1="170" x2="410" y2="190" />
        </g>
        <g stroke="rgba(255, 214, 10, 0.15)" strokeWidth="1">
          <line x1="1100" y1="550" x2="1120" y2="550" />
          <line x1="1110" y1="540" x2="1110" y2="560" />
        </g>
      </svg>

      {/* Scanline effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function Hero() {
  const t = useTranslations('home');
  const locale = useLocale();
  const tagline = locale === 'fr' ? EVENT_CONFIG.tagline.fr : EVENT_CONFIG.tagline.en;
  const dates = locale === 'fr' ? EVENT_CONFIG.dates.fr : EVENT_CONFIG.dates.en;
  const venue = locale === 'fr' ? EVENT_CONFIG.venue.fr : EVENT_CONFIG.venue.en;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-deep-blue">
      <TopoBackground />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-24 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-geo/30 bg-rose-geo/10 text-rose-geo text-sm font-semibold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-geo animate-pulse" />
            {dates} · {venue}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="font-black leading-none tracking-tight">
            <span
              className="block text-white"
              style={{ fontSize: 'clamp(5rem, 18vw, 16rem)', lineHeight: 0.9 }}
            >
              Geo
              <span className="text-rose-geo">MTL</span>
            </span>
            <span
              className="block gradient-text"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 1 }}
            >
              2027
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-light-gray/80 max-w-2xl mx-auto leading-relaxed mb-4 font-light"
        >
          {tagline}
        </motion.p>

        {/* Micro slogans */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 text-sm text-mid-gray"
        >
          {(locale === 'fr' ? EVENT_CONFIG.microSlogans.fr : EVENT_CONFIG.microSlogans.en).map(
            (slogan, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline text-rose-geo/40">·</span>}
                {slogan}
              </span>
            )
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href={`/${locale}/billetterie`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-rose-geo to-orange-geo hover:from-rose-geo-light hover:to-orange-geo-light transition-all shadow-geo hover:shadow-geo-lg hover:scale-105 active:scale-100"
          >
            {t('heroCta1')}
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href={`/${locale}/devenir-partenaire`}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all"
          >
            {t('heroCta2')}
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {[
            { value: '1 000', label: locale === 'fr' ? 'participants' : 'attendees' },
            { value: '2', label: locale === 'fr' ? 'jours' : 'days' },
            { value: '60+', label: locale === 'fr' ? 'conférenciers' : 'speakers' },
            { value: '50+', label: locale === 'fr' ? 'exposants' : 'exhibitors' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-mid-gray mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs tracking-widest uppercase text-mid-gray">{t('heroScroll')}</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-mid-gray/50 to-transparent"
          animate={{ scaleY: [0, 1, 0], y: [0, 0, 20] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
