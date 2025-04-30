'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Recipe } from "@/types/recipe"; // Aktualizovaný import

interface HomePageClientProps {
    recipes: Recipe[];
    locale: string;
}

export default function HomePageClient({ recipes, locale }: HomePageClientProps) {
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

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {recipes.map((recipe, index) => (
                <motion.div
                    key={recipe.id}
                    variants={itemVariants}
                    whileHover={{
                        scale: 1.03,
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="block bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg overflow-hidden cursor-pointer group"
                >
                    {/* Link nyní obsahuje locale */}
                    <Link href={`/${locale}/recept/${recipe.id}`} className="block">
                        {recipe.imageUrl && (
                            <div className="aspect-video relative overflow-hidden">
                                <Image
                                    src={recipe.imageUrl}
                                    alt={recipe.title} // Zvážit předání přeloženého alt textu
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    priority={index < 3} // Priorita pro LCP
                                />
                            </div>
                        )}
                        <div className="p-5">
                            <h2 className="text-xl lg:text-2xl font-semibold font-serif mb-2 group-hover:text-accent transition-colors duration-200">
                                {recipe.title}
                            </h2>
                            {recipe.vietnameseTitle && (
                                <h3 className="text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-3">
                                    {recipe.vietnameseTitle}
                                </h3>
                            )}
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                {recipe.description}
                            </p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
} 