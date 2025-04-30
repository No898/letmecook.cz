import { Metadata } from "next";
// Předpokládáme, že používáte 'next/image' pro optimalizaci obrázků
import Image from "next/image";
// Importujte vaši funkci pro načtení dat receptu (nebo použijte jiný způsob)
// import { getRecipeBySlug } from '@/lib/recipes'; // Příklad importu

// --- Struktura dat receptu ---
// Ujistěte se, že vaše funkce pro načítání dat vrací objekt
// s poli odpovídajícími Schema.org/Recipe
// TOTO JE JEN PŘÍKLAD - PŘIZPŮSOBTE VAŠÍ STRUKTUŘE DAT
interface RecipeData {
  slug: string;
  name: string;
  description: string;
  featuredImageUrl: string; // URL hlavního obrázku
  prepTime?: string; // ISO 8601 duration (např. "PT30M") - nepovinné, ale doporučené
  cookTime?: string; // ISO 8601 duration (např. "PT1H") - nepovinné, ale doporučené
  totalTime?: string; // ISO 8601 duration - nepovinné, ale doporučené
  recipeYield?: string; // Počet porcí (např. "4 porce") - nepovinné, ale doporučené
  recipeCategory?: string; // Kategorie (např. "Dezert", "Hlavní chod") - nepovinné
  recipeCuisine?: string; // Kuchyně (např. "Česká", "Italská") - nepovinné
  keywords?: string; // Klíčová slova oddělená čárkou (např. "koláč, citron, dezert")
  authorName: string; // Jméno autora
  datePublished: string; // Datum publikace ve formátu YYYY-MM-DD (např. "2024-05-23")
  dateModified?: string; // Datum poslední úpravy YYYY-MM-DD - nepovinné
  ingredients: string[]; // Pole textových řetězců ingrediencí
  instructions: string[]; // Pole textových řetězců kroků postupu
  // Volitelná pole pro lepší výsledky:
  // aggregateRating?: { ratingValue: number; reviewCount: number };
  // nutrition?: { calories: string; ... };
  // video?: { contentUrl: string; name: string; description: string; uploadDate: string; thumbnailUrl: string; };
}

// --- Funkce pro načtení dat ---
// TOTO NAHRAĎTE VAŠÍ SKUTEČNOU FUNKCÍ PRO NAČTENÍ DAT RECEPTU
async function getRecipeData(slug: string): Promise<RecipeData | null> {
  console.warn(
    `Schema generation: Using placeholder data for recipe ${slug}. Replace getRecipeData with actual implementation.`
  );
  // Příklad placeholder dat - nahraďte voláním vaší DB/API
  if (slug === "muj-prvni-recept") {
    return {
      slug: "muj-prvni-recept",
      name: "Můj První Úžasný Recept",
      description: "Jednoduchý a chutný recept, který zvládne každý.",
      featuredImageUrl: "/images/placeholder-recept.jpg", // Použijte relativní cestu z /public nebo absolutní URL
      prepTime: "PT15M",
      cookTime: "PT30M",
      totalTime: "PT45M",
      recipeYield: "2 porce",
      recipeCategory: "Hlavní chod",
      recipeCuisine: "Česká",
      keywords: "jednoduchý, rychlý, pečení",
      authorName: "Tomáš Dinh",
      datePublished: "2024-05-20",
      dateModified: "2024-05-23",
      ingredients: [
        "1 hrnek hladké mouky",
        "1 lžička kypřícího prášku",
        "1/2 hrnku cukru",
        "1 vejce",
        "100ml mléka",
        "50g másla, rozpuštěného",
      ],
      instructions: [
        "Předehřejte troubu na 180°C.",
        "V míse smíchejte mouku, kypřící prášek a cukr.",
        "V jiné míse rozšlehejte vejce s mlékem a rozpuštěným máslem.",
        "Tekutou směs přilijte k suchým ingrediencím a krátce promíchejte.",
        "Těsto nalijte do vymazané formy.",
        "Pečte přibližně 30 minut, nebo dokud špejle nevyjde čistá.",
      ],
    };
  }
  return null;
}
// ------------------------------------

// --- Metadata pro <head> ---
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const recipe = await getRecipeData(params.slug);
  if (!recipe) {
    return { title: "Recept nenalezen" };
  }
  return {
    title: `${recipe.name} | Recepty Tomáše Dinh`,
    description: recipe.description,
    // Můžete přidat i Open Graph metadata pro sociální sítě
    openGraph: {
      title: `${recipe.name} | Recepty Tomáše Dinh`,
      description: recipe.description,
      images: [
        {
          url: recipe.featuredImageUrl.startsWith("/")
            ? `${process.env.NEXT_PUBLIC_BASE_URL}${recipe.featuredImageUrl}`
            : recipe.featuredImageUrl,
          width: 1200, // Odhad nebo skutečná šířka
          height: 630, // Odhad nebo skutečná výška
          alt: recipe.name,
        },
      ],
      type: "article", // 'article' je vhodné pro recept
      publishedTime: recipe.datePublished,
      modifiedTime: recipe.dateModified || recipe.datePublished,
      authors: [recipe.authorName],
      // url: `${process.env.NEXT_PUBLIC_BASE_URL}/recepty/${recipe.slug}`, // Kanonická URL
    },
  };
}
// ---------------------------

