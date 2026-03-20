'use client';

import React from 'react';
import { useTranslations } from '@/shared/contexts/LocaleContext';
import styles from './index.module.scss';
import FlowingMenu from '@/shared/components/FlowingMenu';
import TextType from '@/shared/components/TypeText';
import instagramIcon from '@/shared/assets/img/Instagram_icon.webp';
import telegramIcon from '@/shared/assets/img/tg_logo.webp';
import phoneIcon from '@/shared/assets/img/call_phone.webp';
import mailIcon from '@/shared/assets/img/mail.webp';
import hhIcon from '@/shared/assets/img/hh_logo.webp';

const Contacts = () => {
  const tContacts = useTranslations('contacts');
  
  const demoItems = [
    { link: 'tel:+79127864139', text: 'Phone', image: phoneIcon.src },
    { link: 'https://instagram.com/mask.bright', text: 'Instagram', image: instagramIcon.src },
    { link: 'https://t.me/Grigory_Dr', text: 'Telegram', image: telegramIcon.src },
    { link: 'mailto:grigorij.druzhenkovcv@yandex.ru', text: 'Email', image: mailIcon.src },
    { link: 'https://perm.hh.ru/resume/0d27f781ff0da6ecb50039ed1f4b3858396458', text: 'HeadHunter', image: hhIcon.src },
  ];

  return (
    <section id="contacts" className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <TextType
          text={[tContacts('title')]}
          typingSpeed={75}
          pauseDuration={3000}
          showCursor
          cursorCharacter="_"
          deletingSpeed={25}
          cursorBlinkDuration={0.5}
        />

        <p className={styles.description}>{tContacts('description')}</p>
      </div>

      <FlowingMenu
        items={demoItems}
        speed={15}
      />
    </section>
  );
};

export default Contacts;