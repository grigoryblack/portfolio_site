'use client';

import React, { createContext, useContext } from 'react';

type Locale = 'en' | 'ru';

interface LocaleContextType {
  locale: Locale;
  messages: Record<string, any>;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Record<string, any>;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context.locale;
}

export function useTranslations(namespace?: string) {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslations must be used within LocaleProvider');
  }

  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split('.');
    let value: any = context.messages;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };
}
