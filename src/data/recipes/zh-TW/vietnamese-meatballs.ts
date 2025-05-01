import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
    id: "vietnamese-meatballs",
    title:
        "道地越南肉丸 (Thịt viên) – 河內家常食譜",
    vietnameseTitle: "Thịt viên", // Vietnamese title remains the same
    imageUrl: "/images/vietnamese-meatballs.webp", // Stays the same
    description:
        "準備上桌的越式炸肉丸 (thịt viên)。傳統做法不含麵包屑或雞蛋——黏稠度來自澱粉和充分混合的肉。",
    ingredients: [
        {
            sectionTitle: "肉丸",
            items: [
                "500克 豬絞肉 (最好帶有約30%脂肪，例如：豬肩肉或五花肉)",
                "2顆 紅蔥頭 (或 1顆 小型洋蔥；切末)",
                "3瓣 大蒜 (切末)",
                "1–2湯匙 魚露 (nước mắm，依口味調整)",
                "1/2茶匙 黑胡椒粉",
                "1茶匙 糖 (或少許 hạt nêm / 味精)",
                "2茶匙 (10-15克) 玉米澱粉或太白粉",
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
                "將所有材料徹底混合——最好用手或木勺攪拌幾分鐘，直到肉餡變得有彈性且略帶黏性 (蛋白質釋出)。",
                "將肉餡放入冰箱冷藏約10–15分鐘，讓肉入味，味道融合。",
            ],
            briefSteps: [
                "混合絞肉、紅蔥頭、大蒜、調味料和澱粉。",
                "冷藏靜置10-15分鐘。",
            ],
        },
        {
            sectionTitle: "捏製肉丸",
            steps: [
                "雙手沾濕或抹少許油，將靜置後的肉餡捏成直徑約3–4公分的小圓球 (乒乓球大小)。",
                "用手掌滾動肉餡時不要太用力，以免肉丸過硬，但要捏緊實，以免油炸時散開。",
                "將捏好的肉丸放在盤子上。(此份量約可製作15–20顆肉丸。)",
            ],
            briefSteps: ["捏成緊實的肉丸 (約3-4公分)。"],
        },
        {
            sectionTitle: "油炸",
            steps: [
                "在較大的平底鍋或炒鍋中，用中火加熱一層油 (約1–2公分高)。",
                "用中小火慢慢將肉丸各面炸至金黃色。注意油溫不要太高，以免外焦內生。",
                "翻動肉丸以確保受熱均勻；總共約需5–7分鐘。",
                "將炸好的肉丸取出，放在廚房紙巾上吸油。",
            ],
            briefSteps: [
                "用中火將肉丸炸至金黃 (5-7分鐘)。",
                "放在廚房紙巾上吸油。",
            ],
            videoUrl: "/videos/vietnamese-meat-balls.mp4", // Stays the same
        },
        {
            sectionTitle: "沾醬：Nước Chấm",
            steps: [
                "在碗中混合溫水和糖，攪拌至糖溶解。",
                "加入魚露和青檸汁，攪拌均勻。",
                "拌入蒜末和辣椒末。",
                "如果喜歡，可以加入少許紅蘿蔔絲增色。",
                "嚐嚐味道——應該是甜、鹹、微酸的平衡。可依口味用溫水 (降低鹹度) 或青檸汁 (增加酸度) 調整。",
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
    originCountryCode: 'vi'
}; 