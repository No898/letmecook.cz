import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
    id: "vietnamese-meatballs",
    title:
        "Autentické vietnamské masové kuličky (Thịt viên) – domácí recept z Hanoje",
    vietnameseTitle: "Thịt viên",
    imageUrl: "/images/vietnamese-meatballs.webp",
    description:
        "Vietnamské smažené masové kuličky thịt viên připravené k podávání. Tradičně neobsahují strouhanku ani vejce – soudržnost zajišťuje škrob a dobře promíchané maso.",
    ingredients: [
        {
            sectionTitle: "Masové kuličky",
            items: [
                "500 g mletého vepřového masa (ideálně s ~30% tuku, např. plec nebo bůček)",
                "2 ks šalotky (nebo 1 menší cibule; jemně nasekat)",
                "3 stroužky česneku (jemně nasekat)",
                "1–2 lžíce rybí omáčky (nước mắm, dle chuti)",
                "1/2 lžičky mletého černého pepře",
                "1 lžička cukru (nebo špetka hạt nêm / MSG)",
                "2 lžičky (10-15 g) kukuřičného nebo tapiokového škrobu",
                "Rostlinný olej na smažení",
            ],
        },
        {
            sectionTitle: "Omáčka: nước chấm",
            items: [
                "3 lžíce rybí omáčky (nước mắm)",
                "6 lžic teplé vody",
                "2 lžíce cukru",
                "2 lžíce limetkové šťávy (nebo citronové šťávy)",
                "2 stroužky česneku (nasekané najemno nebo prolisované)",
                "1 malá chilli paprička (nasekaná nadrobno, bez semínek pokud nechcete příliš pálivé)",
                "Volitelně: pár nudliček mrkve na ozdobu",
            ],
        },
    ],
    procedure: [
        {
            sectionTitle: "Příprava masové směsi",
            steps: [
                "Vložte mleté vepřové do mísy a přidejte nasekané šalotky a česnek.",
                "Dochuťte rybí omáčkou, cukrem (nebo hạt nêm), a mletým pepřem. Nakonec přisypte škrob.",
                "Vše důkladně promíchejte – ideálně rukou nebo vařečkou několik minut, až směs zpružní a začne lehce lepit (uvolní se bílkovina).",
                "Směs nechte asi 10–15 minut odležet v chladu, aby se maso marinovalo a chutě propojily.",
            ],
            briefSteps: [
                "Smíchejte maso, šalotky, česnek, koření a škrob.",
                "Nechte 10-15 min odležet v chladu.",
            ],
        },
        {
            sectionTitle: "Tvarování kuliček",
            steps: [
                "Z odleželé směsi tvarujte vlhkýma nebo lehce olejem potřenýma rukama malé kuličky o průměru cca 3–4 cm (velikost pingpongového míčku).",
                "Při válení masa dlaněmi netlačte příliš silně, aby výsledné kuličky nebyly tuhé, ale zároveň je zformujte pevně, aby se při smažení nerozpadly.",
                "Hotové kuličky odkládejte na talíř. (Z této dávky získáte zhruba 15–20 kuliček.)",
            ],
            briefSteps: ["Vytvarujte pevné kuličky (cca 3-4 cm)."],
        },
        {
            sectionTitle: "Smažení",
            steps: [
                "Ve větší pánvi nebo woku rozehřejte vrstvu oleje (cca 1–2 cm) na střední teplotu.",
                "Smažte kuličky pozvolna ze všech stran dozlatova. Nepřehánějte teplotu, aby se nespálily zvenku a zůstaly syrové uvnitř.",
                "Kuličky otáčejte, aby se propekly rovnoměrně; celkem to trvá asi 5–7 minut.",
                "Osmažené masové kuličky vyndejte a nechte okapat na papírové utěrce.",
            ],
            briefSteps: [
                "Smažte kuličky na středním oleji dozlatova (5-7 min).",
                "Nechte okapat na papírové utěrce.",
            ],
            videoUrl: "/videos/vietnamese-meat-balls.mp4",
        },
        {
            sectionTitle: "Omáčka: Nước Chấm",
            steps: [
                "V misce smíchej teplou vodu a cukr, míchej, dokud se cukr nerozpustí.",
                "Přidej rybí omáčku a limetkovou šťávu, zamíchej.",
                "Vmíchej nasekaný česnek a chilli.",
                "Pokud chceš, přidej pár nudliček mrkve pro barvu.",
                "Omáčku ochutnej – měla by být sladko-slaná a lehce kyselá. Dolaď vodou (na jemnější chuť) nebo limetkou (na kyselejší chuť).",
            ],
        },
    ],
    tips: {
        sectionTitle: "Poznámky a tipy",
        items: [
            {
                title: "Autentické složení",
                text: "V autentických vietnamských receptech se nepřidává vejce ani strouhanka. Směs získá potřebnou soudržnost díky škrobu a důkladnému promíchání masa s kořením.",
            },
            {
                title: "Alternativní vaření v polévce",
                text: "Tyto kuličky lze také vařit v polévce místo smažení. Stačí je opatrně vložit do vroucího vývaru či polévky; maso zpevní a až budou kuličky uvařené, vyplavou na povrch. Tento postup se používá např. u lehkých zeleninových polévek (canh) k domácí rýži.",
            },
        ],
    },
    serving: {
        sectionTitle: "Podávání a omáčky",
        suggestions: [
            "Jako hlavní jídlo s rýží: Osmažené thịt viên se v Hanoji často podávají s vařenou jasmínovou rýží, buď přímo, nebo promíchané s omáčkou (např. thịt viên sốt cà chua - v rajčatové omáčce, nebo sốt mắm gừng - v rybovo-zázvorové glazuře).",
            "S nudlemi (bún): Podávají se s vychlazenými bún nudlemi, nakládanou zeleninou a sladkokyselou rybí omáčkou (nước mắm chua ngọt) jako zálivkou, podobně jako bún chả.",
            "V polévce: Jsou běžnou součástí polévek, od lehkých zeleninových vývarů (canh) po sytější nudlové polévky jako bún mọc.",
            "Dipy a omáčky: Tradičně se k namáčení podává připravená nước chấm (viz recept výše). Alternativou může být i čili omáčka (tương ớt). Pokud jsou kuličky podávány v jiné omáčce (rajčatové apod.), samostatný dip není nutný.",
        ],
    },
    authorName: "Tomáš Dinh",
    datePublished: "2025-04-29",
    prepTime: "PT30M",
    cookTime: "PT20M",
    totalTime: "PT50M",
    recipeCategory: "Hlavní chod",
    recipeCuisine: "Vietnamská",
    keywords:
        "vietnamské masové kuličky, thịt viên, vepřové mleté maso, recept, rybí omáčka, nước chấm, smažené kuličky, vietnamská kuchyně, hanoj, vietnamské karbanátky, bún chả, letní rolky",
    originCountryCode: 'vi'
}; 