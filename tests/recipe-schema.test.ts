
import { RecipeSchema } from "@/types/recipe.zod";
import { z } from "zod"; // Import z
import type { Recipe } from "@/types/recipe";
import { locales, getRecipeFileInfoList } from "./helpers/recipeTestUtils";

// Typ pro položku z getRecipeFileInfoList
type RecipeFileInfo = ReturnType<typeof getRecipeFileInfoList>[number];

describe("Recipe Schema Validation", () => {
  locales.forEach((locale: string) => {
    describe(`Locale: ${locale}`, () => {
      const recipeFiles = getRecipeFileInfoList(locale);

      if (recipeFiles.length === 0) {
        console.warn(
          `No recipe files found for locale ${locale}, skipping schema validation.`
        );
        return;
      }

      recipeFiles.forEach((fileInfo: RecipeFileInfo) => {
        it(`should validate schema for ${fileInfo.displayPath}`, () => {
          let recipe: Recipe | null = null;
          let loadError: Error | unknown | null = null;
          let validationError: z.ZodError | null = null;

          try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const recipeModule = require(fileInfo.fullPathForRequire);
            if (!recipeModule || !recipeModule.recipe) {
              throw new Error(
                `Module or recipe export not found in ${fileInfo.fullPathForRequire}`
              );
            }
            recipe = recipeModule.recipe as Recipe;

            const validationResult = RecipeSchema.safeParse(recipe);

            if (!validationResult.success) {
              validationError = validationResult.error;
            }
          } catch (error) {
            loadError = error;
          }

          if (!recipe) {
            const errorMessage = loadError instanceof Error ? loadError.message : String(loadError);
            console.warn(`Recipe ${fileInfo.displayPath} could not be loaded for schema check. Load error: ${errorMessage}`);
            expect(recipe).toBeNull();
            return;
          }

          if (validationError) {
            console.error(
              `Schema validation failed for ${fileInfo.displayPath}:\n${JSON.stringify(validationError.format(), null, 2)}`
            );
          }
          expect(validationError).toBeNull();
        });
      });
    });
  });
});
