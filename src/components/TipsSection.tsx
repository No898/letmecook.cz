"use client";

import React from 'react';
import { motion } from "framer-motion";
import type { Recipe, RecipeTip } from "@/types/recipe";

interface TipsSectionProps {
    tips: NonNullable<Recipe['tips']>;
}

const TipsSection: React.FC<TipsSectionProps> = ({ tips }) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-3xl font-semibold font-serif mb-6">
                {tips.sectionTitle}
            </h3>
            <div className="space-y-5">
                {tips.items.map((tip: RecipeTip, index: number) => (
                    <motion.div
                        key={`tip-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-accent/20 border-l-4 border-accent p-5 rounded-r-lg"
                    >
                        <h4 className="font-semibold text-lg mb-2 text-gray-100">
                            {tip.title}
                        </h4>
                        <p className="text-gray-300">{tip.text}</p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default TipsSection; 