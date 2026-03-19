'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '../../contexts/LocaleContext';
import styles from './LanguageSelector.module.scss';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    // Простое переключение между /en и /ru
    router.push(`/${newLocale}`);
  };

  return (
    <div className={styles.languageSelector}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          className={`${styles.languageButton} ${
            currentLocale === lang.code ? styles.active : ''
          }`}
          onClick={() => handleLanguageChange(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
