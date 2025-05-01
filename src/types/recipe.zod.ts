import { z } from "zod";

// Schéma pro sekci ingrediencí
const RecipeIngredientSectionSchema = z.object({
  sectionTitle: z.string().min(1), // Název sekce nesmí být prázdný
  servings: z.string().optional(), // Počet porcí je volitelný string
  items: z.array(z.string().min(1)), // Položky jsou pole neprázdných stringů
});

// Schéma pro sekci postupu
const RecipeProcedureSectionSchema = z.object({
  sectionTitle: z.string().min(1),
  steps: z.array(z.string().min(1)), // Pole neprázdných stringů
  briefSteps: z.array(z.string().min(1)).optional(), // Volitelné pole neprázdných stringů
  videoUrl: z.string().startsWith("/").optional(), // Změněno: Povolíme string začínající '/', nebo žádnou hodnotu
});

// Schéma pro tip
const RecipeTipSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
});

// Hlavní schéma receptu
export const RecipeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  imageUrl: z.string().optional(), // Volitelný string
  description: z.string().min(1),
  ingredients: z.array(RecipeIngredientSectionSchema).min(1), // Pole sekcí ingrediencí, musí být alespoň jedna sekce
  procedure: z.array(RecipeProcedureSectionSchema).min(1), // Pole sekcí postupu, musí být alespoň jedna sekce
  tips: z
    .object({
      // Objekt s tipy je volitelný
      sectionTitle: z.string().min(1),
      items: z.array(RecipeTipSchema).min(1), // Musí obsahovat alespoň jeden tip, pokud sekce existuje
    })
    .optional(),
  serving: z.object({
    // Servírování je povinné
    sectionTitle: z.string().min(1),
    suggestions: z.array(z.string().min(1)).min(1), // Musí obsahovat alespoň jeden návrh
  }),
  authorName: z.string().min(1),
  // Kontrola formátu data YYYY-MM-DD pomocí regexu
  datePublished: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  // Kontrola formátu ISO 8601 trvání pomocí regexu (zjednodušený pro PT...M, PT...H...)
  prepTime: z
    .string()
    .regex(
      /^PT(?:(\d+)H)?(?:(\d+)M)?$/,
      "Time must be in ISO 8601 duration format (e.g., PT1H30M or PT45M)"
    )
    .optional(),
  cookTime: z
    .string()
    .regex(
      /^PT(?:(\d+)H)?(?:(\d+)M)?$/,
      "Time must be in ISO 8601 duration format"
    )
    .optional(),
  totalTime: z
    .string()
    .regex(
      /^PT(?:(\d+)H)?(?:(\d+)M)?$/,
      "Time must be in ISO 8601 duration format"
    )
    .optional(),
  recipeCategory: z.string().optional(),
  recipeCuisine: z.string().optional(),
  keywords: z.string().optional(), // Klíčová slova jako jeden string
  originCountryCode: z.string().length(2).optional(), // Kód země ISO 3166-1 alpha-2 (2 písmena), volitelný
});

// Můžeme také exportovat odvozený TypeScript typ, pokud bychom chtěli nahradit původní
// export type Recipe = z.infer<typeof RecipeSchema>;
