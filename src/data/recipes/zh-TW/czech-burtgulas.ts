import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
  id: "czech-burtgulas", // Consistent ID
  title: "捷克家常馬鈴薯燉肉 (Buřtguláš)",
  imageUrl: "/images/czech-burtgulas.webp",
  description:
    "馬鈴薯燉肉，又稱為 Buřtguláš，是許多捷克男士引以為傲的食譜。這是一道快速又豐盛的菜餚，絕對能餵飽食量最大的人，而且通常會煮一大鍋放著之後吃。隔夜甚至更美味！那奶油般的口感和軟嫩的馬鈴薯肯定會讓你著迷。",
  ingredients: [
    {
      sectionTitle: "食材",
      servings: "4 人份", // Translated
      items: [
        "500 克 香腸（肥香腸、buřty - 捷克肥香腸，或維也納香腸）",
        "6 顆 大型澱粉質馬鈴薯（C 型，若無則用 B 型）",
        "2 顆 中型洋蔥",
        "炒菜油",
        "2 瓣 大蒜",
        "鹽",
        "黑胡椒（粉）",
        "甜紅椒粉",
        "辣紅椒粉",
        "馬鬱蘭",
        "250 毫升 烹飪用鮮奶油（脂肪含量 10-12%）",
        "中筋麵粉（用於勾芡，約 1-2 湯匙）",
      ],
    },
  ],
  procedure: [
    {
      sectionTitle: "準備",
      steps: [
        "將香腸切成小塊。",
        "將馬鈴薯去皮、洗淨，同樣切成小塊。",
        "將洋蔥去皮並切末。",
        "將大蒜加鹽搗碎。",
        "用電熱水壺燒開水。",
      ],
    },
    {
      sectionTitle: "烹煮",
      steps: [
        "在一個大鍋中，用油將洋蔥炒至半透明。",
        "加入切好的香腸，用鹽和胡椒調味，稍微煎一下，讓肉收緊，這樣之後在燉肉中才不會變得糊爛。",
        "當香腸煎好後，撒上甜紅椒粉和辣紅椒粉。快速拌炒（幾秒鐘），以免紅椒粉燒焦變苦。",
        "立即從水壺倒入滾水，水量剛好蓋過馬鈴薯和香腸。",
        "加入切塊的馬鈴薯和搗碎的大蒜。",
        "用馬鬱蘭調味（可以留一些最後裝飾用）。",
        "煮約 10-15 分鐘，或直到馬鈴薯變軟。",
      ],
    },
    {
      sectionTitle: "勾芡與完成",
      steps: [
        "在一杯冷水（約 100-150 毫升）中，用打蛋器打散中筋麵粉。",
        "將麵粉水慢慢倒入沸騰的燉肉中，同時不斷攪拌使其變稠。",
        "稍微燉煮（至少 5 分鐘），去除生麵粉味。",
        "倒入烹飪用鮮奶油，攪拌均勻，再次稍微煮沸。",
        "根據口味用鹽、胡椒，或可能更多的馬鬱蘭或紅椒粉來調整燉肉的味道和顏色。",
      ],
    },
  ],
  tips: {
    sectionTitle: "道地 Buřtguláš 秘訣", // Translated section title
    items: [
      {
        title: "好香腸是關鍵", // Translated title
        text: "道地的 Buřtguláš 需要高品質的 špekáčky（捷克肥香腸）或 klobása。別在香腸或維也納香腸上省錢，你想要那種風味！", // Translated text
      },
      {
        title: "濃稠度隨你意", // Translated title
        text: "想要濃稠得像水泥？多加點麵粉或多壓碎幾顆馬鈴薯。如果喜歡稀一點，就少用點麵粉或完全不用。", // Translated text
      },
      {
        title: "別怕調味", // Translated title
        text: "燉肉需要有勁！隨意多加點馬鬱蘭、葛縷子籽，或一小撮辣椒讓你暖起來。鹽和胡椒當然是依口味調整。", // Translated text
      },
      {
        title: "隔夜的最棒！", // Translated new tip
        text: "煮一大鍋吧！Buřtguláš 就像真男人。隔天更棒。讓它安靜地在冰箱裡入味吧。",
      },
    ],
  },
  serving: {
    sectionTitle: "如何上桌", // Translated section title
    suggestions: [
      "盛滿一盤熱騰騰的燉肉，搭配一大片新鮮麵包。這是必須的！", // Translated text
      "如果喜歡綠色蔬菜，可以在上面撒些切碎的巴西里或細香蔥，但不是必要的。", // Translated text
    ],
  },
  authorName: "Tomáš Dinh",
  datePublished: "2025-05-01",
  prepTime: "PT15M",
  cookTime: "PT30M",
  totalTime: "PT45M",
  recipeCategory: "主菜", // Translated
  recipeCuisine: "捷克菜", // Translated
  keywords:
    "buřtguláš, 馬鈴薯燉肉, 捷克料理, 食譜, 香腸, 馬鈴薯, 鮮奶油, 快速餐, 豐盛餐點, 家常菜", // Translated keywords
  originCountryCode: "cz",
};
