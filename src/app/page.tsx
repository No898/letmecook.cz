"use client";

import { recipes } from "@/data/recipesData";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center px-6 py-16 md:px-12 md:py-24">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-16 font-serif text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Moje Recepty
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg overflow-hidden cursor-pointer"
          >
            <Link href={`/recept/${recipe.id}`} className="block">
              {recipe.imageUrl && (
                <div className="aspect-video relative">
                  <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-xl lg:text-2xl font-semibold font-serif mb-2 group-hover:text-accent transition-colors duration-200">{recipe.title}</h2>
                {recipe.vietnameseTitle && (
                  <h3 className="text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-3">{recipe.vietnameseTitle}</h3>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{recipe.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
