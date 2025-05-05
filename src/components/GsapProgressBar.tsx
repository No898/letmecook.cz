"use client";

import React, { useRef, useLayoutEffect } from "react"; // Použijeme useLayoutEffect pro práci s DOM před vykreslením
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Props - očekáváme ref na kontejner, jehož scroll sledujeme
interface GsapProgressBarProps {
  // Povolíme i null, protože useRef může vrátit null
  target: React.RefObject<HTMLElement | null>;
}

// Registrace pluginu - důležité udělat jen jednou
gsap.registerPlugin(ScrollTrigger);

export default function GsapProgressBar({ target }: GsapProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null); // Ref pro samotný progress bar

  useLayoutEffect(() => {
    // Počkáme, až budou oba refy dostupné
    const barElement = progressBarRef.current;
    const targetElement = target.current;

    if (!barElement || !targetElement) {
      // console.warn("GSAP ProgressBar: Refs not available yet.");
      return; // Pokud refy nejsou připojené, nic neděláme
    }

    // Vytvoření animace a ScrollTriggeru
    const ctx = gsap.context(() => {
      // Použití gsap.context pro snadnější cleanup
      gsap.to(barElement, {
        scaleX: 1, // Cílová hodnota animace (z 0 na 1)
        ease: "none", // Bez easingu, lineární progress
        scrollTrigger: {
          trigger: targetElement, // Element, který spouští trigger
          // scroller: window, // Defaultně sleduje scroll okna
          scrub: true, // Propojí animaci přímo se scrollováním (true = plynulé)
          start: "top top", // Začne, když horní hrana triggeru dosáhne horní hrany okna
          end: "bottom bottom", // Skončí, když dolní hrana triggeru dosáhne dolní hrany okna
          // markers: process.env.NODE_ENV === "development", // Ponecháno pro snadné ladění
        },
      });
    });

    // Cleanup funkce - velmi důležitá!
    return () => ctx.revert(); // Zruší všechny animace a triggery vytvořené v tomto kontextu
  }, [target]); // Spustí se znovu, pokud se změní target ref (což by nemělo často)

  // Renderujeme jednoduchý div, GSAP se postará o animaci stylu
  return (
    <div
      ref={progressBarRef}
      className="scroll-progress-bar gsap-progress-bar" // Přidána extra třída pro jistotu
      style={{ transform: "scaleX(0)" }} // Počáteční stav (GSAP ho přepíše)
    />
  );
}
