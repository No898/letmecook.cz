// tests/i18n-consistency.test.ts
import fs from "fs";
import path from "path";

const localesPath = path.join(__dirname, "..", "public", "locales");
const referenceLocale = "cs";
const otherLocales = ["en", "vi", "zh-TW"];
const namespaces = ["common"]; // Začneme s 'common', můžeme přidat další

// Funkce pro bezpečné načtení a parsování JSON souboru
const loadJsonFile = (filePath: string): Record<string, any> | null => {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing file ${filePath}:`, error);
    return null;
  }
};

describe("i18n Translation Consistency", () => {
  namespaces.forEach((ns) => {
    describe(`Namespace: ${ns}`, () => {
      const refFilePath = path.join(localesPath, referenceLocale, `${ns}.json`);
      let referenceKeys: string[] = [];
      let referenceData: Record<string, any> | null = null;

      beforeAll(() => {
        referenceData = loadJsonFile(refFilePath);
        if (referenceData) {
          // Získáme všechny klíče (i vnořené, pokud bychom chtěli, ale zde jen top-level)
          referenceKeys = Object.keys(referenceData);
        }
      });

      it(`should load reference locale file (${referenceLocale}/${ns}.json)`, () => {
        expect(referenceData).not.toBeNull();
        expect(referenceKeys.length).toBeGreaterThan(0); // Měl by mít nějaké klíče
      });

      if (referenceData) {
        // Pokračujeme jen pokud se referenční soubor načetl
        otherLocales.forEach((locale) => {
          describe(`Locale: ${locale}`, () => {
            const localeFilePath = path.join(localesPath, locale, `${ns}.json`);
            let localeData: Record<string, any> | null = null;

            beforeAll(() => {
              localeData = loadJsonFile(localeFilePath);
            });

            it(`should load translation file (${locale}/${ns}.json)`, () => {
              expect(localeData).not.toBeNull();
            });

            if (localeData) {
              // Pokračujeme jen pokud se soubor načetl
              referenceKeys.forEach((key) => {
                it(`should contain key "${key}" and have a non-empty value`, () => {
                  // 1. Klíč musí existovat
                  expect(localeData).toHaveProperty(key);

                  // 2. Hodnota nesmí být null, undefined nebo prázdný string
                  const value = localeData![key]; // Víme, že existuje z předchozího expect
                  expect(value).not.toBeNull();
                  expect(value).not.toBeUndefined();
                  expect(value).not.toBe("");
                  // Můžeme přidat i kontrolu, že je to string, pokud je to potřeba
                  // expect(typeof value).toBe('string');
                });
              });
            }
          });
        });
      }
    });
  });
});
