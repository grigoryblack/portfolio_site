"use client";

import React from "react";
import { useTranslations } from "@/shared/contexts/LocaleContext";
import styles from "./index.module.scss";
import LineWaves from "@/shared/layout/HeroBackground";
import StaggeredMenu from "@/shared/components/Navigation";
import TextPressure from "@/shared/components/PressureText";
import { Button } from "@/shared/ui";

const Hero = () => {
  const tNav = useTranslations('navigation');
  const tHero = useTranslations('hero');
  
  const menuItems = [
    { label: tNav('home'), ariaLabel: "Go to home page", link: "/" },
    { label: tNav('about'), ariaLabel: "Learn about us", link: "№about" },
    { label: tNav('services'), ariaLabel: "View our services", link: "/services" },
    { label: tNav('contact'), ariaLabel: "Get in touch", link: "/contact" },
  ];

  return (
    <section id="hero" className={styles.wrapper}>
      <LineWaves
        speed={0.1}
        innerLineCount={36}
        outerLineCount={27}
        warpIntensity={1}
        rotation={-45}
        edgeFadeWidth={0.4}
        colorCycleSpeed={1}
        brightness={0.07}
        enableMouseInteraction
        mouseInfluence={0.3}
      />

      <StaggeredMenu
        position="right"
        items={menuItems}
        displaySocials
        displayItemNumbering={true}
      />

      <div className={styles.wrapper__container}>
        <TextPressure
          text="Front-dev"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          minFontSize={36}
        />

        <Button size="l" variant="primary">
          {tHero('contactButton')}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
