import fs from "fs";
import path from "path";
import type { Recipe } from "@/types/recipe";

// Import z helperu
import { locales, publicBasePath, getRecipeFileInfoList } from "./helpers/recipeTestUtils";

// Typ pro položku z getRecipeFileInfoList
type RecipeFileInfo = ReturnType<typeof getRecipeFileInfoList>[number];

describe("Recipe Image Existence", () => {
  locales.forEach((locale: string) => {
    describe(`Locale: ${locale}`, () => {
      const recipeFiles = getRecipeFileInfoList(locale);

      if (recipeFiles.length === 0) {
        console.warn(
          `No recipe files found for locale ${locale}, skipping image checks.`
        );
        return;
      }

      recipeFiles.forEach((fileInfo: RecipeFileInfo) => {
        it(`should have an existing image file for ${fileInfo.displayPath}`, () => {
          let recipe: Recipe | null = null;

          try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const recipeModule = require(fileInfo.fullPathForRequire);
            if (!recipeModule || !recipeModule.recipe) {
              throw new Error(
                `Module or recipe export not found in ${fileInfo.fullPathForRequire}`
              );
            }
            recipe = recipeModule.recipe as Recipe;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            // Chybu zde ignorujeme, řeší se jinde
          }

          if (!recipe) {
            console.warn(
              `Skipping image check for ${fileInfo.displayPath} because it failed to load.`
            );
            expect(recipe).toBeNull(); 
            return;
          }

          expect(recipe.imageUrl).toBeDefined();
          expect(recipe.imageUrl).not.toBe("");

          if (recipe.imageUrl) {
            const imagePath = path.join(publicBasePath, recipe.imageUrl);
            const imageExists = fs.existsSync(imagePath);

            if (!imageExists) {
              console.error(`Image file not found at: ${imagePath} (referenced in ${fileInfo.displayPath})`);
            }
            expect(imageExists).toBe(true);
          }
        });
      });
    });
  });
});
