import { MetadataRoute } from "next";
import fs from "fs/promises";
import path from "path";
import { languages } from "@/i18n/settings";

// Nastavte základní URL vašeho webu. Ideálně z environmentální proměnné.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://letmecook.cz";
// Ujistěte se, že NEXT_PUBLIC_BASE_URL je nastavena ve vašem Vercel projektu.

// Regex pro extrakci datePublished: 'YYYY-MM-DD'
const datePublishedRegex = /datePublished:\s*['|"](\d{4}-\d{2}-\d{2})['|"]/;

// Funkce pro načtení všech receptů a pokus o získání data publikace
async function getAllActualRecipePaths(): Promise<{ locale: string; id: string; lastModified: Date }[]> {
  const allPaths: { locale: string; id: string; lastModified: Date }[] = [];
  const recipeDataBasePath = path.join(process.cwd(), 'src', 'data', 'recipes');

  try {
    for (const locale of languages) {
      const localeDir = path.join(recipeDataBasePath, locale);
      try {
        const recipeFiles = await fs.readdir(localeDir);
        for (const file of recipeFiles) {
          if (file.endsWith('.ts') && !file.startsWith('_')) {
            const id = file.replace('.ts', '');
            const filePath = path.join(localeDir, file);
            let lastModifiedDate: Date | null = null;

            try {
              // Zkusíme přečíst soubor a najít datePublished
              const fileContent = await fs.readFile(filePath, 'utf-8');
              const match = fileContent.match(datePublishedRegex);
              if (match && match[1]) {
                const parsedDate = new Date(match[1]);
                if (!isNaN(parsedDate.getTime())) {
                  lastModifiedDate = parsedDate;
                }
              }
            } catch (readError) {
              console.error(`Error reading file content for ${filePath}:`, readError);
            }

            try {
              // Pokud datePublished nebylo nalezeno/platné, použijeme mtime
              if (!lastModifiedDate) {
                const stats = await fs.stat(filePath);
                lastModifiedDate = stats.mtime;
              }
              allPaths.push({
                locale: locale,
                id: id,
                lastModified: lastModifiedDate,
              });
            } catch (statError) {
              console.error(`Error getting stats for file ${filePath}:`, statError);
            }
          }
        }
      } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: unknown }).code === 'ENOENT') {
          // Adresář pro locale neexistuje, tichý přeskok
        } else {
          console.error(`Error reading recipe directory ${localeDir}:`, error);
        }
      }
    }
  } catch (error) {
    console.error("Fatal error getting recipe paths for sitemap:", error);
  }
  return allPaths;
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipePaths = await getAllActualRecipePaths();

  const recipeEntries: MetadataRoute.Sitemap = recipePaths.map((recipePath) => ({
    url: `${BASE_URL}/${recipePath.locale}/recept/${recipePath.id}`,
    lastModified: recipePath.lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...languages.map((locale) => ({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...recipeEntries,
  ];
}
