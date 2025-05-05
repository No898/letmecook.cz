"use client";

import React, { useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

interface RecipeHeaderProps {
    title: string;
    imageUrl?: string;
    description: string;
    locale: string;
    backToRecipesTranslation: string;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ title, imageUrl, description, locale, backToRecipesTranslation }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]); // Parallax efekt

    return (
        <>
            {/* Odkaz zpět */}
            <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 text-accent hover:underline mb-8 text-sm"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                {backToRecipesTranslation}
            </Link>

            {/* Titulek */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif mb-4">
                    {title}
                </h1>
            </div>

            {/* Obrázek s Parallaxem */}
            <div
                ref={targetRef} // Ref pro sledování scrollování
                className="relative aspect-video rounded-lg overflow-hidden shadow-xl mb-12"
            >
                {imageUrl && (
                    <motion.div style={{ y }} className="absolute inset-0"> {/* Aplikace parallaxu */}
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 928px"
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                )}
            </div>

            {/* Popis */}
            <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto text-center">
                {description}
            </p>
        </>
    );
};

export default RecipeHeader; 