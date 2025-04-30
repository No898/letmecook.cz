import { MetadataRoute } from "next";

// --- !!! DŮLEŽITÉ !!! ---
// Tuto funkci musíte nahradit vaší skutečnou logikou
// pro načtení všech publikovaných receptů z vaší databáze, CMS, nebo API.
// Měla by vracet pole objektů, kde každý objekt obsahuje alespoň 'slug'
// a ideálně i datum poslední úpravy ('updatedAt').
async function getAllPublishedRecipes(): Promise<
  { slug: string; updatedAt: Date }[]
> {
  console.warn(
    "Sitemap generation: Using placeholder data for recipes. Replace getAllPublishedRecipes with actual implementation."
  );
  // Příklad placeholder dat:
  return [
    { slug: "muj-prvni-recept", updatedAt: new Date("2024-05-20") },
    { slug: "druhy-skvely-recept", updatedAt: new Date("2024-05-21") },
    // ... sem přidejte logiku pro načtení všech vašich receptů
  ];
}
// -------------------------

// --- !!! DŮLEŽITÉ !!! ---
// Nastavte základní URL vašeho webu. Ideálně z environmentální proměnné.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://letmecook.cz";
// Ujistěte se, že NEXT_PUBLIC_BASE_URL je nastavena ve vašem Vercel projektu.
// -------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Načtení všech receptů
  const recipes = await getAllPublishedRecipes();

  // Vytvoření záznamů pro každý recept
  const recipeEntries: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${BASE_URL}/recepty/${recipe.slug}`,
    lastModified: recipe.updatedAt,
    changeFrequency: "weekly", // Jak často se recepty mění? (monthly, weekly, daily)
    priority: 0.8, // Priorita oproti ostatním stránkám (0.0 - 1.0)
  }));

  // Vrácení pole s URL adresami: homepage + všechny recepty
  return [
    {
      url: BASE_URL,
      lastModified: new Date(), // Aktuální datum pro homepage
      changeFrequency: "daily", // Jak často se mění homepage?
      priority: 1.0, // Nejvyšší priorita
    },
    ...recipeEntries,
  ];
}
