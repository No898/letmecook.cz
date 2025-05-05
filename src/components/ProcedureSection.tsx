"use client";

import React from 'react';
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import clsx from "clsx";
import type { RecipeProcedureSection } from "@/types/recipe";
import SimpleCheckIcon from "./icons/SimpleCheckIcon";

type CheckedStepsState = Record<
    number, // sectionIndex
    {
        detailed: Record<number, boolean>;
        brief: Record<number, boolean>;
    }
>;

type ProcedureViewState = Record<number, "detailed" | "brief">;

const StepItem = ({
    children,
    index,
    isChecked,
    onCheck,
}: {
    children: React.ReactNode;
    index: number;
    isChecked?: boolean;
    onCheck?: () => void;
}) => {
    return (
        <motion.li
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="relative flex items-start gap-3 pl-10"
        >
            <motion.div
                onClick={onCheck}
                className={clsx(
                    "absolute -left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors cursor-pointer",
                    {
                        "bg-green-600 text-white": isChecked,
                        "bg-accent text-white": !isChecked
                    }
                )}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: index * 0.08 + 0.1,
                }}
                whileTap={{ scale: 0.9 }}
            >
                {isChecked ? (
                    <motion.div
                        key="checkmark"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SimpleCheckIcon className="w-5 h-5" />
                    </motion.div>
                ) : (
                    index + 1
                )}
            </motion.div>
            <div
                onClick={onCheck}
                className={clsx(
                    "flex-grow pt-0.5 transition-opacity cursor-pointer",
                    {
                        "opacity-50 line-through": isChecked,
                        "opacity-100": !isChecked
                    }
                )}
            >
                {children}
            </div>
        </motion.li>
    );
};

interface ProcedureSectionProps {
    sections: RecipeProcedureSection[];
    checkedSteps: CheckedStepsState;
    onCheckStep: (type: "detailed" | "brief", sectionIndex: number, stepIndex: number) => void;
    procedureView: ProcedureViewState;
    onToggleView: (sectionIndex: number) => void;
    translations: {
        detailed_view: string;
        brief_view: string;
        video_fallback: string;
    };
    imageUrl?: string;
}

const ProcedureSection: React.FC<ProcedureSectionProps> = ({ sections, checkedSteps, onCheckStep, procedureView, onToggleView, translations, imageUrl }) => {
    return (
        <div className="lg:col-span-2 space-y-12">
            {sections.map((section, sectionIndex) => {
                const currentView = procedureView[sectionIndex] ?? (section.briefSteps && section.briefSteps.length > 0 ? 'detailed' : 'detailed');
                const hasBriefSteps =
                    section.briefSteps && section.briefSteps.length > 0;

                return (
                    <motion.section
                        key={`proc-${sectionIndex}`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: sectionIndex * 0.15 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-3xl font-semibold font-serif">
                                {section.sectionTitle}
                            </h3>
                            {hasBriefSteps && (
                                <div className="flex space-x-1 border border-gray-600 rounded-full p-0.5 text-sm">
                                    <button
                                        onClick={() => onToggleView(sectionIndex)} // Použití předaného handleru
                                        className={clsx(
                                            "px-3 py-1 rounded-full transition-colors",
                                            {
                                                "bg-accent text-white": currentView === "detailed",
                                                "hover:bg-gray-700 text-gray-300": currentView !== "detailed"
                                            }
                                        )}
                                        aria-pressed={currentView === 'detailed'} // Přístupnost
                                    >
                                        {translations.detailed_view || "Detailed"}
                                    </button>
                                    <button
                                        onClick={() => onToggleView(sectionIndex)} // Použití předaného handleru
                                        className={clsx(
                                            "px-3 py-1 rounded-full transition-colors",
                                            {
                                                "bg-accent text-white": currentView === "brief",
                                                "hover:bg-gray-700 text-gray-300": currentView !== "brief"
                                            }
                                        )}
                                        aria-pressed={currentView === 'brief'} // Přístupnost
                                    >
                                        {translations.brief_view || "Brief"}
                                    </button>
                                </div>
                            )}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentView}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                {currentView === "detailed" && (
                                    <ol className="list-none space-y-8 pt-2 pb-2 pl-1">
                                        {section.steps.map((step, stepIndex) => {
                                            const isStepChecked = checkedSteps[sectionIndex]?.detailed?.[stepIndex] ?? false;
                                            const stepKey = `detailed-${sectionIndex}-${stepIndex}`;
                                            return (
                                                <StepItem
                                                    key={stepKey}
                                                    index={stepIndex}
                                                    isChecked={isStepChecked}
                                                    onCheck={() =>
                                                        onCheckStep("detailed", sectionIndex, stepIndex) // Použití předaného handleru
                                                    }
                                                >
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {step}
                                                    </p>
                                                </StepItem>
                                            );
                                        })}
                                    </ol>
                                )}
                                {currentView === "brief" && section.briefSteps && (
                                    <ol className="list-none space-y-4 pt-2 pb-2 pl-1">
                                        {section.briefSteps.map((step, stepIndex) => {
                                            const isStepChecked = checkedSteps[sectionIndex]?.brief?.[stepIndex] ?? false;
                                            const stepKey = `brief-${sectionIndex}-${stepIndex}`;
                                            return (
                                                <StepItem
                                                    key={stepKey}
                                                    index={stepIndex}
                                                    isChecked={isStepChecked}
                                                    onCheck={() =>
                                                        onCheckStep("brief", sectionIndex, stepIndex) // Použití předaného handleru
                                                    }
                                                >
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {step}
                                                    </p>
                                                </StepItem>
                                            );
                                        })}
                                    </ol>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {section.videoUrl && (
                            <motion.div
                                className="mt-8 aspect-video relative rounded-lg overflow-hidden shadow-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <video
                                    controls
                                    src={section.videoUrl}
                                    className="w-full h-full absolute top-0 left-0 object-cover bg-black"
                                    poster={imageUrl}
                                >
                                    {translations.video_fallback || "Your browser does not support the video tag."}
                                </video>
                            </motion.div>
                        )}
                    </motion.section>
                );
            })}
        </div>
    );
};

export default ProcedureSection; 