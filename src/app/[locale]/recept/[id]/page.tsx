import { notFound } from "next/navigation";
import RecipeDetailClient from "@/components/RecipeDetailClient";
import { initI18nextInstance, TFunction } from "@/i18n";
import { languages, fallbackLng } from "@/i18n/settings";
import type { Recipe } from "@/types/recipe"; // Aktualizovaný import
import fs from "fs/promises"; // Import pro práci se soubory
import path from "path"; // Import pro práci s cestami
import { i18n as I18nInstanceType } from 'i18next'; // Import typu

interface RecipePageParams { locale: string; id: string; }
interface RecipePageProps { params: RecipePageParams; }

// Pomocná funkce pro načtení receptu
// Přijímá přímo locale a id
async function loadRecipe(locale: string, id: string): Promise<Recipe | null> {
    // const { locale, id } = params; // Odstraněno - hodnoty přicházejí jako argumenty
    try {
        const { recipe } = await import(`@/data/recipes/${locale}/${id}.ts`);
        return recipe as Recipe;
    } catch (error) {
        console.error(`Error importing recipe ${locale}/${id}:`, error);
        return null;
    }
}

// Pomocná funkce pro získání překladů UI
// Přijímá přímo locale
async function getUiTranslations(locale: string): Promise<Record<string, string>> {
    // const { locale } = params; // Odstraněno - locale přichází jako argument
    const i18nextInstance = await initI18nextInstance(locale, 'common');
    const t: TFunction = i18nextInstance.getFixedT(locale, 'common');
    return {
        back_to_recipes: t('back_to_recipes'),
        share_label: t('share_label'),
        share_on_facebook: t('share_on_facebook'),
        share_on_whatsapp: t('share_on_whatsapp'),
        share_on_x: t('share_on_x'),
        share_via_email: t('share_via_email'),
        copy_link: t('copy_link'),
        link_copied: t('link_copied'),
        copied_tooltip: t('copied_tooltip'),
        detailed: t('detailed'),
        brief: t('brief'),
        video_fallback: t('video_fallback'),
    };
}

// Funkce pro generování metadat
export async function generateMetadata({ params }: RecipePageProps): Promise<{ title: string; description?: string }> {
    // Nejprve await params a pak destrukturace
    const { locale, id } = await params;
    // Předáme rozparsované locale a id do pomocných funkcí
    const i18nextInstance = await initI18nextInstance(locale, 'common'); // Potřebujeme t zde
    const t: TFunction = i18nextInstance.getFixedT(locale, 'common');
    const recipe = await loadRecipe(locale, id); // Předání locale a id

    if (!recipe) {
        return { title: t('recipe_not_found') };
    }

    return {
        title: `${recipe.title}${t('page_title_suffix')}`,
        description: recipe.description.substring(0, 160),
    };
}

// Hlavní komponenta stránky
export default async function RecipePage({ params }: RecipePageProps) {
    // Nejprve await params a pak destrukturace
    const { locale, id } = await params;

    // Paralelní načítání dat a překladů s předáním locale a id
    const [recipe, translations] = await Promise.all([
        loadRecipe(locale, id), // Předání locale a id
        getUiTranslations(locale) // Předání locale
    ]);

    if (!recipe) {
        notFound();
    }

    // Použijeme proměnnou locale získanou po await
    return <RecipeDetailClient recipe={recipe} locale={locale} translations={translations} />;
}

// Generování statických parametrů
export async function generateStaticParams() {
    const params: { locale: string; id: string }[] = [];
    try {
        // Přečteme ID receptů např. z českého adresáře
        const baseRecipesDir = path.join(process.cwd(), 'src', 'data', 'recipes', fallbackLng);
        const recipeFiles = await fs.readdir(baseRecipesDir);
        const recipeIds = recipeFiles.filter(f => f.endsWith('.ts')).map(f => f.replace('.ts', ''));

        // Vytvoříme kombinace pro všechny jazyky a ID
        languages.forEach((locale) => {
            recipeIds.forEach((id) => {
                params.push({ locale, id });
            });
        });
    } catch (error) {
        console.error("Error generating static params for recipes:", error);
        // Pokud nastane chyba (např. neexistuje adresář), vrátíme prázdné pole
        // nebo jen parametry pro fallbackLng, pokud chceme.
    }
    return params;
} 