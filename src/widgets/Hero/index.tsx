"use client";

import React from "react";
import styles from "./index.module.scss";
import LineWaves from "@/shared/layout/HeroBackground";
import StaggeredMenu from "@/shared/components/Navigation";
import TextType from "@/shared/components/TypeText";
import TextPressure from "@/shared/components/PressureText";
import { Button } from "@/shared/ui";

const Hero = () => {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "№about" },
    { label: "Services", ariaLabel: "View our services", link: "/services" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
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
          Contact me
        </Button>
      </div>
    </section>
  );
};

export default Hero;
