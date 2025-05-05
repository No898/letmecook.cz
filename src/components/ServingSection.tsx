"use client";

import React from 'react';
import { motion } from "framer-motion";
import type { Recipe } from "@/types/recipe";

interface ServingSectionProps {
    serving: NonNullable<Recipe['serving']>;
}

const ServingSection: React.FC<ServingSectionProps> = ({ serving }) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-3xl font-semibold font-serif mb-6">
                {serving.sectionTitle}
            </h3>
            <div className="prose prose-invert max-w-none text-gray-300 lg:prose-lg">
                {serving.suggestions.map((suggestion: string, index: number) => (
                    <p key={`serving-${index}`}>{suggestion}</p>
                ))}
            </div>
        </motion.section>
    );
};

export default ServingSection; 