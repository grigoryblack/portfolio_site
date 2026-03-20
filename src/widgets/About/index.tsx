'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/shared/contexts/LocaleContext';
import { calculateTotalExperience } from '@/shared/utils/dateUtils';
import styles from './index.module.scss';
import myself from '../../shared/assets/img/myself.jpg';
import TextType from '@/shared/components/TypeText';
import TiltedCard from '@/shared/components/TiteledCard';

const About = () => {
  const tAbout = useTranslations('about');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // State for locale and dynamic experience calculation
  const [locale, setLocale] = useState('ru');
  const [experienceValue, setExperienceValue] = useState('');

  // Update locale when pathname changes
  useEffect(() => {
    const updateLocale = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const newLocale = path.startsWith('/en') ? 'en' : 'ru';
        setLocale(newLocale);
      }
    };

    updateLocale();

    // Listen for navigation changes
    const handlePopState = () => updateLocale();
    window.addEventListener('popstate', handlePopState);

    // Also check periodically in case of programmatic navigation
    const interval = setInterval(updateLocale, 100);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearInterval(interval);
    };
  }, []);

  // Update experience value when locale changes
  useEffect(() => {
    setExperienceValue(calculateTotalExperience(locale));
  }, [locale]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (window.innerWidth >= 768) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;

            setTimeout(() => {
              const start = el.scrollLeft;
              const distance = 120;
              const duration = 1200;

              let startTime: number | null = null;

              const animate = (time: number) => {
                if (!startTime) startTime = time;
                const progress = (time - startTime) / duration;

                if (progress < 1) {
                  el.scrollLeft = start + distance * Math.sin(progress * Math.PI);
                  requestAnimationFrame(animate);
                } else {
                  el.scrollLeft = start;
                }
              };

              requestAnimationFrame(animate);
            }, 1000);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <TextType
            text={[tAbout('title')]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
          />
        </div>

        <div className={styles.container__info} ref={scrollRef}>
          <div className={styles.card__wrapper}>
            <TiltedCard>
              <div className={styles.card}>
                <img src={myself.src} alt="myself-img" />
                <h2>{tAbout('name')}</h2>
                <div className={styles.about}>
                  <p>
                    {tAbout('role')} — <span>{tAbout('roleValue')}</span>
                  </p>
                  <p>
                    {tAbout('experience')} — <span>{experienceValue}</span>
                  </p>
                </div>
              </div>
            </TiltedCard>
          </div>

          <div className={styles.education}>
            <div className={styles.title__desctop}>
              <TextType
                text={[tAbout('titleDesktop')]}
                typingSpeed={75}
                pauseDuration={3000}
                showCursor
                cursorCharacter="_"
                deletingSpeed={25}
                cursorBlinkDuration={0.5}
              />
            </div>
            <h3>{tAbout('education')}</h3>

            <p>
              {tAbout('educationUniversity')}
              <span>{tAbout('educationPeriod')}</span>
              <span>{tAbout('educationDegree')}</span>
            </p>

            <br />

            <p>
              {tAbout('militaryTraining')}
              <span>{tAbout('militaryPeriod')}</span>
              <span>{tAbout('militaryRank')}</span>
            </p>

            <h3>{tAbout('currentWork')}</h3>
            <p><a className={styles.accent} href={'https://callibri.ru/'}
                  target={'_blank'}>Callibri</a> — {tAbout('currentWorkDescription')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;