// tests/i18n-consistency.test.ts

import path from "path";
import {
  locales,
  referenceLocale,
  publicBasePath,
  loadJsonFile,
  getNamespaces,
} from "./helpers/recipeTestUtils";

const otherLocales = locales.filter((l: string) => l !== referenceLocale);
const namespaces = getNamespaces(referenceLocale);

describe("i18n Translation Consistency", () => {
  if (namespaces.length === 0) {
    console.warn(`No namespaces found for reference locale ${referenceLocale}. Skipping i18n tests.`);
    it('should find namespaces', () => expect(namespaces.length).toBeGreaterThan(0));
    return;
  }

  namespaces.forEach((ns: string) => {
    describe(`Namespace: ${ns}`, () => {
      const refFilePath = path.join(
        publicBasePath,
        "locales",
        referenceLocale,
        `${ns}.json`
      );
      let referenceData: Record<string, unknown> | null = null;
      let referenceKeys: string[] = [];

      beforeAll(() => {
        referenceData = loadJsonFile(refFilePath);
        referenceKeys = referenceData ? Object.keys(referenceData) : [];
      });

      it(`should load reference locale file (${referenceLocale}/${ns}.json) and contain keys`, () => {
        expect(referenceData).not.toBeNull();
        expect(referenceKeys.length).toBeGreaterThan(0);
      });

      otherLocales.forEach((locale: string) => {
        it(`should have consistent keys and non-empty string values for locale ${locale}`, () => {
          const localeFilePath = path.join(
            publicBasePath,
            "locales",
            locale,
            `${ns}.json`
          );
          const localeData = loadJsonFile(localeFilePath);

          if (referenceKeys.length === 0) {
            console.warn(`Skipping check for ${locale}/${ns} because reference keys are missing.`);
            expect(referenceKeys.length).toBeGreaterThan(0);
            return;
          }

          expect(localeData).not.toBeNull();
          if (!localeData) return;

          const errors: string[] = [];
          referenceKeys.forEach((key: string) => {
            if (!Object.prototype.hasOwnProperty.call(localeData, key)) {
              errors.push(`Missing key: "${key}"`);
            } else {
              const value = localeData[key];
              if (typeof value !== "string" || value.trim().length === 0) {
                errors.push(
                  `Key "${key}" has invalid value (type: ${typeof value}, value: "${value}"). Expected non-empty string.`
                );
              }
            }
          });

          const localeKeys = Object.keys(localeData);
          localeKeys.forEach((key: string) => {
            if (!referenceKeys.includes(key)) {
              errors.push(`Extra key found: "${key}"`);
            }
          });

          expect(errors).toEqual([]);
        });
      });
    });
  });
});

