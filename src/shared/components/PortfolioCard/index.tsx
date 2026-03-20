'use client';

import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from '@/shared/contexts/LocaleContext';
import { portfolioData } from '@/shared/config/portfolioData';
import { calculateWorkPeriod } from '@/shared/utils/dateUtils';
import styles from './index.module.scss';
import { Button } from '@/shared/ui';

interface PortfolioCardProps {
  id: string;
  backgroundImage: string;
  technologies: string[];
  className?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  id,
  backgroundImage,
  technologies,
  className
}) => {
  const tPortfolio = useTranslations('portfolio');
  
  // State for locale to trigger re-render on language changes
  const [locale, setLocale] = useState('ru');
  
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
  
  const title = tPortfolio(`${id}.title`);
  const description = tPortfolio(`${id}.description`);
  const fullDescription = tPortfolio(`${id}.fullDescription`);
  
  // State for period to trigger re-render on locale change
  const [period, setPeriod] = useState('');
  
  // Update period when locale changes
  useEffect(() => {
    const getPeriod = () => {
      if (id === 'callibri') {
        return calculateWorkPeriod('2024-09-01', locale);
      }
      return tPortfolio(`${id}.period`);
    };
    
    setPeriod(getPeriod());
  }, [locale, id, tPortfolio]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const disableScroll = () => {
    const scrollY = window.scrollY;
    setScrollY(scrollY);
    
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    window.scrollTo(0, scrollY);
  };

  const openModal = () => {
    disableScroll();
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    enableScroll();
  };

  // Handle Escape key and cleanup on unmount
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Cleanup on unmount
      if (isModalOpen) {
        enableScroll();
      }
    };
  }, [isModalOpen]);

  return (
    <>
      <div 
        className={`${styles.portfolioCard} ${className || ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.period}>{period}</p>
            <p className={styles.description}>{description}</p>
            <div className={styles.technologies}>
              {technologies.map((tech, index) => (
                <span key={index} className={styles.tech}>{tech}</span>
              ))}
            </div>
            <Button 
              variant="primary" 
              size="m" 
              onClick={openModal}
              className={styles.button}
            >
              {tPortfolio('detailsButton')}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal - rendered at document body level */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <h2 className={styles.modalTitle}>{title}</h2>
            <div className={styles.modalBody}>
              <div className={styles.modalDescription}>
                {fullDescription.split('\n').map((line, index) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h4 key={index} className={styles.sectionTitle}>{line.replace(/\*\*/g, '')}</h4>;
                  }
                  if (line.startsWith('–') || line.startsWith('-')) {
                    return <li key={index} className={styles.listItem}>{line.replace(/^[–-]\s*/, '')}</li>;
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className={styles.paragraph}>{line}</p>;
                })}
              </div>
              <div className={styles.modalTechnologies}>
                <h4>{tPortfolio('technologies')}</h4>
                <div className={styles.techList}>
                  {technologies.map((tech, index) => (
                    <span key={index} className={styles.modalTech}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PortfolioCard;