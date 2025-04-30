"use client";

import React, { useRef } from "react";
import GsapProgressBar from "./GsapProgressBar"; // Import nové GSAP verze

export default function GsapScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ref pro hlavní kontejner obsahu, jehož scroll budeme sledovat
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {" "}
      {/* Obalující div */}
      {/* GSAP Progress bar dostane ref na kontejner obsahu */}
      <GsapProgressBar target={contentRef} />
      {/* Kontejner obsahu, kterému přiřadíme ref */}
      {/* Tento div bude sloužit jako 'trigger' pro ScrollTrigger */}
      <div ref={contentRef} className="gsap-scroll-trigger-container">
        {" "}
        {/* Přidán ref a třída */}
        {children} {/* Zde bude <article> s receptem */}
      </div>
    </div>
  );
}
