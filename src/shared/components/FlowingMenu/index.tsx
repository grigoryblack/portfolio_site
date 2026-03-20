import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

import styles from './index.module.scss';

interface MenuItemData {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
}

interface MenuItemProps extends MenuItemData {
  speed: number;
  isFirst: boolean;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
                                                   items = [],
                                                   speed = 15,
                                                 }) => {
  return (
    <div className={styles.menu__wrap}>
      <nav className={styles.menu}>
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            isFirst={idx === 0}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
                                             link,
                                             text,
                                             image,
                                             speed,
                                             isFirst,
                                           }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(8);

  const animationDefaults: gsap.TweenVars = { duration: 0.6, ease: 'expo' };

  const distMetric = (x: number, y: number, x2: number, y2: number): number => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 4; // Increased buffer
      setRepetitions(Math.max(8, needed)); // Increased minimum repetitions
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      
      // Wait for DOM to be ready
      const marqueeContent = marqueeInnerRef.current.querySelector(`.${styles.marquee__part}`) as HTMLElement;
      if (!marqueeContent) {
        // Retry if content not ready
        setTimeout(setupMarquee, 100);
        return;
      }
      
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) {
        setTimeout(setupMarquee, 100);
        return;
      }

      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Set initial position
      gsap.set(marqueeInnerRef.current, { x: 0 });
      
      // Create continuous animation with seamless loop
      animationRef.current = gsap.fromTo(marqueeInnerRef.current, 
        { x: 0 },
        {
          x: -contentWidth,
          duration: speed,
          ease: 'none',
          repeat: -1,
          immediateRender: true
        }
      );
    };

    const timer = setTimeout(setupMarquee, 100);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className={`${styles.menu__item} ${isFirst ? styles.menu__item__first : ''}`} ref={itemRef}>
      <a
        className={styles.menu__item__link}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className={styles.marquee} ref={marqueeRef}>
        <div className={styles.marquee__inner__wrap}>
          <div className={styles.marquee__inner} ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className={styles.marquee__part} key={idx}>
                <span>{text}</span>
                <div className={styles.marquee__img} style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
