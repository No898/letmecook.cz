import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
  id: "vietnamese-thit-kho-tau",
  title: "Homemade Vietnamese Caramelized Pork Belly with Eggs - Thịt Kho Tàu",
  imageUrl: "/images/vietnamese-thit-kho-tau.webp", // Added image URL
  description:
    // Adjusted description based on user's final CS version
    "This is a Vietnamese staple you just gotta love. A proper piece of pork belly, slow-cooked until it almost falls apart, soaked in a sweet and salty sauce from caramel and coconut water. Serve it with rice, and you've got a meal fit for a king!",
  ingredients: [
    {
      sectionTitle: "Ingredients",
      servings: "4-6 servings",
      items: [
        // Adjusted based on user's final CS version
        "1 kg pork belly (ideally with skin, pick a piece with a good fat-to-meat ratio, whatever you like)",
        "6-8 eggs", // Simplified based on user's final CS version
        "1-2 young coconuts (approx. 500-700 ml fresh coconut water) or water",
        "3-4 tbsp granulated sugar",
        "1 tbsp oil or water (for caramel)",
        "4-5 tbsp fish sauce (nước mắm, good quality)",
        "2-3 cloves garlic (chopped or pressed)",
        "2 shallots (or 1 smaller onion, finely chopped)",
        "1/2 tsp freshly ground black pepper",
        "Pinch of salt",
        "Optional: a bit of dark soy sauce for darker color (if caramel isn't dark enough)",
        "Optional: 1-2 chili peppers (for spiciness)",
      ],
    },
  ],
  procedure: [
    {
      sectionTitle: "Prepping Meat and Eggs",
      steps: [
        "Hard boil the eggs (approx. 8-10 minutes), cool in cold water, and peel.",
        "Clean the pork belly, optionally singe the skin over a flame to remove bristles. Cut into larger cubes (approx. 3-4 cm).",
        "Briefly blanch the meat in boiling water (2-3 minutes) to remove impurities. Then rinse with cold water and drain.",
        "In a bowl, mix the meat with chopped shallots, garlic, pepper, a pinch of salt, and about 2 tbsp of fish sauce. Let marinate for at least 30 minutes (or longer in the fridge).",
      ],
    },
    {
      sectionTitle: "Making the Caramel (Nước màu)",
      steps: [
        "In a heavy-bottomed pot (the one you'll cook the meat in), heat 1 tbsp of oil or water over medium heat.",
        // Removed warning about speed based on user's final CS version
        "Add the sugar and let it dissolve and caramelize, stirring constantly.",
        "Stir until the caramel reaches a deep amber to brown color (like dark honey or coca-cola). Be careful not to burn it, or it will be bitter.",
        "Once the caramel has the right color, carefully pour in a little hot water or coconut water (approx. 50 ml). Watch out for splattering! Stir quickly to dissolve the caramel.",
      ],
    },
    {
      sectionTitle: "Cooking (Kho)",
      steps: [
        "Add the marinated meat to the pot with the caramel and sear it quickly on all sides.",
        "Add the remaining fish sauce and dark soy sauce (if using), stir.",
        "Pour in the fresh coconut water (or regular water) so the meat is almost submerged.",
        "Bring to a boil, then reduce the heat to the minimum. Skim off any foam that forms on the surface to keep the sauce clear.",
        "Add the peeled hard-boiled eggs (and chili peppers, if using). The eggs should be submerged in the sauce.",
        "Cook (kho) very slowly on low heat without a lid for at least 1.5 to 2 hours, or until the meat is very tender and the fat is almost translucent. Stir gently occasionally.",
        "During cooking, the sauce will reduce, thicken, and get darker. The meat and eggs will absorb the flavors beautifully.",
        "Taste at the end and adjust seasoning with sugar or fish sauce if needed.",
      ],
    },
  ],
  tips: {
    sectionTitle: "My Tricks for the Best Thịt Kho", // Adjusted title
    items: [
      {
        title: "Meat is Key", // Adjusted title
        // Adjusted text based on user's final CS version
        text: "Get pork belly with the skin on, that's the stuff. The fat makes it juicy, and the skin gets melt-in-your-mouth tender. Don't be scared!",
      },
      {
        title: "Coconut Water? Heck Yeah!", // Adjusted title
        // Adjusted text based on user's final CS version
        text: "Fresh coconut water from a young coconut gives it that extra kick. If you can't find it, grab the boxed stuff (100% though, no extra crap), or heck, just use water. Sigh.", // Added sigh equivalent
      },
      {
        title: "Don't Mess Up the Caramel!", // Adjusted title
        // Adjusted text based on user's final CS version
        text: "Getting that dark caramel color right is an art. Go darker if you dare, but watch it! Burn it, and you'll have to start over.",
      },
      {
        title: "Slow is the Way (Kho)", // Adjusted title
        text: "'Kho' means you can't rush it. Nice and slow, low heat. That's the secret to tender meat and top-notch flavor.",
      },
      // Removed reheating tip based on user's final CS version
    ],
  },
  serving: {
    sectionTitle: "How to Plate It Up", // Adjusted title
    suggestions: [
      // Adjusted text based on user's final CS version
      "With rice, obviously! Pile on a good portion of hot thịt kho, let it swim in the sauce.",
      // Adjusted text based on user's final CS version
      "Don't forget the egg, cut it in half. And drown it in that glorious sauce.",
      // Adjusted text based on user's final CS version
      "Some pickled veggies (dưa món or dưa giá) or a salad on the side cuts through the richness.",
    ],
  },
  authorName: "Tomáš Dinh",
  datePublished: "2025-05-01",
  prepTime: "PT45M",
  cookTime: "PT2H",
  totalTime: "PT2H45M",
  recipeCategory: "Main Course",
  recipeCuisine: "Vietnamese",
  keywords:
    "thịt kho tàu, thịt kho trứng, caramelized pork belly, vietnamese cuisine, recipe, coconut water, fish sauce, eggs, homemade recipe, pork belly",
  originCountryCode: "vi",
};
