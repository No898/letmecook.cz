import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://letmecook.cz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Platí pro všechny roboty
      allow: "/", // Povolit procházení všeho
      // disallow: '/private/', // Příklad: Pokud bysme měli co zakázat
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Odkaz na sitemapu
  };
}
