import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
  id: "czech-potato-goulash", // Consistent ID
  title: "Goulash Khoai Tây Kiểu Séc Nhà Làm (Buřtguláš)",
  imageUrl: "/images/czech-burtgulas.webp",
  description:
    "Goulash khoai tây, hay còn gọi là buřtguláš, là công thức tự hào của nhiều đấng mày râu Séc. Đây là món ăn nhanh chóng, thịnh soạn, đảm bảo làm no bụng cả những người ăn khỏe nhất, và nấu cả nồi lớn để dành là chuyện thường. Để qua đêm thậm chí còn ngon hơn! Vị kem béo ngậy và khoai tây mềm dẻo chắc chắn sẽ quyến rũ bạn.",
  ingredients: [
    {
      sectionTitle: "Nguyên liệu",
      servings: "4 phần ăn", // Translated
      items: [
        "500 g xúc xích (loại nhiều mỡ, buřty - xúc xích mỡ của Séc, hoặc xúc xích thường)",
        "6 củ khoai tây lớn, loại bột (Loại C, hoặc loại B nếu không có)",
        "2 củ hành tây vừa",
        "Dầu ăn để chiên",
        "2 tép tỏi",
        "Muối",
        "Tiêu đen (xay)",
        "Ớt bột paprika ngọt",
        "Ớt bột paprika cay",
        "Kinh giới cay (marjoram)",
        "250 ml kem nấu ăn (10-12% béo)",
        "Bột mì đa dụng (để làm đặc, khoảng 1-2 muỗng canh)",
      ],
    },
  ],
  procedure: [
    {
      sectionTitle: "Chuẩn bị",
      steps: [
        "Thái xúc xích thành những miếng vuông nhỏ.",
        "Gọt vỏ khoai tây, rửa sạch và cũng thái thành những miếng vuông nhỏ.",
        "Bóc vỏ hành tây và thái hạt lựu.",
        "Giã tỏi với muối.",
        "Đun sôi nước trong ấm.",
      ],
    },
    {
      sectionTitle: "Nấu",
      steps: [
        "Trong một nồi lớn, phi thơm hành tây với dầu cho đến khi trong.",
        "Thêm xúc xích đã thái vào, nêm muối, tiêu và xào cho hơi săn lại để sau này không bị nát trong goulash.",
        "Khi xúc xích đã săn, rắc bột paprika ngọt và cay vào. Đảo nhanh tay (vài giây) để paprika không bị cháy khét.",
        "Lập tức đổ nước sôi từ ấm vào, vừa đủ ngập khoai tây và xúc xích.",
        "Thêm khoai tây đã thái và tỏi giã.",
        "Nêm kinh giới cay (có thể để lại một ít để rắc lúc cuối).",
        "Nấu khoảng 10-15 phút, hoặc cho đến khi khoai tây mềm.",
      ],
    },
    {
      sectionTitle: "Làm đặc và hoàn thành",
      steps: [
        "Trong một cốc nước lạnh (khoảng 100-150 ml), đánh tan bột mì đa dụng.",
        "Từ từ đổ hỗn hợp bột vào nồi goulash đang sôi, vừa đổ vừa khuấy liên tục để làm đặc.",
        "Đun nhỏ lửa thêm một lát (ít nhất 5 phút) để bột chín và mất mùi bột sống.",
        "Đổ kem nấu ăn vào, khuấy đều và đun sôi nhẹ trở lại.",
        "Nêm nếm lại goulash cho vừa ăn với muối, tiêu, có thể thêm kinh giới cay hoặc paprika để có màu đẹp.",
      ],
    },
  ],
  tips: {
    sectionTitle: "Mẹo cho món Buřtguláš chuẩn vị", // Translated section title
    items: [
      {
        title: "Chọn đúng loại xúc xích là quan trọng", // Translated title
        text: "Món buřtguláš ngon cần loại špekáčky (xúc xích mỡ của Séc) hoặc klobása chất lượng. Đừng tiếc tiền mua xúc xích ngon, có vậy món ăn mới đậm đà!", // Translated text
      },
      {
        title: "Độ đặc tùy khẩu vị", // Translated title
        text: "Muốn đặc sệt như bê tông? Cho thêm bột hoặc nghiền thêm vài củ khoai tây. Nếu thích loãng hơn, dùng ít bột hơn hoặc bỏ qua hoàn toàn.", // Translated text
      },
      {
        title: "Đừng ngại nêm nếm", // Translated title
        text: "Goulash phải đậm đà! Cứ mạnh dạn thêm kinh giới cay, hạt carum, hoặc một chút ớt để tăng vị ấm nóng. Muối và tiêu thì tùy khẩu vị, tất nhiên rồi.", // Translated text
      },
      {
        title: "Để qua đêm càng ngon!", // Translated new tip
        text: "Nấu luôn cả nồi to đi! Buřtguláš cũng như đàn ông đích thực. Để qua ngày hôm sau càng ngon hơn. Cứ để yên trong tủ lạnh cho ngấm.",
      },
    ],
  },
  serving: {
    sectionTitle: "Cách dùng", // Translated section title
    suggestions: [
      "Múc đầy tô goulash nóng hổi, ăn kèm với một lát bánh mì tươi thật ngon. Không thể thiếu!", // Translated text
      "Ai thích rau xanh có thể rắc thêm ít mùi tây hoặc hẹ thái nhỏ lên trên, nhưng không bắt buộc.", // Translated text
    ],
  },
  authorName: "Tomáš Dinh",
  datePublished: "2025-05-01",
  prepTime: "PT15M",
  cookTime: "PT30M",
  totalTime: "PT45M",
  recipeCategory: "Món chính", // Translated
  recipeCuisine: "Séc", // Translated
  keywords:
    "buřtguláš, goulash khoai tây, ẩm thực Séc, công thức, xúc xích, khoai tây, kem tươi, món ăn nhanh, món ăn thịnh soạn, món ăn ấm lòng", // Translated keywords
  originCountryCode: "cz",
};
