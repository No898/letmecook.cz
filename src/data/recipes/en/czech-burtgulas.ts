import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
  id: "czech-burtgulas", // Consistent ID
  title: "Czech Homemade Buřtguláš (Potato Goulash)",
  imageUrl: "/images/czech-burtgulas.webp",
  description:
    "Potato goulash, known as buřtguláš, is a proud recipe for many Czech men. It's a quick and hearty dish that reliably fills up even the biggest eaters, and it's common to cook a whole pot for later. It's even better when it sits for a day! The creamy taste and tender potatoes will surely charm you.",
  ingredients: [
    {
      sectionTitle: "Ingredients",
      servings: "4 servings", // Translated
      items: [
        "500 g sausage (fatty sausage, buřty - Czech fat sausage, or wieners)",
        "6 large starchy potatoes (Type C, or Type B if unavailable)",
        "2 medium onions",
        "Oil for frying",
        "2 cloves garlic",
        "Salt",
        "Black pepper (ground)",
        "Sweet paprika (ground)",
        "Hot paprika (ground)",
        "Marjoram",
        "250 ml cooking cream (10-12% fat)",
        "All-purpose flour (for thickening, approx. 1-2 tbsp)",
      ],
    },
  ],
  procedure: [
    {
      sectionTitle: "Preparation",
      steps: [
        "Cut the sausage into smaller cubes.",
        "Peel, wash, and cut the potatoes into smaller cubes as well.",
        "Peel and finely chop the onions.",
        "Crush the garlic with salt.",
        "Boil water in a kettle.",
      ],
    },
    {
      sectionTitle: "Cooking",
      steps: [
        "In a large pot, sauté the onion in oil until translucent.",
        "Add the chopped sausage, season with salt and pepper, and let it brown slightly so it doesn't get mushy in the goulash later.",
        "When the sausage is browned, sprinkle with sweet and hot paprika. Stir briefly (a few seconds) so the paprika doesn't burn.",
        "Immediately pour in boiling water from the kettle, just enough to cover the potatoes and sausage.",
        "Add the diced potatoes and crushed garlic.",
        "Season with marjoram (you can save some for garnishing at the end).",
        "Cook for approximately 10-15 minutes, or until the potatoes are tender.",
      ],
    },
    {
      sectionTitle: "Thickening and Finishing",
      steps: [
        "In a cup of cold water (approx. 100-150 ml), whisk the all-purpose flour.",
        "Slowly pour the flour mixture into the boiling goulash while stirring constantly to thicken it.",
        "Simmer briefly (at least 5 minutes) to cook out the raw flour taste.",
        "Pour in the cooking cream, stir, and bring briefly to a boil again.",
        "Season the goulash to taste with salt, pepper, possibly more marjoram, or paprika for color.",
      ],
    },
  ],
  tips: {
    sectionTitle: "Tips for a Proper Buřtguláš", // Translated section title
    items: [
      {
        title: "The Right Sausage is Key", // Translated title
        text: "A proper buřtguláš needs quality špekáčky (fatty Czech sausage) or klobása. Don't skimp on the sausage or wieners; you want that flavor!", // Translated text
      },
      {
        title: "Thickness to Your Liking", // Translated title
        text: "Want it thick as concrete? Add more flour or mash a few extra potatoes. If you prefer it thinner, use less flour or skip it altogether.", // Translated text
      },
      {
        title: "Don't Be Afraid to Season", // Translated title
        text: "Goulash needs a kick! Feel free to add more marjoram, caraway seeds, or a pinch of chili to warm you up. Salt and pepper to taste, of course.", // Translated text
      },
      {
        title: "Best When It Sits!", // Translated new tip
        text: "Cook a big pot! Buřtguláš is like a real man. Even better the next day. Let it rest peacefully in the fridge.",
      },
    ],
  },
  serving: {
    sectionTitle: "How to Serve It", // Translated section title
    suggestions: [
      "Serve a full plate of hot goulash with a hearty slice of fresh bread. It's a must!", // Translated text
      "If you like greens, you can sprinkle some chopped parsley or chives on top, but it's not essential.", // Translated text
    ],
  },
  authorName: "Tomáš Dinh",
  datePublished: "2025-05-01",
  prepTime: "PT15M",
  cookTime: "PT30M",
  totalTime: "PT45M",
  recipeCategory: "Main Course", // Translated
  recipeCuisine: "Czech", // Translated
  keywords:
    "buřtguláš, potato goulash, czech cuisine, recipe, sausage, potatoes, cream, quick meal, hearty meal, comfort food", // Translated keywords
  originCountryCode: "cz",
};
