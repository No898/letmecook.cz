import type { Metadata, ResolvingMetadata } from "next";
// Předpokládáme, že používáte 'next/image' pro optimalizaci obrázků
import Image from "next/image";
// Importujte vaši funkci pro načtení dat receptu (nebo použijte jiný způsob)
// import { getRecipeBySlug } from '@/lib/recipes'; // Příklad importu
import { notFound } from "next/navigation";
// Import GSAP wrapperu
import GsapScrollWrapper from "@/components/GsapScrollWrapper";
// Vrácen import původního datového souboru
import { recipes, Recipe as OriginalRecipeType } from "@/data/recipesData";
// import { getRecipeData } from "@/lib/recipeLoader"; // Zakomentováno/nahrazeno

// --- Definice standardního typu Props ---
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
// -------------------------------------

// --- Struktura dat receptu - Odkomentováno a upraveno ---
// Tato struktura definuje, jaká data očekáváme *v této komponentě*
interface RecipeData {
  id: string; // Přidáno zpět id
  title: string; // Použijeme 'title' z dat
  vietnameseTitle?: string;
  imageUrl?: string; // Použijeme 'imageUrl' z dat
  description: string;
  ingredients: OriginalRecipeType["ingredients"]; // Typ z původního souboru
  procedure: OriginalRecipeType["procedure"]; // Typ z původního souboru
  tips?: OriginalRecipeType["tips"]; // Typ z původního souboru
  serving: OriginalRecipeType["serving"]; // Typ z původního souboru
  authorName: string;
  datePublished: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeCategory?: string;
  recipeCuisine?: string;
  keywords?: string;
  // Pole, která možná chybí v OriginalRecipeType, ale chceme je použít (např. pro Schema)
  dateModified?: string; // Pokud toto pole v OriginalRecipeType není, bude zde undefined
  recipeYield?: string;
}
// ---------------------------------------------------------

// --- Funkce pro načtení dat ---
// Vrací data ve formátu našeho lokálního interface RecipeData
async function getRecipeData(slug: string): Promise<RecipeData | null> {
  const recipe = recipes.find((r) => r.id === slug);
  if (!recipe) {
    console.warn(`Recipe with slug "${slug}" not found in recipesData.ts`);
    return null;
  }
  // Mapování dat z OriginalRecipeType na náš lokální RecipeData interface
  // Pokud pole v OriginalRecipeType chybí, budou undefined
  return {
    id: recipe.id,
    title: recipe.title,
    vietnameseTitle: recipe.vietnameseTitle,
    imageUrl: recipe.imageUrl,
    description: recipe.description,
    ingredients: recipe.ingredients,
    procedure: recipe.procedure,
    tips: recipe.tips,
    serving: recipe.serving,
    authorName: recipe.authorName, // Předpokládáme, že tato pole existují v OriginalRecipeType
    datePublished: recipe.datePublished,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeCategory: recipe.recipeCategory,
    recipeCuisine: recipe.recipeCuisine,
    keywords: recipe.keywords,
    // dateModified: recipe.dateModified, // Odkomentujte, pokud dateModified existuje v OriginalRecipeType
    // recipeYield: recipe.recipeYield, // Odkomentujte, pokud recipeYield existuje v OriginalRecipeType
  };
}
// ------------------------------------

