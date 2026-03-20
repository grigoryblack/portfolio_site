'use client';

import React from 'react';
import { useTranslations } from '@/shared/contexts/LocaleContext';
import styles from './index.module.scss';

const Footer = () => {
  const tFooter = useTranslations('footer');
  
  return (
    <section id="footer" className={styles.wrapper}>
      <h4>{tFooter('createdBy')}</h4>
    </section>
  );
};

export default Footer;