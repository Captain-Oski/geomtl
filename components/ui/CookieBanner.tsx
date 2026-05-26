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
          <div className="mx-auto max-w-5xl glass rounded-2xl border border-white/10 shadow-card px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-rose-geo/15 border border-rose-geo/25 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" aria-hidden="true">
                <circle cx="10" cy="10" r="8" stroke="#e91e8c" strokeWidth="1.5" />
                <circle cx="7"  cy="8"  r="1.2" fill="#e91e8c" />
                <circle cx="13" cy="7"  r="0.9" fill="#e91e8c" />
                <circle cx="12" cy="13" r="1.1" fill="#e91e8c" />
                <circle cx="7"  cy="13" r="0.8" fill="#e91e8c" />
              </svg>
            </div>

            {/* Text */}
            <p className="flex-1 text-sm text-mid-gray leading-relaxed">
              {t('message')}{' '}
              <Link
                href={`/${locale}/confidentialite`}
                className="text-rose-geo hover:text-rose-geo-light underline underline-offset-2 transition-colors"
              >
                {t('privacyLink')}
              </Link>
              .
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleChoice('refused')}
                className="px-4 py-2 text-sm font-medium text-mid-gray hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
              >
                {t('refuse')}
              </button>
              <button
                onClick={() => handleChoice('accepted')}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-rose-geo to-orange-geo hover:from-rose-geo-light hover:to-orange-geo-light transition-all shadow-geo"
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
