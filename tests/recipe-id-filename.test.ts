
import type { Recipe } from "@/types/recipe";
import { locales, getRecipeFileInfoList } from "./helpers/recipeTestUtils";

type RecipeFileInfo = ReturnType<typeof getRecipeFileInfoList>[number];

describe("Recipe ID and Filename Consistency", () => {
  locales.forEach((locale: string) => {
    describe(`Locale: ${locale}`, () => {
      const recipeFiles = getRecipeFileInfoList(locale);

      if (recipeFiles.length === 0) {
        console.warn(
          `No recipe files found for locale ${locale}, skipping ID checks.`
        );
        return;
      }

      recipeFiles.forEach((fileInfo: RecipeFileInfo) => {
        it(`should have matching ID and filename for ${fileInfo.basename}`, () => {
          let recipe: Recipe | null = null;
          let loadError: Error | unknown | null = null;

          try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const recipeModule = require(fileInfo.fullPathForRequire);
            if (!recipeModule || !recipeModule.recipe) {
              throw new Error(
                `Module or recipe export not found in ${fileInfo.fullPathForRequire}`
              );
            }
            recipe = recipeModule.recipe as Recipe;
          } catch (error) {
            loadError = error;
          }

          if (!recipe) {
            const errorMessage = loadError instanceof Error ? loadError.message : String(loadError);
            console.error(
              `Recipe ${locale}/${fileInfo.basename} failed to load. Error: ${errorMessage}`
            );
          }
          expect(recipe).not.toBeNull();

          if (recipe) {
            expect(recipe.id).toBe(fileInfo.basename);
          }
        });
      });
    });
  });
});
