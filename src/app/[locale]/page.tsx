import HomePageClient from "@/components/HomePageClient"; // Naše Client Component
// import { FaInstagram, FaEnvelope } from "react-icons/fa"; // Odstraněno - přesunuto do HomePageHeader
import { Recipe } from "@/types/recipe"; // Aktualizovaný import
import fs from "fs/promises"; // Import pro práci se soubory
import path from "path"; // Import pro práci s cestami
import { initI18nextInstance } from "@/i18n"; // Import naší inicializační funkce
import HomePageHeader from "@/components/HomePageHeader"; // Import nové komponenty

// Parametry stránky (včetně locale)
interface HomePageProps {
    params: {
        locale: string;
    };
}

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

// Přijímáme celé props
export default async function HomePage({ params }: HomePageProps) {
    // Nejprve await params a pak destrukturace
    const { locale } = await params;

    // Nyní používáme přímo proměnnou 'locale'
    console.log("Current Locale:", locale); // Jen pro kontrolu

    // Používáme 'locale' místo 'currentLocale'
    const { t } = await initI18nextInstance(locale, 'common');

    const localizedRecipes = await loadRecipes(locale);

    const instagramUrl = "https://www.instagram.com/thepiggie/";
    const emailAddress = "hello@tomasdinh.cz";

    return (
        <main className="flex min-h-screen flex-col items-center px-6 py-16 md:px-12 md:py-24">
            {/* Vložení nové Client Component pro hlavičku */}
            <HomePageHeader
                title={t('home.title')} // Předání přeloženého titulku
                instagramUrl={instagramUrl}
                emailAddress={emailAddress}
            />

            {/* Předání locale do klienta */}
            <HomePageClient recipes={localizedRecipes} locale={locale} />
        </main>
    );
}

// ... generateStaticParams (pokud existuje) ... 