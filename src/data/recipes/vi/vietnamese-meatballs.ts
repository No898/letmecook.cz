import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
    id: "vietnamese-meatballs",
    title:
        "Thịt viên kiểu Việt Nam chuẩn vị Hà Nội – Công thức nhà làm",
    vietnameseTitle: "Thịt viên", // Vietnamese title remains the same
    imageUrl: "/images/vietnamese-meatballs.webp", // Stays the same
    description:
        "Thịt viên chiên kiểu Việt Nam đã sẵn sàng để thưởng thức. Theo truyền thống, món này không dùng vụn bánh mì hay trứng – độ kết dính đến từ tinh bột và thịt được trộn kỹ.",
    ingredients: [
        {
            sectionTitle: "Thịt viên",
            items: [
                "500g thịt heo xay (lý tưởng là có ~30% mỡ, ví dụ thịt vai hoặc ba chỉ)",
                "2 củ hành tím (hoặc 1 củ hành tây nhỏ; băm nhỏ)",
                "3 tép tỏi (băm nhỏ)",
                "1–2 muỗng canh nước mắm (tùy khẩu vị)",
                "1/2 muỗng cà phê tiêu đen xay",
                "1 muỗng cà phê đường (hoặc một ít hạt nêm / mì chính)",
                "2 muỗng cà phê (10-15g) tinh bột bắp hoặc bột năng",
                "Dầu ăn để chiên",
            ],
        },
        {
            sectionTitle: "Nước chấm",
            items: [
                "3 muỗng canh nước mắm",
                "6 muỗng canh nước ấm",
                "2 muỗng canh đường",
                "2 muỗng canh nước cốt chanh (hoặc chanh vàng)",
                "2 tép tỏi (băm nhỏ hoặc ép)",
                "1 quả ớt nhỏ (băm nhỏ, bỏ hạt nếu không muốn quá cay)",
                "Tùy chọn: vài sợi cà rốt thái sợi để trang trí",
            ],
        },
    ],
    procedure: [
        {
            sectionTitle: "Chuẩn bị hỗn hợp thịt",
            steps: [
                "Cho thịt heo xay vào tô, thêm hành tím và tỏi băm.",
                "Nêm nước mắm, đường (hoặc hạt nêm), và tiêu xay. Cuối cùng cho tinh bột vào.",
                "Trộn đều tất cả nguyên liệu – lý tưởng là dùng tay hoặc muỗng gỗ trộn vài phút cho đến khi hỗn hợp dẻo và hơi dính (protein được giải phóng).",
                "Để hỗn hợp nghỉ trong tủ lạnh khoảng 10–15 phút để thịt ngấm gia vị.",
            ],
            briefSteps: [
                "Trộn thịt, hành tím, tỏi, gia vị và tinh bột.",
                "Để nghỉ trong tủ lạnh 10-15 phút.",
            ],
        },
        {
            sectionTitle: "Nặn viên",
            steps: [
                "Dùng tay đã làm ẩm hoặc thoa chút dầu ăn, nặn hỗn hợp thịt đã nghỉ thành những viên nhỏ có đường kính khoảng 3–4 cm (cỡ quả bóng bàn).",
                "Khi nặn thịt, đừng ấn quá mạnh để viên thịt không bị cứng, nhưng cũng cần nặn chắc tay để không bị vỡ khi chiên.",
                "Đặt các viên thịt đã nặn xong lên đĩa. (Với lượng nguyên liệu này, bạn sẽ được khoảng 15–20 viên).",
            ],
            briefSteps: ["Nặn thành viên chắc (khoảng 3-4 cm)."],
        },
        {
            sectionTitle: "Chiên thịt viên",
            steps: [
                "Trong chảo lớn hoặc wok, đun nóng một lớp dầu (khoảng 1–2 cm) ở lửa vừa.",
                "Chiên từ từ các viên thịt cho vàng đều các mặt. Đừng để lửa quá lớn kẻo thịt cháy bên ngoài mà bên trong còn sống.",
                "Lật các viên thịt để chín đều; tổng thời gian khoảng 5–7 phút.",
                "Vớt thịt viên đã chiên ra và để ráo dầu trên giấy thấm dầu.",
            ],
            briefSteps: [
                "Chiên thịt viên ở lửa vừa cho vàng đều (5-7 phút).",
                "Để ráo dầu trên giấy thấm dầu.",
            ],
            videoUrl: "/videos/vietnamese-meat-balls.mp4", // Stays the same
        },
        {
            sectionTitle: "Pha Nước Chấm",
            steps: [
                "Trong một cái chén, hòa tan đường với nước ấm.",
                "Thêm nước mắm và nước cốt chanh, khuấy đều.",
                "Cho tỏi và ớt băm vào trộn.",
                "Nếu muốn, thêm vài sợi cà rốt cho đẹp mắt.",
                "Nếm thử nước chấm – vị phải hài hòa chua, ngọt, mặn. Điều chỉnh thêm nước (cho vị dịu hơn) hoặc chanh (cho chua hơn) nếu cần.",
            ],
            briefSteps: [
                "Hòa tan đường với nước ấm.",
                "Thêm nước mắm, nước cốt chanh.",
                "Cho tỏi, ớt băm vào.",
                "Nêm nếm lại cho vừa ăn.",
            ],
        },
    ],
    tips: {
        sectionTitle: "Lưu ý và Mẹo",
        items: [
            {
                title: "Thành phần chuẩn vị",
                text: "Công thức thịt viên chuẩn vị Việt Nam không dùng trứng hay vụn bánh mì. Hỗn hợp có độ kết dính cần thiết nhờ tinh bột và việc trộn kỹ thịt với gia vị.",
            },
            {
                title: "Cách khác: Nấu trong canh",
                text: "Thịt viên này cũng có thể nấu trong canh thay vì chiên. Chỉ cần thả nhẹ vào nồi nước dùng hoặc canh đang sôi; thịt sẽ săn lại và nổi lên khi chín. Cách này thường dùng cho các món canh rau nhẹ ăn với cơm nhà.",
            },
        ],
    },
    serving: {
        sectionTitle: "Cách dùng và Nước chấm",
        suggestions: [
            "Ăn chính với cơm: Thịt viên chiên ở Hà Nội thường được ăn với cơm trắng nóng, ăn trực tiếp hoặc trộn với sốt (ví dụ: thịt viên sốt cà chua, hoặc sốt mắm gừng).",
            "Với bún: Ăn cùng bún tươi, đồ chua và chan nước mắm chua ngọt, tương tự như bún chả.",
            "Trong canh/súp: Là thành phần phổ biến trong các món canh, từ canh rau nhẹ đến các món bún nước như bún mọc.",
            "Nước chấm: Theo truyền thống, ăn kèm với nước chấm đã pha (xem công thức ở trên). Có thể dùng tương ớt thay thế. Nếu thịt viên được dùng với loại sốt khác (cà chua, v.v.), không cần nước chấm riêng.",
        ],
    },
    authorName: "Tomáš Dinh", // Stays the same
    datePublished: "2025-04-29", // Stays the same
    prepTime: "PT30M", // Stays the same
    cookTime: "PT20M", // Stays the same
    totalTime: "PT50M", // Stays the same
    recipeCategory: "Món chính",
    recipeCuisine: "Ẩm thực Việt Nam",
    keywords:
        "thịt viên, thịt heo xay, công thức, nước mắm, nước chấm, thịt viên chiên, ẩm thực Việt Nam, Hà Nội", // Vietnamese keywords
    originCountryCode: 'vi'
}; 