"use client";

import React from 'react';
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import clsx from "clsx";
import type { RecipeIngredientSection } from "@/types/recipe";
import CheckIcon from "./icons/CheckIcon";


type CheckedItemsState = Record<number, Record<number, boolean>>;

const ListItem = ({
    children,
    delay,
}: {
    children: React.ReactNode;
    delay: number;
}) => (
    <motion.li
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3, delay }}
        className="flex items-start gap-2"
    >
        {children}
    </motion.li>
);

interface IngredientSectionProps {
    sections: RecipeIngredientSection[];
    checkedItems: CheckedItemsState;
    onCheckItem: (sectionIndex: number, itemIndex: number) => void;
}

const IngredientSection: React.FC<IngredientSectionProps> = ({ sections, checkedItems, onCheckItem }) => {
    return (
        <div className="lg:col-span-1 space-y-8">
            {sections.map((section, sectionIndex) => (
                <motion.section
                    key={`ing-${sectionIndex}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
                >
                    <h3 className="text-2xl font-semibold font-serif mb-4 border-b-2 border-accent pb-2">
                        {section.sectionTitle}
                    </h3>
                    {section.servings && (
                        <p className="text-sm text-gray-400 mb-4 italic">
                            {section.servings}
                        </p>
                    )}
                    <ul className="list-none space-y-3 text-gray-300">
                        {section.items.map((item, itemIndex) => {
                            const isChecked = checkedItems[sectionIndex]?.[itemIndex] ?? false;
                            const key = `ing-${sectionIndex}-${itemIndex}`;
                            return (
                                <ListItem key={key} delay={itemIndex * 0.05}>
                                    <motion.div
                                        className={clsx(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 mt-0.5",
                                            {
                                                "bg-accent border-accent": isChecked,
                                                "border-gray-600 hover:border-accent": !isChecked
                                            }
                                        )}
                                        onClick={() => onCheckItem(sectionIndex, itemIndex)} 
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <AnimatePresence>
                                            {isChecked && (
                                                <motion.div
                                                    key="checkmark-ingredient"
                                                    initial={{ scale: 0, rotate: -90 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 90 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <CheckIcon className="w-3 h-3 text-white" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                    <span
                                        className={clsx(
                                            "transition-opacity cursor-pointer",
                                            {
                                                "opacity-50 line-through": isChecked,
                                                "opacity-100": !isChecked
                                            }
                                        )}
                                        onClick={() => onCheckItem(sectionIndex, itemIndex)} 
                                    >
                                        {item}
                                    </span>
                                </ListItem>
                            );
                        })}
                    </ul>
                </motion.section>
            ))}
        </div>
    );
};

export default IngredientSection; 