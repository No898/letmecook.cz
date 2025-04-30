// src/types/recipe.ts

// Definice struktury receptu
export interface RecipeIngredientSection {
    sectionTitle: string;
    servings?: string;
    items: string[];
}

export interface RecipeProcedureSection {
    sectionTitle: string;
    steps: string[];
    briefSteps?: string[];
    videoUrl?: string;
}

export interface RecipeTip {
    title: string;
    text: string;
}

export interface Recipe {
    id: string;
    title: string;
    vietnameseTitle?: string;
    imageUrl?: string;
    description: string;
    ingredients: RecipeIngredientSection[];
    procedure: RecipeProcedureSection[];
    tips?: {
        sectionTitle: string;
        items: RecipeTip[];
    };
    serving: {
        sectionTitle: string;
        suggestions: string[];
    };
    authorName: string;
    datePublished: string; // Formát YYYY-MM-DD
    prepTime?: string; // ISO 8601 duration (např. "PT30M")
    cookTime?: string; // ISO 8601 duration (např. "PT20M")
    totalTime?: string; // ISO 8601 duration (např. "PT50M")
    recipeCategory?: string; // Kategorie (např. "Hlavní chod")
    recipeCuisine?: string; // Kuchyně (např. "Vietnamská")
    keywords?: string; // Klíčová slova oddělená čárkou
} 