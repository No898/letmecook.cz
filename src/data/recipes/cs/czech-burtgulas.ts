import type { Recipe } from "@/types/recipe";

export const recipe: Recipe = {
  id: "czech-burtgulas",
  title: "Český domácí buřtguláš",
  imageUrl: "/images/czech-burtgulas.webp",
  description:
    "Bramborový guláš nazývaný buřtguláš je hrdý recept většiny můžů. Je to rychý a vydatný pokrm, která spolehlivě zasytí nejednoho hromotluka a je zcela běžné uvařit ho kotel na delší čas, uleželí je totiž ještě lepší! Krémová chuť a jemnost brambor vás učitě okouzlí.",
  ingredients: [
    {
      sectionTitle: "Suroviny",
      servings: "4 porce",
      items: [
        "500 g uzeniny (točený salám, buřty, případně párky)",
        "6 větších brambor C, pokud nemáte tak B",
        "2 střední cibule",
        "Olej na smažení",
        "2 stroužky česneku",
        "Sůl",
        "Černý pepř (mletý)",
        "Sladká mletá paprika",
        "Pálivá mletá paprika",
        "Majoránka",
        "250 ml smetany na vaření (10-12% tuku)",
        "Hladká mouka (na zahuštění, cca 1-2 lžíce)",
      ],
    },
  ],
  procedure: [
    {
      sectionTitle: "Příprava",
      steps: [
        "Uzeninu nakrájíme na menší kostky.",
        "Brambory oloupeme, omyjeme a nakrájíme také na menší kostky.",
        "Cibuli oloupeme a nakrájíme nadrobno.",
        "Rozetřeme česnek se solí.",
        "Do varné konvice dáme vařit vodu.",
      ],
    },
    {
      sectionTitle: "Vaření",
      steps: [
        "Ve větším hrnci na oleji zpěníme cibuli do sklovata.",
        "Přidáme nakrájenou uzeninu, osolíme, opepříme a necháme opéct, aby se maso zatáhlo a nebylo v guláši později rozvařené.",
        "Když je uzenina opečená, zasypeme ji sladkou i pálivou paprikou. Krátce promícháme (pár vteřin), aby paprika nezhořkla.",
        "Ihned zalijeme vroucí vodou z konvice tak, aby byly brambory a uzenina ponořené.",
        "Přidáme nakrájené brambory a rozetřený česnek.",
        "Okořeníme majoránkou (část si můžeme nechat na dochucení na konci).",
        "Vaříme přibližně 10-15 minut, nebo dokud nejsou brambory měkké.",
      ],
    },
    {
      sectionTitle: "Zahuštění a dokončení",
      steps: [
        "V hrnku studené vody (cca 100-150 ml) rozšleháme metličkou hladkou mouku.",
        "Moučnou směs pomalu přiléváme za stálého míchání do vroucího guláše, abychom ho zahustili.",
        "Krátce provaříme (alespoň 5 minut), aby se ztratila chuť mouky.",
        "Přilijeme smetanu na vaření, promícháme a necháme ještě krátce projít varem.",
        "Guláš dochutíme podle potřeby solí, pepřem, případně majoránkou nebo paprikou pro barvu.",
      ],
    },
  ],
  tips: {
    sectionTitle: "Tipy pro pořádný buřtguláš",
    items: [
      {
        title: "Správná uzenina je základ",
        text: "Do pořádnýho buřtgulášu patří kvalitní špekáček nebo klobása. Na salámu a párcích radši nešetři, ať to má chuť!",
      },
      {
        title: "Hustota podle gusta",
        text: "Chceš ho mít hustej jak beton? Přidej víc mouky nebo rozmačkej pár brambor navíc. Jestli radši řidší, uber mouku nebo ji vynech úplně.",
      },
      {
        title: "Neboj se dochutit",
        text: "Guláš musí mít říz! Klidně přidej víc majoránky, kmínu nebo špetku chilli, ať to zahřeje. Soli a pepře podle chuti, samozřejmě.",
      },
      {
        title: "Nejlíp chutná odleželej!",
        text: "Vař rovnou kotel! Buřtguláš je totiž jako správnej chlap. Druhý den je ještělepší. Nech ho v klidu uležet v lednici.",
      },
    ],
  },
  serving: {
    sectionTitle: "Jak ho naservírovat",
    suggestions: [
      "Nandej plnej talíř horkýho guláše, k tomu pořádnej krajíc čerstvýho chleba. Bez toho to nejde!",
      "Kdo má rád zelený, může si navrch hodit trochu nasekaný petrželky nebo pažitky, ale není to nutný.",
    ],
  },
  authorName: "Tomáš Dinh",
  datePublished: "2025-05-01",
  prepTime: "PT15M",
  cookTime: "PT30M",
  totalTime: "PT45M",
  recipeCategory: "Hlavní chod",
  recipeCuisine: "Česká",
  keywords:
    "buřtguláš, bramborový guláš, česká kuchyně, recept, uzenina, brambory, smetana, rychlé jídlo, kotlíkový guláš, vydatné jídlo",
  originCountryCode: "cz",
};