// --- Komponenta stránky ---
export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipeData(params.slug);

  if (!recipe) {
    // Zde by měla být skutečná 404 stránka pomocí notFound() z 'next/navigation'
    // import { notFound } from 'next/navigation';
    // notFound();
    return <div>Recept nenalezen</div>;
  }

  // --- Vytvoření JSON-LD dat pro Schema.org ---
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.name,
    description: recipe.description,
    // Obrázek: Použijte absolutní URL
    image: recipe.featuredImageUrl.startsWith("/")
      ? `${process.env.NEXT_PUBLIC_BASE_URL}${recipe.featuredImageUrl}`
      : recipe.featuredImageUrl,
    author: {
      "@type": "Person",
      name: recipe.authorName,
    },
    datePublished: recipe.datePublished,
    ...(recipe.dateModified && { dateModified: recipe.dateModified }), // Přidat jen pokud existuje
    ...(recipe.prepTime && { prepTime: recipe.prepTime }),
    ...(recipe.cookTime && { cookTime: recipe.cookTime }),
    ...(recipe.totalTime && { totalTime: recipe.totalTime }),
    ...(recipe.keywords && { keywords: recipe.keywords }),
    ...(recipe.recipeYield && { recipeYield: recipe.recipeYield }),
    ...(recipe.recipeCategory && { recipeCategory: recipe.recipeCategory }),
    ...(recipe.recipeCuisine && { recipeCuisine: recipe.recipeCuisine }),
    recipeIngredient: recipe.ingredients,
    // Instrukce je lepší formátovat jako HowToStep pro větší detail
    recipeInstructions: recipe.instructions.map((stepText) => ({
      "@type": "HowToStep",
      text: stepText,
    })),
    // --- Volitelná, ale doporučená pole ---
    // ...(recipe.aggregateRating && {
    //   aggregateRating: {
    //     "@type": "AggregateRating",
    //     ratingValue: recipe.aggregateRating.ratingValue, // např. "4.5"
    //     reviewCount: recipe.aggregateRating.reviewCount // např. "15"
    //   }
    // }),
    // ...(recipe.nutrition && {
    //   nutrition: {
    //     "@type": "NutritionInformation",
    //     calories: recipe.nutrition.calories, // např. "250 kcal"
    //     // ... další nutriční údaje (fatContent, proteinContent, ...)
    //   }
    // }),
    // ...(recipe.video && {
    //   video: {
    //       "@type": "VideoObject",
    //       name: recipe.video.name,
    //       description: recipe.video.description,
    //       contentUrl: recipe.video.contentUrl, // URL videa
    //       thumbnailUrl: recipe.video.thumbnailUrl, // URL náhledu
    //       uploadDate: recipe.video.uploadDate, // YYYY-MM-DD
    //       // duration: "PT1M33S", // ISO 8601 duration
    //       // interactionStatistic: { ... } // Počty zhlédnutí atd.
    //   }
    // })
  };
  // -----------------------------------------

  return (
    <article>
      {" "}
      {/* Použití sémantického tagu <article> */}
      {/* Vložení JSON-LD skriptu do <head> nepřímo přes metadata nebo přímo zde */}
      {/* Next.js doporučuje vkládat JSON-LD spíše takto přímo do těla stránky */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* --- Zobrazení obsahu receptu --- */}
      <h1>{recipe.name}</h1>
      {/* Použití next/image pro optimalizaci */}
      <Image
        src={recipe.featuredImageUrl}
        alt={recipe.name}
        width={800} // Nastavte vhodnou šířku
        height={450} // Nastavte vhodnou výšku
        priority // Pokud je to hlavní obrázek nad ohybem, použijte priority
        style={{ objectFit: "cover", width: "100%", height: "auto" }} // Příklad stylů
      />
      <p>{recipe.description}</p>
      {/* Zobrazení detailů jako čas přípravy, vaření, porce atd. */}
      <div className="recipe-details">
        {recipe.totalTime && (
          <p>
            Celkový čas:{" "}
            {recipe.totalTime
              .replace("PT", "")
              .replace("H", "h ")
              .replace("M", "m")}
          </p>
        )}
        {recipe.recipeYield && <p>Počet porcí: {recipe.recipeYield}</p>}
        {/* ... další detaily ... */}
      </div>
      <h2>Ingredience</h2>
      <ul>
        {recipe.ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>
      <h2>Postup</h2>
      {/* Lepší sémantika pro kroky */}
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      {/* Zobrazení autora, data publikace atd. */}
      <div className="recipe-meta">
        <p>Autor: {recipe.authorName}</p>
        <p>
          Publikováno:{" "}
          {new Date(recipe.datePublished).toLocaleDateString("cs-CZ")}
        </p>
        {recipe.dateModified && (
          <p>
            Upraveno:{" "}
            {new Date(recipe.dateModified).toLocaleDateString("cs-CZ")}
          </p>
        )}
      </div>
      {/* Místo pro hodnocení, komentáře, atd. */}
    </article>
  );
}
