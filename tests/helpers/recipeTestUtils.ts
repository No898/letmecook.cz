import fs from "fs";
import path from "path";

export const locales = ["cs", "en", "vi", "zh-TW"];
export const referenceLocale = "cs";
export const recipesBasePath = path.join(__dirname, "..", "..", "src", "data", "recipes");
export const publicBasePath = path.join(__dirname, "..", "..", "public");


// Získá informace o souborech receptů pro daný jazyk.
export const getRecipeFileInfoList = (locale: string): {
    basename: string;
    fullPathForRequire: string;
    displayPath: string;
    absolutePath: string;
}[] => {
    const localeDir = path.join(recipesBasePath, locale);
    try {
        const files = fs.readdirSync(localeDir);
        return files
            .filter((file) => file.endsWith(".ts") && !file.startsWith('_')) // Ignorovat soubory začínající _
            .map((file) => {
                const basename = file.replace(".ts", "");
                const absolutePath = path.join(localeDir, file);
                return {
                    basename: basename,
                    fullPathForRequire: `@/data/recipes/${locale}/${basename}`,
                    displayPath: `src/data/recipes/${locale}/${file}`,
                    absolutePath: absolutePath,
                };
            });
    } catch (error: unknown) {
        // Pokud adresář neexistuje, vrátíme prázdné pole (očekávané pro některé testy)
        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'ENOENT') {
            console.warn(`Directory not found for locale ${locale}: ${localeDir}`);
            return [];
        }
        console.error(`Error reading directory ${localeDir}:`, error);
        return [];
    }
};

// Získá seřazený seznam názvů receptů (bez .ts) pro daný jazyk.
export const getRecipeBasenames = (locale: string): string[] => {
    return getRecipeFileInfoList(locale)
        .map(info => info.basename)
        .sort();
};

// Načte a parsuje JSON soubor. Vrací null v případě chyby.
export const loadJsonFile = (filePath: string): Record<string, unknown> | null => {
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

// Získá seznam namespaces z adresáře daného jazyka.
export const getNamespaces = (locale: string): string[] => {
    const localeDir = path.join(publicBasePath, 'locales', locale);
    try {
        const files = fs.readdirSync(localeDir);
        return files
            .filter((file) => file.endsWith(".json"))
            .map((file) => file.replace(".json", ""));
    } catch (error) {
        console.error(`Error reading namespaces directory ${localeDir}:`, error);
        return [];
    }
} 