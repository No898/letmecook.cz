import HomePageClient from "@/components/HomePageClient";
import { Recipe } from "@/types/recipe";
import fs from "fs/promises";
import path from "path";
import { getTranslations } from "@/i18n/server";
import HomePageHeader from "@/components/HomePageHeader";
import { languages } from "@/i18n/settings";

// Pomocná funkce pro načtení receptů (používá alias)
async function loadRecipes(locale: string): Promise<Recipe[]> {
    try {
        const recipesDir = path.join(process.cwd(), 'src', 'data', 'recipes', locale);
        const recipeFiles = await fs.readdir(recipesDir);

        const recipesOrNull = await Promise.all(
            recipeFiles
                .filter((file) => file.endsWith('.ts'))
                .map(async (file) => {
                    const recipeId = file.replace('.ts', '');
                    try {
                        const { recipe } = await import(`@/data/recipes/${locale}/${recipeId}.ts`);
                        return recipe as Recipe;
                    } catch (importError: unknown) {
                        console.error(`Error importing recipe ${locale}/${recipeId}:`, importError);
                        return null;
                    }
                })
        );
        return recipesOrNull.filter((recipe): recipe is Recipe => recipe !== null);
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: unknown }).code === 'ENOENT') {
            console.log(`No recipes found for locale ${locale}, directory likely missing.`);
        } else {
            console.error(`Error reading recipes for locale ${locale}:`, error);
        }
        return [];
    }
}

// Hlavní komponenta stránky
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { t } = await getTranslations(locale, 'common');
    // Paralelní načítání receptů
    const allLocalizedRecipes = await loadRecipes(locale);

    const instagramUrl = "https://www.instagram.com/thepiggie/";
    const emailAddress = "hello@tomasdinh.cz";

    // Připravit lokalizované popisky jazyků a texty nápovědy pro přepínač
    const languageLabels: Record<string, string> = Object.fromEntries(
        languages.map((l) => [l, t(`lang.${l}`)])
    );

    // V češtině použijeme akuzativ (na češtinu/angličtinu/vietnamštinu/tchajwanštinu)
    const languageLabelsForSentence: Record<string, string> = locale === 'cs'
        ? Object.fromEntries(
            languages.map((l) => [
                l,
                t(`langAcc.${l}`, { defaultValue: languageLabels[l] })
            ])
          )
        : languageLabels;

    const switchTitles: Record<string, string> = Object.fromEntries(
        languages.map((l) => [l, t('switch_to_language', { language: languageLabelsForSentence[l] })])
    );

    const altTexts: Record<string, string> = Object.fromEntries(
        languages.map((l) => [l, t('language_image_alt', { language: languageLabelsForSentence[l] })])
    );

    const hintDesktop = t('lang_hint.desktop');
    const hintMobile = t('lang_hint.mobile');

    return (
        <div className="flex min-h-screen flex-col items-center px-6 py-16 md:px-12 md:py-24 space-y-8">
            <div className="relative z-50 order-first md:order-none w-full flex justify-center isolate">
                <HomePageHeader
                    title={t('home.title')}
                    instagramUrl={instagramUrl}
                    emailAddress={emailAddress}
                    locale={locale}
                    languages={languages}
                    switchTitles={switchTitles}
                    altTexts={altTexts}
                    hintDesktop={hintDesktop}
                    hintMobile={hintMobile}
                />
            </div>
            <HomePageClient recipes={allLocalizedRecipes} locale={locale} />
        </div>
    );
}
