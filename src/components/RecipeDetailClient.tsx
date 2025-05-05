"use client";

import { useState } from "react";
import {
  motion,
} from "framer-motion";
import type { Recipe } from "@/types/recipe";

import ShareButtons from "./ShareButtons";
import IngredientSection from "./IngredientSection";
import ProcedureSection from "./ProcedureSection";
import TipsSection from "./TipsSection";
import ServingSection from "./ServingSection";
import RecipeHeader from "./RecipeHeader";

// Definice typů pro stavy
type CheckedItemsState = Record<number, Record<number, boolean>>;
type CheckedStepsState = Record<
  number, // sectionIndex
  {
    detailed: Record<number, boolean>
    brief: Record<number, boolean>;
  }
>;

interface Translations {
  [key: string]: string;
}

interface RecipeDetailClientProps {
  recipe: Recipe;
  locale: string;
  translations: Translations;
}

export default function RecipeDetailClient({
  recipe,
  locale,
  translations,
}: RecipeDetailClientProps) {
  const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});
  const handleCheck = (sectionIndex: number, itemIndex: number) => {
    setCheckedItems((prev) => {
      const newSectionState = { ...(prev[sectionIndex] || {}) };
      newSectionState[itemIndex] = !newSectionState[itemIndex];
      return {
        ...prev,
        [sectionIndex]: newSectionState,
      };
    });
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

  const [checkedSteps, setCheckedSteps] = useState<CheckedStepsState>({});
  const handleStepCheck = (
    type: "detailed" | "brief",
    sectionIndex: number,
    stepIndex: number
  ) => {
    setCheckedSteps((prev) => {
      const currentSectionSteps = prev[sectionIndex] || { detailed: {}, brief: {} };
      const currentTypeSteps = currentSectionSteps[type] || {};

      const newTypeSteps = {
        ...currentTypeSteps,
        [stepIndex]: !currentTypeSteps[stepIndex],
      };

      const newSectionState = {
        ...currentSectionSteps,
        [type]: newTypeSteps,
      };

      return {
        ...prev,
        [sectionIndex]: newSectionState,
      };
    });
  };

  return (
    <motion.article
      className="max-w-5xl mx-auto px-4 pt-10 pb-24 sm:px-6 lg:px-8 lg:pt-16 lg:pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <RecipeHeader
        title={recipe.title}
        imageUrl={recipe.imageUrl}
        description={recipe.description}
        locale={locale}
        backToRecipesTranslation={translations.back_to_recipes}
      />

      <ShareButtons
        recipeTitle={recipe.title}
        translations={{
          share_label: translations.share_label,
          share_on_facebook: translations.share_on_facebook,
          share_on_whatsapp: translations.share_on_whatsapp,
          share_on_x: translations.share_on_x,
          share_via_email: translations.share_via_email,
          check_out_recipe: translations.check_out_recipe,
          copy_link: translations.copy_link,
          copied_tooltip: translations.copied_tooltip,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-12">
        <IngredientSection
          sections={recipe.ingredients}
          checkedItems={checkedItems}
          onCheckItem={handleCheck}
        />

        <ProcedureSection
          sections={recipe.procedure}
          checkedSteps={checkedSteps}
          onCheckStep={handleStepCheck}
          procedureView={procedureView}
          onToggleView={toggleProcedureView}
          translations={{
            detailed_view: translations.detailed_view,
            brief_view: translations.brief_view,
            video_fallback: translations.video_fallback,
          }}
          imageUrl={recipe.imageUrl}
        />

        <div className="lg:col-span-2 space-y-12 lg:col-start-2">
          {recipe.tips && <TipsSection tips={recipe.tips} />}

          {recipe.serving && <ServingSection serving={recipe.serving} />}
        </div>
      </div>
    </motion.article>
  );
}
