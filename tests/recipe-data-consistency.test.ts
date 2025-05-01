import fs from "fs";
import path from "path";
import type { Recipe } from "@/types/recipe"; // Importujeme typ Recipe

// ----- Sdílená logika pro získání názvů receptů (může být v budoucnu refaktorována do helperu) -----
const recipesBasePath = path.join(__dirname, "..", "src", "data", "recipes");
const locales = ["cs", "en", "vi", "zh-TW"]; // Jazyky pro kontrolu

const getRecipeBasenames = (locale: string): string[] => {
  const localeDir = path.join(recipesBasePath, locale);
  try {
    const files = fs.readdirSync(localeDir);
    return files
      .filter((file) => file.endsWith(".ts"))
      .map((file) => file.replace(".ts", ""))
      .sort();
  } catch (error) {
    console.error(`Error reading directory ${localeDir}:`, error);
    return [];
  }
};
// ---------------------------------------------------------------------------------------------

const referenceLocale = "cs"; // Použijeme češtinu jako referenci
const recipeBasenames = getRecipeBasenames(referenceLocale);

describe("Recipe Data Consistency Across Locales", () => {
  // Procházíme každý unikátní název receptu
  recipeBasenames.forEach((basename) => {
    describe(`Recipe: ${basename}`, () => {
      let recipesByLocale: Record<string, Recipe | null> = {};
      let loadErrors: Record<string, any> = {};

      // Před testy pro tento recept načteme všechny jeho jazykové verze
      beforeAll(async () => {
        recipesByLocale = {}; // Reset pro každý recept
        loadErrors = {};
        for (const locale of locales) {
          try {
            // Cesta relativní k projektu pro dynamický import, který zpracuje jest a ts-jest
            const recipePath = `@/data/recipes/${locale}/${basename}`;
            // Používáme require místo import(), protože Jest může mít s dynamickým importem v CommonJS více problémů
            // const module = await import(recipePath); // Pokud by require selhalo, zkusili bychom toto
            const module = require(recipePath);
            if (!module || !module.recipe) {
              throw new Error(
                `Module or recipe export not found in ${recipePath}`
              );
            }
            recipesByLocale[locale] = module.recipe as Recipe;
          } catch (error) {
            console.error(`Error loading recipe ${locale}/${basename}:`, error);
            recipesByLocale[locale] = null; // Označíme, že se nepodařilo načíst
            loadErrors[locale] = error;
          }
        }
      });

      // Test 1: Ověříme, že se všechny jazykové verze podařilo načíst
      it("should load successfully for all locales", () => {
        locales.forEach((locale) => {
          // Opraveno: expect přijímá jen jeden argument
          expect(recipesByLocale[locale]).not.toBeNull();
          // Pokud chceme vidět chybu v případě selhání, můžeme přidat log nebo nechat Jest vypsat standardní chybu
          if (!recipesByLocale[locale]) {
            console.error(
              `Recipe ${locale}/${basename} failed to load. Error:`,
              loadErrors[locale]
            );
          }
        });
      });

      // Test 2: Porovnáme specifická pole napříč jazyky
      // Pole, která musí mít stejnou hodnotu
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
        it(`should have consistent '${String(
          field
        )}' across all locales`, () => {
          const referenceRecipe = recipesByLocale[referenceLocale];

          // Pokud se nepodařilo načíst referenční recept, tento test přeskočíme
          // (selhání už bylo reportováno v předchozím testu)
          if (!referenceRecipe) {
            console.warn(
              `Skipping field consistency check for ${basename} because reference recipe (${referenceLocale}) failed to load.`
            );
            return; // Ukončíme tento 'it' blok
          }

          const referenceValue = referenceRecipe[field];

          // Porovnáme s ostatními jazyky
          locales
            .filter((l) => l !== referenceLocale)
            .forEach((locale) => {
              const currentRecipe = recipesByLocale[locale];
              // Pokud se nepodařilo načíst aktuální recept, také přeskočíme
              if (!currentRecipe) {
                console.warn(
                  `Skipping field consistency check for ${basename} - locale ${locale} failed to load.`
                );
                return; // Přeskočíme porovnání pro tento jazyk
              }

              expect(currentRecipe[field]).toEqual(referenceValue);
            });
        });
      });
    });
  });
});
