"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      scaleX.set(0);
    }
  }, [pathname, scaleX, isMounted]);

  return (
    <>
      {isMounted && (
        <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      )}
      {children}
    </>
  );
}
