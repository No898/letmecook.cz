
import type { Recipe } from "@/types/recipe";

import { locales, referenceLocale, getRecipeBasenames } from "./helpers/recipeTestUtils";

const recipeBasenames = getRecipeBasenames(referenceLocale);

describe("Recipe Data Consistency Across Locales", () => {
  // Typování parametru
  recipeBasenames.forEach((basename: string) => {
    describe(`Recipe: ${basename}`, () => {
      let recipesByLocale: Record<string, Recipe | null> = {};
      let loadErrors: Record<string, Error | unknown> = {}; 

      beforeAll(async () => {
        recipesByLocale = {};
        loadErrors = {};
        // Typování parametru
        for (const locale of locales) {
          try {
            const recipePath = `@/data/recipes/${locale}/${basename}`;
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const recipeModule = require(recipePath);
            if (!recipeModule || !recipeModule.recipe) {
              throw new Error(
                `Module or recipe export not found in ${recipePath}`
              );
            }
            recipesByLocale[locale] = recipeModule.recipe as Recipe;
          } catch (error) {
            recipesByLocale[locale] = null;
            loadErrors[locale] = error;
            // Logování zde není nutné, řeší se v 'it' bloku
          }
        }
      });

      it("should load successfully for all locales", () => {
        // Typování parametru
        locales.forEach((locale: string) => {
          if (!recipesByLocale[locale]) {
            const error = loadErrors[locale];
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(
              `Recipe ${locale}/${basename} failed to load. Error: ${errorMessage}`
            );
          }
          expect(recipesByLocale[locale]).not.toBeNull();
        });
      });

      // ... zbytek testu (fieldsToCompare, etc.) ...
      // Vnitřní forEach také potřebují typování pro locale
      const fieldsToCompare: (keyof Recipe)[] = [
        "id",
        "imageUrl",
        "authorName",
        "datePublished",
        "prepTime",
        "cookTime",
        "totalTime",
      ];

      fieldsToCompare.forEach((field) => {
        it(`should have consistent '${String(field)}' across all locales`, () => {
          const referenceRecipe = recipesByLocale[referenceLocale];

          if (!referenceRecipe) {
            // Warning se vypíše, pokud referenční selže, test projde
            console.warn(
              `Skipping field consistency check for ${basename} because reference recipe (${referenceLocale}) failed to load.`
            );
            return;
          }
          const referenceValue = referenceRecipe[field];

          locales
            .filter((l: string) => l !== referenceLocale) // Typ pro l
            .forEach((locale: string) => { // Typ pro locale
              const currentRecipe = recipesByLocale[locale];
              if (!currentRecipe) {
                // Pokud selže načtení jiné locale, jen varujeme a pokračujeme
                console.warn(
                  `Skipping field consistency check for ${basename} - locale ${locale} failed to load.`
                );
                return;
              }
              expect(currentRecipe[field]).toEqual(referenceValue);
            });
        });
      });

    });
  });
});
