// Tento soubor je nyní Server Component

import { recipes } from "@/data/recipesData";
import { notFound } from "next/navigation";
import RecipeDetailClient from "@/components/RecipeDetailClient"; // Import nové klientské komponenty

// Interface pro props podle Next.js 15+
interface RecipePageProps {
  params: Promise<{ id: string }>;
  // Přidáme i searchParams, i když je nepoužíváme, pro úplnost typu
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Funkce pro generování metadat (titulek stránky v prohlížeči)
export async function generateMetadata({ params }: RecipePageProps) {
  // Získání id pomocí await z Promise
  const { id } = await params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return { title: "Recept nenalezen" };
  }
  return {
    title: `${recipe.title} | Recepty Tomáše Dinh`,
    description: recipe.description.substring(0, 160), // Krátký popis pro SEO
  };
}

// Hlavní komponenta stránky (Server Component)
export default async function RecipePage({ params }: RecipePageProps) {
  // Získání id pomocí await z Promise
  const { id } = await params;
  // Najdeme recept podle ID z URL
  const recipe = recipes.find((r) => r.id === id);

  // Pokud recept neexistuje, zobrazíme 404 (běží na serveru)
  if (!recipe) {
    notFound();
  }

  // Předání dat klientské komponentě k vykreslení
  return <RecipeDetailClient recipe={recipe} />;
}

// Funkce pro generování statických stránek (nepovinné, ale dobré pro výkon)
// Next.js může automaticky zjistit, které stránky má předgenerovat,
// ale explicitní definice může být přesnější.
export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}
