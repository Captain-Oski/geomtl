'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'geomtl_cookie_consent';

export type ConsentValue = 'accepted' | 'refused';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(STORAGE_KEY) as ConsentValue) ?? null;
}

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function handleChoice(value: ConsentValue) {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label={t('ariaLabel')}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5"
        >
          <div className="mx-auto max-w-5xl glass-2027 rounded-2xl border border-geo-ink/10 shadow-card-2027 px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-geo-teal/15 border border-geo-teal-dark/25 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="#00A383" strokeWidth="1.5" />
                <circle cx="7"  cy="8"  r="1.2" fill="#00A383" />
                <circle cx="13" cy="7"  r="0.9" fill="#00A383" />
                <circle cx="12" cy="13" r="1.1" fill="#00A383" />
                <circle cx="7"  cy="13" r="0.8" fill="#00A383" />
              </svg>
            </div>

            {/* Text */}
            <p className="flex-1 text-sm text-geo-ink-soft leading-relaxed">
              {t('message')}{' '}
              <Link
                href={`/${locale}/confidentialite`}
                className="text-geo-teal-dark hover:text-geo-teal underline underline-offset-2 transition-colors"
              >
                {t('privacyLink')}
              </Link>
              .
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleChoice('refused')}
                className="px-4 py-2 text-sm font-medium text-geo-ink-soft hover:text-geo-ink border border-geo-ink/10 hover:border-geo-ink/20 rounded-lg transition-colors"
              >
                {t('refuse')}
              </button>
              <button
                onClick={() => handleChoice('accepted')}
                className="px-4 py-2 text-sm font-semibold text-geo-noir rounded-lg bg-gradient-geo-2027 hover:opacity-90 transition-all shadow-geo-2027"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
