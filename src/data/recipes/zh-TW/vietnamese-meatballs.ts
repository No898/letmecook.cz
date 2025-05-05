import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
  id: "vietnamese-meatballs",
  title: "道地越南肉丸 (Thịt viên): 河內家常食譜",
  imageUrl: "/images/vietnamese-meatballs.webp", // Stays the same
  description:
    "越式炸肉丸 (thịt viên) 已準備好上桌。傳統上不含麵包屑或雞蛋。黏稠度來自太白粉和充分混合的肉。",
  ingredients: [
    {
      sectionTitle: "肉丸",
      items: [
        "500 克 豬絞肉 (最好帶有約 30% 脂肪，例如：豬肩肉或五花肉)",
        "2 顆 紅蔥頭 (或 1 顆小洋蔥；切末)",
        "3 瓣 大蒜 (切末)",
        "1 至 2 湯匙 魚露 (nước mắm，依口味調整)",
        "1/2 茶匙 黑胡椒粉",
        "1 茶匙 糖 (或少許 hạt nêm / 味精)",
        "2 茶匙 (10 至 15 克) 玉米澱粉或太白粉",
        "植物油 (用於油炸)",
      ],
    },
    {
      sectionTitle: "沾醬：Nước Chấm",
      items: [
        "3湯匙 魚露 (nước mắm)",
        "6湯匙 溫水",
        "2湯匙 糖",
        "2湯匙 青檸汁 (或檸檬汁)",
        "2瓣 大蒜 (切末或壓泥)",
        "1根 小辣椒 (切末，若不喜辣可去籽)",
        "可選：少許紅蘿蔔絲裝飾",
      ],
    },
  ],
  procedure: [
    {
      sectionTitle: "準備肉餡",
      steps: [
        "將豬絞肉放入碗中，加入紅蔥頭末和大蒜末。",
        "用魚露、糖 (或 hạt nêm) 和胡椒粉調味。最後加入澱粉。",
        "徹底混合所有材料，最好用手或木勺攪拌幾分鐘，直到混合物變得有彈性並略帶黏性 (蛋白質釋出)。",
        "將肉餡放入冰箱冷藏約 10 至 15 分鐘，讓肉入味，味道融合。",
      ],
      briefSteps: [
        "混合絞肉、紅蔥頭、大蒜、調味料和澱粉。",
        "冷藏靜置10-15分鐘。",
      ],
    },
    {
      sectionTitle: "捏製肉丸",
      steps: [
        "雙手沾濕或抹少許油，將靜置後的肉餡捏成直徑約 3 至 4 公分的小圓球 (乒乓球大小)。",
        "捏肉丸時，手掌不要太用力，以免做出來的肉丸太硬，但要捏緊實，以免油炸時散開。",
        "將捏好的肉丸放在盤子上。(此份量約可製作 15 至 20 顆肉丸。)",
      ],
      briefSteps: ["捏成緊實的肉丸 (約3-4公分)。"],
    },
    {
      sectionTitle: "油炸",
      steps: [
        "在較大的平底鍋或炒鍋中，用中火加熱一層油 (約 1 至 2 公分高)。",
        "用慢火將肉丸各面炸至金黃色。不要用太高溫，以免外層燒焦而內部未熟。",
        "翻動肉丸以確保受熱均勻；總共約需 5 至 7 分鐘。",
        "將炸好的肉丸撈起，放在廚房紙巾上瀝乾油分。",
      ],
      briefSteps: ["用中火將肉丸炸至金黃 (5-7分鐘)。", "放在廚房紙巾上吸油。"],
    },
    {
      sectionTitle: "沾醬：Nước Chấm",
      steps: [
        "在碗中混合溫水和糖，攪拌至糖溶解。",
        "加入魚露和青檸汁，攪拌均勻。",
        "拌入蒜末和辣椒末。",
        "如果喜歡，可以加入少許紅蘿蔔絲增色。",
        "嚐嚐醬汁的味道。應該是甜、鹹、微酸。可依需要加水 (使味道更溫和) 或檸檬汁 (增加酸度) 調整。",
      ],
      briefSteps: [
        "溫水溶解糖。",
        "加入魚露、青檸汁。",
        "拌入蒜末、辣椒末。",
        "調整至喜愛的口味。",
      ],
    },
  ],
  tips: {
    sectionTitle: "備註與提示",
    items: [
      {
        title: "道地做法",
        text: "道地的越南食譜不加雞蛋或麵包屑。肉餡依靠澱粉和與調味料的充分混合來達到必要的黏合度。",
      },
      {
        title: "替代方式：湯煮",
        text: "這些肉丸也可以放入湯中煮熟，而非油炸。小心地將肉丸放入沸騰的高湯或湯中；肉會變緊實，煮熟後會浮起。這種方法常用於搭配家常飯的清淡蔬菜湯 (canh)。",
      },
    ],
  },
  serving: {
    sectionTitle: "食用方式與醬料",
    suggestions: [
      "作為主菜配飯：在河內，炸肉丸常搭配蒸好的茉莉香米飯，可直接食用或拌入醬汁 (例如：thịt viên sốt cà chua - 番茄醬肉丸，或 sốt mắm gừng - 薑味魚露醬)。",
      "搭配米線 (bún)：搭配冷的越南米線、越式醃菜和酸甜魚露醬 (nước mắm chua ngọt) 作為拌醬，類似越南烤肉米線 (bún chả)。",
      "加入湯中：肉丸是湯品的常見配料，從清淡的蔬菜湯 (canh) 到較濃郁的米線湯如越南豬腳米線 (bún mọc) 都可見。",
      "沾醬：傳統上搭配調製好的 nước chấm (見上方食譜) 沾食。也可選用辣椒醬 (tương ớt)。若肉丸已搭配其他醬汁 (如番茄醬等) 上桌，則不需另外準備沾醬。",
    ],
  },
  authorName: "Tomáš Dinh", // Stays the same
  datePublished: "2025-04-29", // Stays the same
  prepTime: "PT30M", // Stays the same
  cookTime: "PT20M", // Stays the same
  totalTime: "PT50M", // Stays the same
  recipeCategory: "主菜",
  recipeCuisine: "越南菜",
  keywords:
    "越南肉丸, thịt viên, 豬絞肉, 食譜, 魚露, nước chấm, 炸肉丸, 越南料理, 河內", // Traditional Chinese keywords
  originCountryCode: "vi",
};
