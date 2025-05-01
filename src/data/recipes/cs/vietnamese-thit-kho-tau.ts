import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
  id: "vietnamese-thit-kho-tau",
  title: "Domácí karamelizovaný bůček s vejci - Thịt kho tàu",
  imageUrl: "/images/vietnamese-thit-kho-tau.webp",
  description:
    "Tohle je základ vietnamský kuchyně. Pořádnej kus bůčku, pomalu dušenej, až se skoro rozpadá, nasáklej sladko-slanou omáčkou z karamelu a kokosový vody. K tomu rýže a máš jídlo jako král!",
  ingredients: [
    {
      sectionTitle: "Suroviny",
      servings: "4-6 porcí",
      items: [
        "1 kg vepřového bůčku (ideálně s kůží, vyberte kus s dobrým poměrem masa a tuku, podle toho co máte rád)",
        "6-8 ks vajec ",
        "1-2 mladé kokosy (cca 500-700 ml čerstvé kokosové vody) nebo voda",
        "3-4 lžíce cukru krystal",
        "1 lžíce oleje nebo vody (na karamel)",
        "4-5 lžic rybí omáčky (nước mắm, kvalitní)",
        "2-3 stroužky česneku (nasekat nebo prolisovat)",
        "2 šalotky (nebo 1 menší cibule, najemno nasekat)",
        "1/2 lžičky čerstvě mletého černého pepře",
        "Špetka soli",
        "Volitelně: trochu tmavé sójové omáčky pro tmavší barvu (pokud karamel nebude dost tmavý)",
        "Volitelně: 1-2 chilli papričky (pro pikantnost)",
      ],
    },
  ],
  procedure: [
    {
      sectionTitle: "Příprava masa a vajec",
      steps: [
        "Vejce uvařte natvrdo (cca 8-10 minut), zchlaďte ve studené vodě a oloupejte.",
        "Bůček očistěte, případně opečte kůži nad plamenem pro odstranění štětin. Nakrájejte na větší kostky (cca 3-4 cm).",
        "Maso krátce spařte ve vroucí vodě (2-3 minuty), abyste odstranili nečistoty. Poté propláchněte studenou vodou a nechte okapat.",
        "V misce promíchejte maso s nasekanou šalotkou, česnekem, pepřem, špetkou soli a cca 2 lžícemi rybí omáčky. Nechte marinovat alespoň 30 minut (nebo déle v lednici).",
      ],
    },
    {
      sectionTitle: "Příprava karamelu (Nước màu)",
      steps: [
        "V hrnci se silným dnem (ve kterém budete vařit maso) rozehřejte 1 lžíci oleje nebo vody na středním plameni.",
        "Přisypte cukr a za stálého míchání ho nechte rozpustit a zkaramelizovat.",
        "Míchejte, dokud karamel nezíská tmavě jantarovou až hnědou barvu (jako tmavý med nebo coca-cola). Dávejte pozor, aby se nespálil, byl by hořký.",
        "Jakmile má karamel správnou barvu, opatrně přilijte trochu horké vody nebo kokosové vody (cca 50 ml), pozor na prskání! Rychle promíchejte, aby se karamel rozpustil.",
      ],
    },
    {
      sectionTitle: "Vaření (Kho)",
      steps: [
        "Do hrnce s karamelem přidejte marinované maso a zprudka ho opečte ze všech stran, aby se zatáhlo.",
        "Přilijte zbytek rybí omáčky a případně tmavou sójovou omáčku, promíchejte.",
        "Zalijte čerstvou kokosovou vodou (nebo obyčejnou vodou) tak, aby bylo maso téměř ponořené.",
        "Přiveďte k varu, poté stáhněte plamen na minimum. Sbírejte pěnu, která se tvoří na povrchu, aby byla omáčka čistá.",
        "Přidejte oloupaná vařená vejce (a případně chilli papričky). Vejce by měla být ponořená v omáčce.",
        "Vařte (kho) velmi pomalu na nízkém plameni bez pokličky alespoň 1,5 až 2 hodiny, nebo dokud není maso velmi měkké a tuk téměř průhledný. Občas jemně promíchejte.",
        "Během vaření omáčka zredukuje, zhoustne a získá tmavší barvu. Maso i vejce krásně nasáknou chutě.",
        "Na konci ochutnejte a případně dochuťte cukrem nebo rybí omáčkou podle své chuti.",
      ],
    },
  ],
  tips: {
    sectionTitle: "Moje fígle na nejlepší Thịt Kho",
    items: [
      {
        title: "Maso je základ",
        text: "Ber prorostlej bůček i s kůží, to je ono. Tuk to udělá šťavnatý a kůže změkne tak, že se rozplyne. Nebát se toho!",
      },
      {
        title: "Kokosová voda? Jasně!",
        text: "Čerstvá kokosová voda z mladýho kokosu tomu dá grády. Když není, vem tu z krabice (ale 100%, žádný sračky navíc), nebo holt vodu. -.-",
      },
      {
        title: "Karamel nepodcenit!",
        text: "Ta správná tmavá barva karamelu je kumšt. Klidně tmavší, ale bacha, ať ho nespálíš, jinak to můžeš dělat znova.",
      },
      {
        title: "Hlavně pomalu (Kho)",
        text: "'Kho' znamená, že na to nesmíš spěchat. Pěkně pomaloučku, na mírným plameni. To je tajemství měkkýho masa a top chuti.",
      },
    ],
  },
  serving: {
    sectionTitle: "Jak to nandat na talíř",
    suggestions: [
      "Jasně že s rejží! Dej pořádnou porci horkýho thịt kho, ať plave v omáčce.",
      "Nezapomeň na vejce, rozkroj ho napůl. A zalij to tou boží omáčkou.",
      "K tomu se hodí nakládaná zelenina (dưa món nebo dưa giá) nebo nějakej salát, ať to není taková tučná nálož.",
    ],
  },
  authorName: "Tomáš Dinh", // Podle kontextu
  datePublished: "2025-05-01", // Aktuální datum
  prepTime: "PT45M", // Včetně marinování
  cookTime: "PT2H", // Alespoň 1.5-2 hodiny vaření
  totalTime: "PT2H45M",
  recipeCategory: "Hlavní chod",
  recipeCuisine: "Vietnamská",
  keywords:
    "thịt kho tàu, thịt kho trứng, karamelizovaný bůček, vietnamská kuchyně, recept, kokosová voda, rybí omáčka, vejce, domácí recept, bůček",
  originCountryCode: "vi",
};
