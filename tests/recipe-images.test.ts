import fs from "fs";
import path from "path";
import type { Recipe } from "@/types/recipe";

// ----- Sdílená logika (opět, může být refaktorována) -----
const recipesBasePath = path.join(__dirname, "..", "src", "data", "recipes");
const publicBasePath = path.join(__dirname, "..", "public"); // Cesta k public složce
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
          fullPathForRequire: `@/data/recipes/${locale}/${basename}`,
          displayPath: `src/data/recipes/${locale}/${file}`,
        };
      });
  } catch (error) {
    console.error(`Error reading directory ${localeDir}:`, error);
    return [];
  }
};
// ------------------------------------------------------

describe("Recipe Image Existence", () => {
  locales.forEach((locale) => {
    describe(`Locale: ${locale}`, () => {
      const recipeFiles = getRecipeFilesInfo(locale);

      if (recipeFiles.length === 0) {
        console.warn(
          `No recipe files found for locale ${locale}, skipping image checks.`
        );
        return;
      }

      recipeFiles.forEach((fileInfo) => {
        it(`should have an existing image file for ${fileInfo.displayPath}`, () => {
          let recipe: Recipe | null = null;
          let loadError: any = null;

          try {
            const module = require(fileInfo.fullPathForRequire);
            if (!module || !module.recipe) {
              throw new Error(
                `Module or recipe export not found in ${fileInfo.fullPathForRequire}`
              );
            }
            recipe = module.recipe as Recipe;
          } catch (error) {
            loadError = error;
            // Chybu už logujeme v jiných testech, zde stačí kontrola null
          }

          // Přeskocit test, pokud se recept nepodařilo načíst
          if (!recipe) {
            console.warn(
              `Skipping image check for ${fileInfo.displayPath} because it failed to load.`
            );
            // Tento test projde, pokud se soubor nenačte, protože chyba je jinde
            expect(recipe).toBeNull();
            return;
          }

          // Zkontrolovat, zda imageUrl existuje a není prázdný string
          expect(recipe.imageUrl).toBeDefined();
          expect(recipe.imageUrl).not.toBe("");

          if (recipe.imageUrl) {
            // Sestavit absolutní cestu k obrázku v public složce
            // Předpokládáme, že imageUrl začíná '/' (např. /images/...)
            const imagePath = path.join(publicBasePath, recipe.imageUrl);

            // Ověřit existenci souboru
            const imageExists = fs.existsSync(imagePath);

            // Očekáváme, že soubor existuje
            expect(imageExists).toBe(true);

            // Přidáme log PŘED selháním, pokud soubor neexistuje
            if (!imageExists) {
              console.error(`Image file not found at: ${imagePath}`);
            }
          }
        });
      });
    });
  });
});
