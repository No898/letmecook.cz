"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Recipe } from "@/types/recipe";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

interface RecipeCarouselProps {
  recipes: Recipe[];
  locale: string;
}

export default function RecipeCarousel({
  recipes,
  locale,
}: RecipeCarouselProps) {
  if (!recipes || recipes.length === 0) {
    return null; // Nezobrazovat nic, pokud nejsou recepty
  }

  return (
    <div className="w-full max-w-7xl px-4">
      {" "}
      {/* Obal pro šířku a padding */}
      <Swiper
        modules={[Navigation, Pagination]} // Přidání modulů
        spaceBetween={30} // Mezera mezi slidy
        slidesPerView={1} // Kolik slidů vidět na mobilu
        navigation // Povolit navigační šipky
        pagination={{ clickable: true }} // Povolit klikatelné tečky
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        className="recipe-carousel" // Vlastní třída pro případné stylování
      >
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.id}>
            {/* Karta receptu - zjednodušená verze z HomePageClient */}
            <Link
              href={`/${locale}/recept/${recipe.id}`}
              className="block bg-gray-800 rounded-xl shadow-lg overflow-hidden group h-full flex flex-col"
            >
              {recipe.imageUrl && (
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-xl lg:text-2xl font-semibold font-serif mb-2 group-hover:text-accent transition-colors duration-200">
                  {recipe.title}
                </h2>
                {recipe.nationalTitle && (
                  <h3 className="text-base lg:text-lg text-gray-400 mb-3">
                    {recipe.nationalTitle}
                  </h3>
                )}
                <p className="text-sm text-gray-300 line-clamp-3 flex-grow">
                  {recipe.description}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Dodatečné styly pro šipky Swiperu, pokud je potřeba */}
      <style jsx global>{`
        .recipe-carousel .swiper-button-next,
        .recipe-carousel .swiper-button-prev {
          color: var(--foreground); /* Použita CSS proměnná pro barvu šipek */
        }
        .recipe-carousel .swiper-pagination-bullet-active {
          background-color: var(
            --accent
          ); /* Použita CSS proměnná pro aktivní tečku */
        }
      `}</style>
    </div>
  );
}
