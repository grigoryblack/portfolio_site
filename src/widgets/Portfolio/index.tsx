'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/shared/contexts/LocaleContext';
import styles from './index.module.scss';
import PortfolioCard from '@/shared/components/PortfolioCard';
import TextType from '@/shared/components/TypeText';
import { portfolioData } from '@/shared/config/portfolioData';
import CurvedLoop from '@/shared/components/CurvedLoop';

const Portfolio = () => {
  const tPortfolio = useTranslations('portfolio');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);

            // Re-animate cards with stagger effect
            cardsRef.current.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
              }
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const addCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section className={styles.wrapper} id="portfolio" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.title}>
          <CurvedLoop
            marqueeText={`${tPortfolio('title')} ✦`}
            speed={2}
            curveAmount={0}
            interactive
          />
        </div>

        <div className={styles.grid}>
          {portfolioData.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => addCardRef(el, index)}
              className={styles.cardWrapper}
            >
              <PortfolioCard
                id={project.id}
                backgroundImage={project.backgroundImage.src}
                technologies={project.technologies}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;