// --- Metadata pro <head> ---
export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata // Přidán komentář pro ESLint
): Promise<Metadata> {
  const recipe = await getRecipeData(params.slug);

  if (!recipe) {
    return { title: "Recept nenalezen" };
  }

  const pageTitle = `${recipe.title} | Recepty Tomáše Dinh`; // Použito title
  const pageDescription = recipe.description;
  const imageUrl = recipe.imageUrl?.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "https://letmecook.cz"}${
        recipe.imageUrl
      }`
    : recipe.imageUrl || "";

  // Získání předchozích obrázků (pokud je potřeba kombinovat)
  // const previousImages = (await _parent).openGraph?.images || []

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: recipe.title }]
        : [], // Použito title
      type: "article",
      // publishedTime: recipe.datePublished, // TODO: Zajistit správný formát
      // modifiedTime: recipe.dateModified || recipe.datePublished, // TODO: Zajistit správný formát
      authors: [recipe.authorName],
      url: `${
        process.env.NEXT_PUBLIC_BASE_URL || "https://letmecook.cz"
      }/recepty/${params.slug}`, // Použit params.slug
    },
  };
}
// ---------------------------

// --- Komponenta stránky ---
export default async function RecipePage({ params }: Props) {
  const recipe = await getRecipeData(params.slug);

  if (!recipe) {
    notFound();
  }

  // --- Vytvoření JSON-LD dat pro Schema.org ---
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: recipe.title, // Použito title
    description: recipe.description,
    image: recipe.imageUrl?.startsWith("/") // Použito imageUrl
      ? `${process.env.NEXT_PUBLIC_BASE_URL || "https://letmecook.cz"}${
          recipe.imageUrl
        }`
      : recipe.imageUrl,
    author: {
      "@type": "Person",
      name: recipe.authorName,
    },
    datePublished: recipe.datePublished,
    ...(recipe.dateModified && { dateModified: recipe.dateModified }),
    ...(recipe.prepTime && { prepTime: recipe.prepTime }),
    ...(recipe.cookTime && { cookTime: recipe.cookTime }),
    ...(recipe.totalTime && { totalTime: recipe.totalTime }),
    ...(recipe.keywords && { keywords: recipe.keywords }),
    ...(recipe.recipeYield && { recipeYield: recipe.recipeYield }),
    ...(recipe.recipeCategory && { recipeCategory: recipe.recipeCategory }),
    ...(recipe.recipeCuisine && { recipeCuisine: recipe.recipeCuisine }),
    // Použití správných typů z importovaného Recipe
    recipeIngredient: recipe.ingredients.flatMap((section) => section.items),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    recipeInstructions: recipe.procedure.map((section, _sectionIndex) => ({
      // Přidán komentář pro ESLint
      "@type": "HowToSection",
      name: section.sectionTitle,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      itemListElement: section.steps.map((stepText, _stepIndex) => ({
        // Přidán komentář pro ESLint
        "@type": "HowToStep",
        text: stepText,
      })),
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
    // Použití GSAP wrapperu
    <GsapScrollWrapper>
      <article className="prose lg:prose-xl mx-auto px-4 py-8 pt-12">
        {" "}
        {/* Article je nyní uvnitř wrapperu */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
        />
        {/* --- Zbytek obsahu receptu --- */}
        <h1>{recipe.title}</h1> {/* Použito title */}
        {recipe.vietnameseTitle && (
          <p className="text-lg italic text-gray-600 -mt-4 mb-4">
            {recipe.vietnameseTitle}
          </p>
        )}
        {recipe.imageUrl && ( // Použito imageUrl
          <div className="relative w-full h-64 md:h-96 mb-6">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title} // Použito title
              fill
              priority
              className="object-cover rounded-md shadow-md"
            />
          </div>
        )}
        <p className="lead">{recipe.description}</p>
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
        <div className="ingredients-section my-6">
          {recipe.ingredients.map((section, index) => (
            <div key={`ing-${index}`} className="mb-4">
              <h3 className="font-semibold text-lg mb-2">
                {section.sectionTitle}
              </h3>
              {section.servings && (
                <p className="text-sm text-gray-500 italic mb-2">
                  {section.servings}
                </p>
              )}
              <ul className="list-disc list-inside">
                {section.items.map((item, itemIndex) => (
                  <li key={`ing-item-${index}-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h2>Postup</h2>
        <div className="procedure-section my-6">
          {recipe.procedure.map((section, index) => (
            <div key={`proc-${index}`} className="mb-6">
              <h3 className="font-semibold text-lg mb-2">
                {section.sectionTitle}
              </h3>
              <ol className="list-decimal list-inside space-y-2">
                {section.steps.map((step, stepIndex) => (
                  <li key={`proc-step-${index}-${stepIndex}`}>{step}</li>
                ))}
              </ol>
              {section.videoUrl && (
                <div className="mt-4">
                  <a
                    href={section.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Podívejte se na video postupu
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Tipy - používá správný typ z RecipeData */}
        {recipe.tips && (
          <div className="tips-section my-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-md">
            <h2 className="!mt-0">{recipe.tips.sectionTitle}</h2>
            {recipe.tips.items.map((tip, index) => (
              <div key={`tip-${index}`} className="mb-3 last:mb-0">
                <h4 className="font-semibold">{tip.title}</h4>
                <p className="text-sm">{tip.text}</p>
              </div>
            ))}
          </div>
        )}
        {/* Podávání - používá správný typ z RecipeData */}
        <div className="serving-section my-6">
          <h2>{recipe.serving.sectionTitle}</h2>
          <ul className="list-disc list-inside">
            {recipe.serving.suggestions.map((suggestion, index) => (
              <li key={`serve-${index}`}>{suggestion}</li>
            ))}
          </ul>
        </div>
        {/* Zobrazení autora, data publikace atd. */}
        <div className="recipe-meta">
          <p>Autor: {recipe.authorName}</p>
          <p>
            Publikováno:{" "}
            {new Date(recipe.datePublished).toLocaleDateString("cs-CZ")}
          </p>
          {/* Pokud dateModified existuje v datech, zobrazí se */}
          {recipe.dateModified && (
            <p>
              Upraveno:{" "}
              {new Date(recipe.dateModified).toLocaleDateString("cs-CZ")}
            </p>
          )}
        </div>
        {/* Místo pro hodnocení, komentáře, atd. */}
      </article>
    </GsapScrollWrapper>
  );
}
// Ujistěte se, že máte styly pro .scroll-progress-bar v globals.css
// např.:
// .scroll-progress-bar {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 4px;
//   background: var(--color-accent); /* Použijte vaši CSS proměnnou nebo barvu */
//   transform-origin: 0%;
//   z-index: 50;
// }
