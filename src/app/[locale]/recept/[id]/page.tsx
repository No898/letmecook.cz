import { notFound } from "next/navigation";
import RecipeDetailClient from "@/components/RecipeDetailClient";
import { getTranslations } from "@/i18n/server";
import { languages, fallbackLng } from "@/i18n/settings";
import type { Recipe } from "@/types/recipe";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

const RecipeIngredientSectionSchema = z.object({
    sectionTitle: z.string(),
    servings: z.string().optional(),
    items: z.array(z.string()),
});

const RecipeProcedureSectionSchema = z.object({
    sectionTitle: z.string(),
    steps: z.array(z.string()),
    briefSteps: z.array(z.string()).optional(),
});

const RecipeTipSchema = z.object({
    title: z.string(),
    text: z.string(),
});

const RecipeSchema = z.object({
    id: z.string(),
    title: z.string(),
    imageUrl: z.string().optional(),
    description: z.string(),
    ingredients: z.array(RecipeIngredientSectionSchema),
    procedure: z.array(RecipeProcedureSectionSchema),
    tips: z.object({
        sectionTitle: z.string(),
        items: z.array(RecipeTipSchema),
    }).optional(),
    serving: z.object({
        sectionTitle: z.string(),
        suggestions: z.array(z.string()),
    }),
    authorName: z.string(),
    datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    totalTime: z.string().optional(),
    recipeCategory: z.string().optional(),
    recipeCuisine: z.string().optional(),
    keywords: z.string().optional(),
    originCountryCode: z.string().optional(),
});

// Vylepšená funkce pro načtení a validaci receptu
async function loadRecipe(locale: string, id: string): Promise<Recipe | null> {
    const validatedLocale = languages.includes(locale) ? locale : fallbackLng;
    try {
        const recipeModule = await import(`@/data/recipes/${validatedLocale}/${id}.ts`);

        const validationResult = RecipeSchema.safeParse(recipeModule.recipe);

        if (!validationResult.success) {
            console.error(`Recipe data validation failed for ${validatedLocale}/${id}:`, validationResult.error.format());
            return null;
        }
        return validationResult.data as Recipe;

    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error) {
            const err = error as { code?: string };
            if (err.code !== 'ERR_MODULE_NOT_FOUND') {
                console.error(`Error loading recipe ${validatedLocale}/${id}:`, error);
            }
        } else {
            console.error(`An unexpected error occurred loading recipe ${validatedLocale}/${id}:`, error);
        }
        return null;
    }
}

// Generování metadat s použitím getTranslations
export async function generateMetadata(
    { params }: { params: Promise<{ locale: string; id: string }> }
): Promise<{ title: string; description?: string }> {
    const { locale, id } = await params;
    const validatedLocale = languages.includes(locale) ? locale : fallbackLng;

    const [{ t }, recipe] = await Promise.all([
        getTranslations(validatedLocale, ['common', 'recipe']),
        loadRecipe(validatedLocale, id)
    ]);

    if (!recipe) {
        return { title: t('common:recipe_not_found') };
    }

    return {
        title: `${recipe.title} | ${t('common:site_name')}`,
        description: recipe.description?.substring(0, 160) || t('recipe:default_description'),
    };
}

export default async function RecipePage(
    { params }: { params: Promise<{ locale: string; id: string }> }
) {
    const { locale, id } = await params;
    const validatedLocale = languages.includes(locale) ? locale : fallbackLng;

    const [{ t }, recipe] = await Promise.all([
        getTranslations(validatedLocale, ['common', 'recipe']),
        loadRecipe(validatedLocale, id)
    ]);

    if (!recipe) {
        notFound();
    }

    const clientTranslations = {
        back_to_recipes: t('common:back_to_recipes'),
        share_label: t('recipe:share_label'),
        share_on_facebook: t('recipe:share_on_facebook'),
        share_on_whatsapp: t('recipe:share_on_whatsapp'),
        share_on_x: t('recipe:share_on_x'),
        share_via_email: t('recipe:share_via_email'),
        copy_link: t('recipe:copy_link'),
        link_copied: t('recipe:link_copied'),
        copied_tooltip: t('recipe:copied_tooltip'),
        detailed_view: t('recipe:detailed_view'),
        brief_view: t('recipe:brief_view'),
        video_fallback: t('recipe:video_fallback'),
        ingredients_title: t('recipe:ingredients_title'),
        instructions_title: t('recipe:instructions_title'),
        prep_time_label: t('recipe:prep_time_label'),
        cook_time_label: t('recipe:cook_time_label'),
        servings_label: t('recipe:servings_label'),
        difficulty_label: t('recipe:difficulty_label'),
        nutrition_facts_title: t('recipe:nutrition_facts_title'),
    };

    return <RecipeDetailClient
        recipe={recipe}
        locale={validatedLocale}
        translations={clientTranslations}
    />;
}

// Vylepšené generování statických parametrů
export async function generateStaticParams() {
    const params: { locale: string; id: string }[] = [];
    const recipeDataBasePath = path.join(process.cwd(), 'src', 'data', 'recipes');

    try {
        for (const locale of languages) {
            const localeDir = path.join(recipeDataBasePath, locale);
            try {
                const recipeFiles = await fs.readdir(localeDir);
                const recipeIds = recipeFiles
                    .filter(file => file.endsWith('.ts') && !file.startsWith('_')) // Ignorujeme pomocné soubory
                    .map(file => file.replace('.ts', ''));

                for (const id of recipeIds) { params.push({ locale, id }); }
            } catch (error: unknown) {
                if (typeof error === 'object' && error !== null) {
                    const code = 'code' in error ? (error as { code?: unknown }).code : undefined;
                    const message = 'message' in error ? (error as { message?: unknown }).message : 'Unknown error';

                    if (code !== 'ENOENT') {
                        console.warn(`Could not read recipes for locale ${locale}:`, message, error);
                    }
                } else {
                    console.warn(`An unexpected error occurred reading recipes for locale ${locale}:`, error);
                }
            }
        }
    } catch (error: unknown) {
        console.error("Fatal error during generateStaticParams for recipes:", error);
    }

    console.log(`Generated ${params.length} static recipe paths.`);
    return params;
} 