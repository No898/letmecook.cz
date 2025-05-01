import fs from "fs";
import path from "path";
import { RecipeSchema } from "@/types/recipe.zod"; // Importujeme Zod schéma
import type { Recipe } from "@/types/recipe"; // Importujeme TS typ pro typování

// ----- Sdílená logika (opět, může být refaktorována) -----
const recipesBasePath = path.join(__dirname, "..", "src", "data", "recipes");
const locales = ["cs", "en", "vi", "zh-TW"];

const getRecipeFilesInfo = (
  locale: string
): { basename: string; fullPathForRequire: string; displayPath: string }[] => {
  const localeDir = path.join(recipesBasePath, locale);
  try {
    const files = fs.readdirSync(localeDir);
    return files
      .filter((file) => file.endsWith(".ts"))
      .map((file) => {
        const basename = file.replace(".ts", "");
        return {
          basename: basename,
          // Cesta pro require (relativní k projektu)
          fullPathForRequire: `@/data/recipes/${locale}/${basename}`,
          // Cesta pro zobrazení v názvu testu
          displayPath: `src/data/recipes/${locale}/${file}`,
        };
      });
  } catch (error) {
    console.error(`Error reading directory ${localeDir}:`, error);
    return [];
  }
};
// ------------------------------------------------------

describe("Recipe Schema Validation", () => {
  locales.forEach((locale) => {
    describe(`Locale: ${locale}`, () => {
      const recipeFiles = getRecipeFilesInfo(locale);

      if (recipeFiles.length === 0) {
        console.warn(
          `No recipe files found for locale ${locale}, skipping schema validation.`
        );
        return;
      }

      recipeFiles.forEach((fileInfo) => {
        it(`should validate schema for ${fileInfo.displayPath}`, () => {
          let recipe: Recipe | null = null;
          let loadError: any = null;
          let validationError: any = null;

          try {
            const module = require(fileInfo.fullPathForRequire);
            if (!module || !module.recipe) {
              throw new Error(
                `Module or recipe export not found in ${fileInfo.fullPathForRequire}`
              );
            }
            recipe = module.recipe as Recipe;

            // Pokus o validaci pomocí Zod schématu
            // safeParse vrátí výsledek s daty nebo chybou, aniž by vyhodilo výjimku
            const validationResult = RecipeSchema.safeParse(recipe);

            if (!validationResult.success) {
              // Pokud validace selhala, uložíme chybu pro výpis v expect
              validationError = validationResult.error;
            }
          } catch (error) {
            loadError = error;
            console.error(
              `Error loading or processing recipe ${fileInfo.displayPath}:`,
              error
            );
          }

          // 1. Zkontrolujeme, zda se recept podařilo načíst
          expect(recipe).not.toBeNull();
          if (!recipe) {
            console.error(
              `Recipe ${fileInfo.displayPath} failed to load. Error:`,
              loadError
            );
          }

          // 2. Zkontrolujeme, zda prošla validace schématu (pokud se recept načetl)
          if (recipe) {
            // Opraveno: expect má jen jeden argument.
            // Pokud validationError není null, test selže a Jest vypíše chybu.
            expect(validationError).toBeNull();
            // Případně můžeme přidat manuální log pro detailnější info PŘED selháním expectu
            if (validationError) {
              console.error(
                `Schema validation failed for ${
                  fileInfo.displayPath
                }:\n${JSON.stringify(validationError.format(), null, 2)}`
              );
            }
          }
        });
      });
    });
  });
});
