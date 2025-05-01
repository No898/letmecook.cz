import fs from "fs";
import path from "path";

// Definujeme cestu k adresáři s recepty a seznam jazyků
const recipesBasePath = path.join(__dirname, "..", "src", "data", "recipes");
// Předpokládáme, že tyto složky existují - můžeme je načíst i dynamicky, pokud chceme
const locales = ["cs", "en", "vi", "zh-TW"];

// Funkce pro získání názvů receptů (bez .ts) pro daný jazyk
const getRecipeBasenames = (locale: string): string[] => {
  const localeDir = path.join(recipesBasePath, locale);
  try {
    const files = fs.readdirSync(localeDir);
    return files
      .filter((file) => file.endsWith(".ts")) // Jen .ts soubory
      .map((file) => file.replace(".ts", "")) // Odstranit .ts
      .sort(); // Seřadit pro konzistentní porovnání
  } catch (error) {
    // Pokud adresář neexistuje nebo nastane chyba, vrátíme prázdné pole
    console.error(`Error reading directory ${localeDir}:`, error);
    return [];
  }
};

describe("Recipe Filename Consistency", () => {
  let recipeBasenamesByLocale: Record<string, string[]>;

  // Před všemi testy v tomto bloku načteme názvy souborů pro všechny jazyky
  beforeAll(() => {
    recipeBasenamesByLocale = {};
    locales.forEach((locale) => {
      recipeBasenamesByLocale[locale] = getRecipeBasenames(locale);
    });
  });

  it("should have the same set of recipe filenames across all locales", () => {
    // Získáme názvy z prvního jazyka (např. 'cs') jako referenci
    const referenceLocale = locales[0];
    const referenceBasenames = recipeBasenamesByLocale[referenceLocale];

    // Zkontrolujeme, že referenční seznam není prázdný (pojistka)
    expect(referenceBasenames.length).toBeGreaterThan(0);

    // Porovnáme seznamy ostatních jazyků s referenčním
    locales.slice(1).forEach((locale) => {
      const currentBasenames = recipeBasenamesByLocale[locale];
      // Použijeme toEqual, protože porovnáváme obsah seřazených polí
      expect(currentBasenames).toEqual(referenceBasenames);
    });
  });
});
