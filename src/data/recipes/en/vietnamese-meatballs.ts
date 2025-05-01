import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
    id: "vietnamese-meatballs",
    title:
        "Authentic Vietnamese Meatballs (Thịt viên) – Homemade Hanoi Recipe",
    nationalTitle: "Thịt viên", // Stays the same
    imageUrl: "/images/vietnamese-meatballs.webp", // Stays the same
    description:
        "Vietnamese fried meatballs (thịt viên) ready to be served. Traditionally, they don't contain breadcrumbs or eggs – cornstarch and well-mixed meat provide cohesion.",
    ingredients: [
        {
            sectionTitle: "Meatballs",
            items: [
                "500g ground pork (ideally with ~30% fat, e.g., shoulder or belly)",
                "2 shallots (or 1 small onion; finely chopped)",
                "3 cloves garlic (finely chopped)",
                "1–2 tbsp fish sauce (nước mắm, to taste)",
                "1/2 tsp ground black pepper",
                "1 tsp sugar (or a pinch of hạt nêm / MSG)",
                "2 tsp (10-15g) cornstarch or tapioca starch",
                "Vegetable oil for frying",
            ],
        },
        {
            sectionTitle: "Dipping Sauce: Nước Chấm",
            items: [
                "3 tbsp fish sauce (nước mắm)",
                "6 tbsp warm water",
                "2 tbsp sugar",
                "2 tbsp lime juice (or lemon juice)",
                "2 cloves garlic (finely chopped or pressed)",
                "1 small chili pepper (finely chopped, seeds removed if you don't want it too spicy)",
                "Optional: a few julienned carrots for garnish",
            ],
        },
    ],
    procedure: [
        {
            sectionTitle: "Preparing the Meat Mixture",
            steps: [
                "Place the ground pork in a bowl and add the chopped shallots and garlic.",
                "Season with fish sauce, sugar (or hạt nêm), and ground pepper. Finally, add the starch.",
                "Mix everything thoroughly – ideally by hand or with a wooden spoon for several minutes until the mixture becomes springy and slightly sticky (protein is released).",
                "Let the mixture rest in the refrigerator for about 10–15 minutes to marinate the meat and allow flavors to meld.",
            ],
            briefSteps: [
                "Mix meat, shallots, garlic, seasonings, and starch.",
                "Let rest in the fridge for 10-15 min.",
            ],
        },
        {
            sectionTitle: "Shaping the Meatballs",
            steps: [
                "Using damp or lightly oiled hands, shape the rested mixture into small balls about 3–4 cm in diameter (ping pong ball size).",
                "Do not press too hard when rolling the meat with your palms to avoid tough meatballs, but form them firmly so they don't fall apart during frying.",
                "Place the finished meatballs on a plate. (This batch yields approximately 15–20 meatballs.)",
            ],
            briefSteps: ["Shape into firm balls (approx. 3-4 cm)."],
        },
        {
            sectionTitle: "Frying",
            steps: [
                "In a large pan or wok, heat a layer of oil (about 1–2 cm) over medium heat.",
                "Fry the meatballs slowly on all sides until golden brown. Don't overheat the oil, or they might burn on the outside while remaining raw inside.",
                "Turn the meatballs to ensure even cooking; this usually takes about 5–7 minutes in total.",
                "Remove the fried meatballs and let them drain on paper towels.",
            ],
            briefSteps: [
                "Fry meatballs over medium heat until golden brown (5-7 min).",
                "Drain on paper towels.",
            ],
            videoUrl: "/videos/vietnamese-meat-balls.mp4", // Stays the same
        },
        {
            sectionTitle: "Sauce: Nước Chấm",
            steps: [
                "In a bowl, combine warm water and sugar, stirring until the sugar dissolves.",
                "Add fish sauce and lime juice, stir.",
                "Mix in the chopped garlic and chili.",
                "If desired, add a few julienned carrots for color.",
                "Taste the sauce – it should be sweet, salty, and slightly sour. Adjust with water (for a milder taste) or lime juice (for more sourness) if needed.",
            ],
            briefSteps: [ // Added brief steps for sauce
                "Dissolve sugar in warm water.",
                "Add fish sauce and lime juice.",
                "Stir in garlic and chili.",
                "Adjust seasoning to taste.",
            ],
        },
    ],
    tips: {
        sectionTitle: "Notes and Tips",
        items: [
            {
                title: "Authentic Composition",
                text: "Authentic Vietnamese recipes do not add eggs or breadcrumbs. The mixture achieves the necessary cohesion thanks to the starch and thorough mixing of the meat with spices.",
            },
            {
                title: "Alternative: Cooking in Soup",
                text: "These meatballs can also be cooked in soup instead of frying. Carefully drop them into boiling broth or soup; the meat will firm up, and the meatballs will float to the surface when cooked. This method is used, for example, in light vegetable soups (canh) served with home-cooked rice.",
            },
        ],
    },
    serving: {
        sectionTitle: "Serving and Sauces",
        suggestions: [
            "As a main dish with rice: Fried thịt viên are often served in Hanoi with steamed jasmine rice, either plain or mixed with a sauce (e.g., thịt viên sốt cà chua - in tomato sauce, or sốt mắm gừng - in a fish sauce-ginger glaze).",
            "With noodles (bún): Served with cold bún noodles, pickled vegetables, and a sweet and sour fish sauce (nước mắm chua ngọt) dressing, similar to bún chả.",
            "In soup: They are a common ingredient in soups, from light vegetable broths (canh) to heartier noodle soups like bún mọc.",
            "Dips and Sauces: Traditionally, the prepared nước chấm (see recipe above) is served for dipping. Chili sauce (tương ớt) can be an alternative. If the meatballs are served in another sauce (tomato, etc.), a separate dip is not necessary.",
        ],
    },
    authorName: "Tomáš Dinh", // Stays the same
    datePublished: "2025-04-29", // Or update to current date? Keeping original for now.
    prepTime: "PT30M", // Stays the same
    cookTime: "PT20M", // Stays the same
    totalTime: "PT50M", // Stays the same
    recipeCategory: "Main course",
    recipeCuisine: "Vietnamese",
    keywords:
        "vietnamese meatballs, thịt viên, ground pork, recipe, fish sauce, nước chấm, fried meatballs, vietnamese cuisine, hanoi",
    originCountryCode: 'vi'
}; 