"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";

// Removed Translations interface definition

interface HomePageHeaderProps {
  title: string;
  instagramUrl: string;
  emailAddress: string;
  locale: string;
  languages: string[];
  // Removed translations prop
}

export default function HomePageHeader({
  title,
  instagramUrl,
  emailAddress,
  locale,
  languages,
  // Removed translations parameter
}: HomePageHeaderProps) {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showIconsOnMobile, setShowIconsOnMobile] = useState(false);
  const floatingAnims = useRef<gsap.core.Tween[]>([]);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const langImages: { [key: string]: string } = {
    cs: "/images/knedlo-vepro-zelo.webp",
    en: "/images/fish-and-chips.webp",
    vi: "/images/banh-mi.webp",
    "zh-TW": "/images/beef-noodle-soup.webp",
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const headerElement = headerRef.current;
    // Skip GSAP setup on mobile
    if (!headerElement || isMobile) {
      tl.current?.kill();
      floatingAnims.current.forEach(anim => anim.kill());
      floatingAnims.current = [];
      itemsRef.current.forEach((item) => item && gsap.killTweensOf(item));
      return () => window.removeEventListener('resize', checkMobile);
    }

    // GSAP logic only for desktop
    const headerWidth = headerElement.offsetWidth;
    const radiusX = headerWidth * 0.7;
    const radiusY = 80;
    const centerX = 0;
    const centerY = 20;

    const numberOfVisibleIcons = languages.filter(l => l !== locale).length;
    const angleStep = numberOfVisibleIcons > 0 ? Math.PI / numberOfVisibleIcons : Math.PI;
    let visibleIconIndex = 0;

    tl.current = gsap.timeline({ paused: true, reversed: true });
    floatingAnims.current.forEach(anim => anim.kill()); // Clear previous animations
    floatingAnims.current = [];

    gsap.delayedCall(0, () => {
      const renderedItems = headerElement.querySelectorAll<HTMLDivElement>(
        ".language-icon-container-desktop"
      );
      itemsRef.current = Array.from(renderedItems);

      renderedItems.forEach((itemContainer, index) => {
        if (!itemContainer) return;

        const lang = languages[index];
        // Skip active language icon
        if (lang === locale) {
          gsap.set(itemContainer, { opacity: 0, scale: 0 });
          return;
        }

        // Calculate position in semicircle
        const initialAngle = (angleStep / 2) + (visibleIconIndex * angleStep);
        const iconWidth = 100;
        const initialX =
          centerX + Math.cos(initialAngle) * radiusX;
        const initialY =
          centerY + Math.sin(initialAngle) * radiusY;

        visibleIconIndex++;

        // Set initial state (hidden)
        gsap.set(itemContainer, {
          opacity: 0,
          scale: 0,
          x: initialX - iconWidth / 2, // Center horizontally
          y: initialY,
          position: 'absolute',
        });

        // Appearance animation (part of the main timeline)
        tl.current?.to(
          itemContainer,
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          0 // Stagger start time?
        );

        // Floating animation (independent)
        const floatOffsetX = (Math.random() - 0.5) * 6;
        const floatOffsetY = (Math.random() - 0.5) * 4 + 3;
        const floatTween = gsap.to(itemContainer, {
          x: (initialX - iconWidth / 2) + floatOffsetX,
          y: initialY + floatOffsetY,
          duration: 1.8 + Math.random() * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          paused: true, // Start paused
        });
        floatingAnims.current.push(floatTween);
      });
    });

    // Hover logic helpers
    const clearHideTimeout = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };

    const startHideTimeout = () => {
      clearHideTimeout();
      hideTimeoutRef.current = setTimeout(() => {
        tl.current?.reverse(); // Hide icons (main timeline)
        gsap.delayedCall(0.1, () => { // Pause floating after hide starts
          floatingAnims.current.forEach(anim => anim.pause());
        });
        hideTimeoutRef.current = null;
      }, 300); // Delay before hiding
    };

    // Triggered on title/icon area enter
    const playAnim = () => {
      clearHideTimeout();
      tl.current?.play(); // Show icons
      floatingAnims.current.forEach(anim => anim.resume()); // Start floating
    };

    // Triggered on title/icon area leave
    const reverseAnim = () => {
      startHideTimeout(); // Start timer to hide icons
    };

    // Attach listeners
    const titleElement = headerElement.querySelector('h1');
    const iconContainerElement = headerElement.querySelector<HTMLDivElement>(
      '.language-icon-container-desktop'
    )?.parentElement;

    if (titleElement) {
      titleElement.addEventListener("mouseenter", playAnim);
      titleElement.addEventListener("mouseleave", reverseAnim);
    }
    if (iconContainerElement) {
      iconContainerElement.addEventListener("mouseenter", playAnim); // Keep icons visible when hovering them
      iconContainerElement.addEventListener("mouseleave", reverseAnim);
    }

    // Effect cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearHideTimeout();
      if (titleElement) {
        titleElement.removeEventListener("mouseenter", playAnim);
        titleElement.removeEventListener("mouseleave", reverseAnim);
      }
      if (iconContainerElement) {
        iconContainerElement.removeEventListener("mouseenter", playAnim);
        iconContainerElement.removeEventListener("mouseleave", reverseAnim);
      }
      tl.current?.kill();
      floatingAnims.current.forEach(anim => anim.kill());
      floatingAnims.current = [];
    };
  }, [isMobile, locale, languages.length]);

  const handleItemClick = (targetLocale: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${locale}`, `/${targetLocale}`);
    router.push(newPath);
  };

  const handleTitleClick = () => {
    if (isMobile) {
      setShowIconsOnMobile(prev => !prev);
    }
  }

  return (
    <div ref={headerRef} className="relative flex flex-col items-center ">
      {/* Title */}
      <motion.h1
        onClick={handleTitleClick}
        className={`text-4xl cursor-default select-none md:text-6xl font-bold mb-4 font-serif text-center ${isMobile ? 'cursor-pointer' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>

      {/* Desktop Language Icons */}
      {!isMobile && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 h-full pointer-events-auto">
          {languages.map((lang, index) => {
            const imgSrc = langImages[lang];
            if (!imgSrc) return null;
            return (
              <div
                key={lang}
                ref={(el) => { itemsRef.current[index] = el; }}
                className={`language-icon-container-desktop absolute cursor-pointer group w-[100px] h-[100px]`}
                onClick={() => handleItemClick(lang)}
                title={`Přepnout na ${lang.toUpperCase()}`}
                style={{ pointerEvents: 'auto' }}
              >
                <Image
                  src={imgSrc}
                  alt={`Jídlo reprezentující ${lang.toUpperCase()}`}
                  width={100}
                  height={100}
                  className="object-contain rounded-full group-hover:scale-110 transition-transform duration-200 "
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile Language Icons */}
      {isMobile && showIconsOnMobile && (
        <motion.div
          className="mt-4 w-full flex flex-wrap justify-center items-center gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, staggerChildren: 0.05 }}
        >
          {languages.filter(lang => lang !== locale).map((lang) => {
            const imgSrc = langImages[lang];
            if (!imgSrc) return null;
            return (
              <motion.div
                key={lang}
                className={`language-icon-container-mobile relative cursor-pointer group w-[80px] h-[80px]`}
                onClick={() => handleItemClick(lang)}
                title={`Přepnout na ${lang.toUpperCase()}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -4, 0]
                }}
                transition={{
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  y: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.3
                  }
                }}
              >
                <Image
                  src={imgSrc}
                  alt={`Jídlo reprezentující ${lang.toUpperCase()}`}
                  width={80}
                  height={80}
                  className="object-contain rounded-full shadow-md"
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Hint Text */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-xs text-gray-400 italic">
          {isMobile
            ? "Click the title to change language."
            : "Hover over the title to change language."
          }
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        className="flex items-center space-x-4 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-gray-400 hover:text-gray-100 transition-colors duration-200"
        >
          <FaInstagram size={24} />
        </a>
        <span className="text-sm text-gray-400">|</span>
        <a
          href={`mailto:${emailAddress}`}
          aria-label="Email"
          className="text-gray-400 hover:text-gray-100 transition-colors duration-200 flex items-center space-x-1"
        >
          <FaEnvelope size={24} />
          <span className="text-sm">{emailAddress}</span>
        </a>
      </motion.div>

    </div>
  );
}
