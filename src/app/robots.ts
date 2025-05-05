import { MetadataRoute } from "next";

// --- !!! DŮLEŽITÉ !!! ---
// Nastavte základní URL vašeho webu. Ideálně z environmentální proměnné.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://letmecook.cz";
// Ujistěte se, že NEXT_PUBLIC_BASE_URL je nastavena ve vašem Vercel projektu.
// -------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Platí pro všechny roboty
      allow: "/", // Povolit procházení všeho
      // disallow: '/private/', // Příklad: Pokud byste měli co zakázat
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Odkaz na sitemapu
  };
}
