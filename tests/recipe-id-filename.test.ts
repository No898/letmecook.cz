import fs from "fs";
import path from "path";
import type { Recipe } from "@/types/recipe";

// ----- Sdílená logika (opět, může být refaktorována) -----
const recipesBasePath = path.join(__dirname, "..", "src", "data", "recipes");
const locales = ["cs", "en", "vi", "zh-TW"];

const getRecipeFilesInfo = (
  locale: string
): { basename: string; fullPath: string }[] => {
  const localeDir = path.join(recipesBasePath, locale);
  try {
    const files = fs.readdirSync(localeDir);
    return files
      .filter((file) => file.endsWith(".ts"))
      .map((file) => ({
        basename: file.replace(".ts", ""), // Název bez .ts
        fullPath: `@/data/recipes/${locale}/${file.replace(".ts", "")}`, // Cesta pro require/import
      }));
  } catch (error) {
    console.error(`Error reading directory ${localeDir}:`, error);
    return [];
  }
};
// ------------------------------------------------------

describe("Recipe ID and Filename Consistency", () => {
  locales.forEach((locale) => {
    describe(`Locale: ${locale}`, () => {
      const recipeFiles = getRecipeFilesInfo(locale);

      if (recipeFiles.length === 0) {
        console.warn(
          `No recipe files found for locale ${locale}, skipping ID checks.`
        );
        // Můžeme přidat i test, který selže, pokud nejsou žádné soubory?
        // it('should contain recipe files', () => expect(recipeFiles.length).toBeGreaterThan(0));
        return;
      }

      recipeFiles.forEach((fileInfo) => {
        it(`should have matching ID and filename for ${fileInfo.basename}`, () => {
          let recipe: Recipe | null = null;
          let loadError: any = null;

          try {
            // Použijeme cestu vytvořenou v getRecipeFilesInfo
            const module = require(fileInfo.fullPath);
            if (!module || !module.recipe) {
              throw new Error(
                `Module or recipe export not found in ${fileInfo.fullPath}`
              );
            }
            recipe = module.recipe as Recipe;
          } catch (error) {
            loadError = error;
            console.error(
              `Error loading recipe ${locale}/${fileInfo.basename}:`,
              error
            );
          }

          // Nejdříve zkontrolujeme, zda se recept vůbec podařilo načíst
          expect(recipe).not.toBeNull();
          if (!recipe) {
            console.error(
              `Recipe ${locale}/${fileInfo.basename} failed to load. Error:`,
              loadError
            );
          }

          // Pokud se načetl, porovnáme ID s názvem souboru
          if (recipe) {
            expect(recipe.id).toBe(fileInfo.basename);
          }
        });
      });
    });
  });
});
