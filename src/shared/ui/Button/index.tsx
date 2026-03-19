'use client';

import React, { useRef } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'l' | 'm' | 's';
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = 'm',
  variant = 'primary',
  className = '',
  children,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const buttonClasses = [
    styles.button,
    styles[`button--${size}`],
    styles[`button--${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    // Создаем ripple эффект
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // Удаляем предыдущий ripple если есть
    const existingRipple = button.querySelector(`.${styles.ripple}`);
    if (existingRipple) {
      existingRipple.remove();
    }

    // Создаем новый ripple элемент
    const ripple = document.createElement('span');
    ripple.className = styles.ripple;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    // Удаляем ripple после анимации
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);

    // Вызываем оригинальный onClick если есть
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button ref={buttonRef} className={buttonClasses} onClick={handleClick} {...props}>
      <span className={styles.button__content}>{children}</span>
    </button>
  );
};

export default Button;
