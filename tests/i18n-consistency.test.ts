// tests/i18n-consistency.test.ts
import fs from "fs";
import path from "path";

const localesPath = path.join(__dirname, "..", "public", "locales");
const referenceLocale = "cs";
const otherLocales = ["en", "vi", "zh-TW"];
const namespaces = ["common"]; // Začneme s 'common', můžeme přidat další

// Funkce pro bezpečné načtení a parsování JSON souboru
const loadJsonFile = (filePath: string): Record<string, unknown> | null => {
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
      it(`should load reference locale file (${referenceLocale}/${ns}.json) and contain keys`, () => {
        const refFilePath = path.join(
          localesPath,
          referenceLocale,
          `${ns}.json`
        );
        const referenceData = loadJsonFile(refFilePath);
        expect(referenceData).not.toBeNull();
        if (referenceData) {
          const keys = Object.keys(referenceData);
          console.log(`Reference keys for ${ns}:`, keys);
          expect(keys.length).toBeGreaterThan(0);
        }
      });

      otherLocales.forEach((locale) => {
        it(`should have consistent keys and non-empty values for locale ${locale}`, () => {
          const localeFilePath = path.join(localesPath, locale, `${ns}.json`);
          const localeData = loadJsonFile(localeFilePath);

          const refFilePath = path.join(
            localesPath,
            referenceLocale,
            `${ns}.json`
          );
          const referenceDataNow = loadJsonFile(refFilePath);
          const referenceKeysNow = referenceDataNow
            ? Object.keys(referenceDataNow)
            : [];

          expect(localeData).not.toBeNull();
          if (!localeData) return;

          expect(referenceKeysNow.length).toBeGreaterThan(0);
          if (referenceKeysNow.length === 0) return;

          const errors: string[] = [];
          referenceKeysNow.forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(localeData, key)) {
              errors.push(`Missing key: "${key}"`);
            } else {
              const value = localeData![key];
              if (value === null || value === undefined) {
                errors.push(`Key "${key}" value is null or undefined`);
              } else if (typeof value !== "string") {
                errors.push(
                  `Key "${key}" value is not a string (type: ${typeof value})`
                );
              } else if (value.length === 0) {
                errors.push(`Key "${key}" value is an empty string`);
              }
            }
          });
          expect(errors).toEqual([]);
        });
      });
    });
  });
});
