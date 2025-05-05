"use client";

import React, { useRef } from "react";
import GsapProgressBar from "./GsapProgressBar";

export default function GsapScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ref pro hlavní kontejner obsahu, jehož scroll budeme sledovat
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <GsapProgressBar target={contentRef} />
      {/* Tento div bude sloužit jako 'trigger' pro ScrollTrigger */}
      <div ref={contentRef} className="gsap-scroll-trigger-container">
        {children}
      </div>
    </div>
  );
}
