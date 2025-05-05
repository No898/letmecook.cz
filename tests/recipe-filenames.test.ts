import { locales, referenceLocale, getRecipeBasenames } from "./helpers/recipeTestUtils";

describe("Recipe Filename Consistency", () => {
  let recipeBasenamesByLocale: Record<string, string[]>;

  beforeAll(() => {
    recipeBasenamesByLocale = {};
    locales.forEach((locale: string) => {
      recipeBasenamesByLocale[locale] = getRecipeBasenames(locale);
    });
  });

  it("should have the same set of recipe filenames across all locales", () => {
    const referenceBasenames = recipeBasenamesByLocale[referenceLocale];

    expect(referenceBasenames).toBeDefined(); 
    expect(referenceBasenames.length).toBeGreaterThan(0); 

    locales
      .filter((locale: string) => locale !== referenceLocale)
      .forEach((locale: string) => {
        const currentBasenames = recipeBasenamesByLocale[locale];
        expect(currentBasenames).toEqual(referenceBasenames);
      });
  });
});
