"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import type { Recipe } from "@/types/recipe";

// Typ pro objekt s překlady (můžeme ho zpřesnit)
interface Translations {
  [key: string]: string;
}

interface RecipeDetailClientProps {
  recipe: Recipe;
  locale: string;
  translations: Translations; // Místo t přijímáme translations
}

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
      className={`relative flex items-start gap-3 pl-10`}
    >
      <motion.div
        onClick={onCheck}
        className={`absolute -left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-colors cursor-pointer ${
          isChecked ? "bg-green-600 text-white" : "bg-accent text-white"
        }`}
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
          <motion.svg
            key="checkmark"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clipRule="evenodd"
            />
          </motion.svg>
        ) : (
          index + 1
        )}
      </motion.div>
      <div
        onClick={onCheck}
        className={`flex-grow pt-0.5 transition-opacity cursor-pointer ${
          isChecked ? "opacity-50 line-through" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </motion.li>
  );
};

export default function RecipeDetailClient({
  recipe,
  locale,
  translations, // Přijetí translations
}: RecipeDetailClientProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const handleCheck = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [procedureView, setProcedureView] = useState<
    Record<number, "detailed" | "brief">
  >({});

  const toggleProcedureView = (sectionIndex: number) => {
    setProcedureView((prev) => ({
      ...prev,
      [sectionIndex]: prev[sectionIndex] === "brief" ? "detailed" : "brief",
    }));
  };

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const handleStepCheck = (
    type: "detailed" | "brief",
    sectionIndex: number,
    stepIndex: number
  ) => {
    const key = `${type}-${sectionIndex}-${stepIndex}`;
    setCheckedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Stav a handler pro kopírování odkazu
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(""); // Stav pro URL

  useEffect(() => {
    // Nastavíme URL na straně klienta, kde je window objekt dostupný
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    if (!currentUrl) return; // Ochrana, pokud URL ještě není nastavená
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500); // Zobrazit zprávu na 2.5 sekundy
      })
      .catch((err) => {
        console.error("Nepodařilo se zkopírovat odkaz: ", err);
      });
  };

  return (
    <motion.article
      className="max-w-5xl mx-auto px-4 pt-10 pb-24 sm:px-6 lg:px-8 lg:pt-16 lg:pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 text-accent hover:underline mb-8 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        {translations.back_to_recipes}
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif mb-4">
          {recipe.title}
        </h1>
      </div>

      <div
        ref={targetRef}
        className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
      >
        {recipe.imageUrl && (
          <motion.div style={{ y }} className="absolute inset-0">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              sizes="(max-width: 1024px) 100vw, 928px"
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </div>

      <p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto text-center">
        {recipe.description}
      </p>

      {/* Ikonky pro sdílení a kopírování */}
      <div className="flex justify-center items-center space-x-4 mb-12">
        <span className="text-sm text-gray-400">
          {translations.share_label}
        </span>
        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          title={translations.share_on_facebook}
          className="text-gray-400 hover:text-accent transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        </a>
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            recipe.title + " " + currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          title={translations.share_on_whatsapp}
          className="text-gray-400 hover:text-accent transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.788-1.48l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            currentUrl
          )}&text=${encodeURIComponent(recipe.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          title={translations.share_on_x}
          className="text-gray-400 hover:text-accent transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
          </svg>
        </a>
        {/* Email */}
        <a
          href={`mailto:?subject=${encodeURIComponent(
            recipe.title
          )}&body=${encodeURIComponent(
            translations.check_out_recipe + currentUrl
          )}`}
          title={translations.share_via_email}
          className="text-gray-400 hover:text-accent transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
        </a>
        {/* Kopírovat odkaz */}
        <button
          onClick={handleCopyLink}
          title={translations.copy_link}
          className="text-gray-400 hover:text-accent transition-colors duration-150 relative"
          aria-live="polite"
        >
          {isCopied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-5 h-5 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
          )}
          {isCopied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-75">
              {translations.copied_tooltip}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-12">
        <div className="lg:col-span-1 space-y-8">
          {recipe.ingredients.map((section, sectionIndex) => (
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
                  const key = `${sectionIndex}-${itemIndex}`;
                  const isChecked = checkedItems[key];
                  return (
                    <ListItem key={key} delay={itemIndex * 0.05}>
                      <motion.div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 mt-0.5 ${
                          isChecked
                            ? "bg-accent border-accent"
                            : "border-gray-600 hover:border-accent"
                        }`}
                        onClick={() => handleCheck(sectionIndex, itemIndex)}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatePresence>
                          {isChecked && (
                            <motion.svg
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 90 }}
                              transition={{ duration: 0.2 }}
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <span
                        className={`transition-opacity cursor-pointer ${
                          isChecked ? "opacity-50 line-through" : "opacity-100"
                        }`}
                        onClick={() => handleCheck(sectionIndex, itemIndex)}
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

        <div className="lg:col-span-2 space-y-12">
          {recipe.procedure.map((section, sectionIndex) => {
            const currentView = procedureView[sectionIndex] ?? "detailed";
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
                        onClick={() => toggleProcedureView(sectionIndex)}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          currentView === "detailed"
                            ? "bg-accent text-white"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        {translations.detailed}
                      </button>
                      <button
                        onClick={() => toggleProcedureView(sectionIndex)}
                        className={`px-3 py-1 rounded-full transition-colors ${
                          currentView === "brief"
                            ? "bg-accent text-white"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        {translations.brief}
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
                          const stepKey = `detailed-${sectionIndex}-${stepIndex}`;
                          const isStepChecked = checkedSteps[stepKey];
                          return (
                            <StepItem
                              key={stepKey}
                              index={stepIndex}
                              isChecked={isStepChecked}
                              onCheck={() =>
                                handleStepCheck(
                                  "detailed",
                                  sectionIndex,
                                  stepIndex
                                )
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
                          const stepKey = `brief-${sectionIndex}-${stepIndex}`;
                          const isStepChecked = checkedSteps[stepKey];
                          return (
                            <StepItem
                              key={stepKey}
                              index={stepIndex}
                              isChecked={isStepChecked}
                              onCheck={() =>
                                handleStepCheck(
                                  "brief",
                                  sectionIndex,
                                  stepIndex
                                )
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
                      className="w-full h-full absolute top-0 left-0 object-cover"
                    >
                      {translations.video_fallback}
                    </video>
                  </motion.div>
                )}
              </motion.section>
            );
          })}

          {recipe.tips && (
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-semibold font-serif mb-6">
                {recipe.tips.sectionTitle}
              </h3>
              <div className="space-y-5">
                {recipe.tips.items.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-accent/20 border-l-4 border-accent p-5 rounded-r-lg transition-transform duration-200"
                  >
                    <h4 className="font-semibold text-lg mb-2 text-gray-100">
                      {tip.title}
                    </h4>
                    <p className="text-gray-300">{tip.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {recipe.serving && (
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-semibold font-serif mb-6">
                {recipe.serving.sectionTitle}
              </h3>
              <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
                {recipe.serving.suggestions.map((suggestion, index) => (
                  <p key={index}>{suggestion}</p>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </motion.article>
  );
}
