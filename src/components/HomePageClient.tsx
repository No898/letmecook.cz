"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Recipe } from "@/types/recipe";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface HomePageClientProps {
  recipes: Recipe[];
  locale: string;
}

const countryFlags: { [key: string]: string } = {
  vi: "/images/vietnamese flag.webp",
  cz: "/images/czech flag.webp",
  gb: "/images/uk flag.webp",
};

interface FlagListeners {
  showFlag: () => void;
  hideFlag: () => void;
}
declare global {
  interface HTMLElement {
    __flagListeners?: FlagListeners;
  }
}

export default function HomePageClient({
  recipes,
  locale,
}: HomePageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      return;
    }

    const cards =
      containerRef.current?.querySelectorAll<HTMLDivElement>(".recipe-card");
    if (!cards) return;

    const animations: gsap.core.Tween[] = [];

    cards.forEach((card) => {
      const flag = card.querySelector<HTMLDivElement>(".origin-flag");
      if (!flag) return;

      gsap.set(flag, {
        opacity: 0,
        scale: 0.8,
        x: "-100%",
        y: "-20%",
        rotation: -45,
        transformOrigin: "bottom right",
      });

      const showTween = gsap.to(flag, {
        paused: true,
        opacity: 1,
        scale: 1,
        x: "0%",
        y: "0%",
        rotation: 0,
        duration: 0.4,
        ease: "power3.out",
      });

      const hideTween = gsap.to(flag, {
        paused: true,
        opacity: 0,
        scale: 0.8,
        x: "-100%",
        y: "-20%",
        rotation: -45,
        duration: 0.3,
        ease: "power2.in",
      });

      animations.push(showTween, hideTween);

      const showFlag = () => {
        hideTween.pause();
        showTween.restart();
      };
      const hideFlag = () => {
        showTween.pause();
        hideTween.restart();
      };

      card.addEventListener("mouseenter", showFlag);
      card.addEventListener("mouseleave", hideFlag);

      card.__flagListeners = { showFlag, hideFlag };
    });

    return () => {
      cards?.forEach((card) => {
        const listeners = card.__flagListeners;
        if (listeners) {
          card.removeEventListener("mouseenter", listeners.showFlag);
          card.removeEventListener("mouseleave", listeners.hideFlag);
          delete card.__flagListeners;
        }
      });
      animations.forEach((anim) => anim.kill());
    };
  }, [recipes]);

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {recipes.map((recipe, index) => {
        const flagSrc = recipe.originCountryCode
          ? countryFlags[recipe.originCountryCode]
          : null;
        return (
          <motion.div
            key={recipe.id}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="recipe-card relative z-0 block bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group"
          >
            <Link href={`/${locale}/recept/${recipe.id}`} className="block">
              {recipe.imageUrl && (
                <div className="aspect-video relative overflow-hidden group">
                  {flagSrc && (
                    <div className="origin-flag absolute bottom-0 left-1 z-10 w-16 h-16 md:w-20 md:h-20 pointer-events-none">
                      <Image
                        src={flagSrc}
                        alt={`Vlajka ${recipe.originCountryCode}`}
                        fill
                        sizes="80px"
                        className="object-contain rounded-sm"
                      />
                    </div>
                  )}
                  <Image
                    src={recipe.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={index < 3}
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl lg:text-2xl font-semibold font-serif mb-2 group-hover:text-accent transition-colors duration-200">
                  {recipe.title}
                </h2>

                <p className="text-sm text-gray-300 line-clamp-3 hidden md:block">
                  {recipe.description}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
