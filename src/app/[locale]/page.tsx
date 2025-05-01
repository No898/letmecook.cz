import HomePageClient from "@/components/HomePageClient"; // Zpět k původní komponentě
// import RecipeCarousel from "@/components/RecipeCarousel"; // Odstraněn import karuselu
// import { FaInstagram, FaEnvelope } from "react-icons/fa"; // Odstraněno - přesunuto do HomePageHeader
import { Recipe } from "@/types/recipe"; // Aktualizovaný import
import fs from "fs/promises"; // Import pro práci se soubory
import path from "path"; // Import pro práci s cestami
import { initI18nextInstance } from "@/i18n"; // Import naší inicializační funkce
import HomePageHeader from "@/components/HomePageHeader"; // Import nové komponenty
import { languages } from "@/i18n/settings"; // Import seznamu jazyků

// Pomocná funkce pro načtení receptů
async function loadRecipes(locale: string): Promise<Recipe[]> {
    try {
        const recipesDir = path.join(process.cwd(), 'src', 'data', 'recipes', locale);
        const recipeFiles = await fs.readdir(recipesDir);

        // Přímo zpracujeme Promise.all
        const recipesOrNull = await Promise.all(
            recipeFiles
                .filter((file) => file.endsWith('.ts'))
                .map(async (file) => {
                    const recipeId = file.replace('.ts', '');
                    try {
                        const { recipe } = await import(`@/data/recipes/${locale}/${recipeId}.ts`);
                        return recipe as Recipe;
                    } catch (importError) {
                        console.error(`Error importing recipe ${locale}/${recipeId}:`, importError);
                        return null;
                    }
                })
        );
        return recipesOrNull.filter((recipe): recipe is Recipe => recipe !== null);
    } catch (error) {
        console.error(`Error reading recipes for locale ${locale}:`, error);
        return []; // Vrátíme prázdné pole v případě chyby
    }
}

// Hlavní komponenta stránky - upravená signatura
export default async function HomePage({
    params
}: {
    params: Promise<{ locale: string }>
}) {
    // Nejprve await params a pak destrukturace
    const { locale } = await params;

    // Nyní používáme přímo proměnnou 'locale'
    console.log("Current Locale:", locale); // Jen pro kontrolu

    // Používáme 'locale' místo 'currentLocale'
    const { t } = await initI18nextInstance(locale, 'common');

    const allLocalizedRecipes = await loadRecipes(locale);

    // Rozdělení receptů
    const topRecipes = allLocalizedRecipes.slice(0, 3);
    const bottomRecipes = allLocalizedRecipes.slice(3);

    const instagramUrl = "https://www.instagram.com/thepiggie/";
    const emailAddress = "hello@tomasdinh.cz";

    return (
        // Hlavní kontejner zůstává flex-col
        <main className="flex min-h-screen flex-col items-center px-6 py-16 md:px-12 md:py-24 space-y-8"> {/* Přidán space-y pro mezery */}

            {/* Horní mřížka receptů (první 3) */}
            {topRecipes.length > 0 && (
                <HomePageClient recipes={topRecipes} locale={locale} />
            )}

            {/* Střední část - Záhlaví (název a odkazy) */}
            <HomePageHeader
                title={t('home.title')}
                instagramUrl={instagramUrl}
                emailAddress={emailAddress}
                locale={locale}
                languages={languages} // languages je potřeba naimportovat nebo získat jinak
            />

            {/* Dolní mřížka receptů (zbytek) */}
            {bottomRecipes.length > 0 && (
                <HomePageClient recipes={bottomRecipes} locale={locale} />
            )}
        </main>
    );
}

// ... generateStaticParams (pokud existuje) ... 