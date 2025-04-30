import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Recepty Tomáše Dinh",
  description: "Osobní sbírka oblíbených receptů.",
  themeColor: "#2d3748",
};

const GA_TRACKING_ID = "G-R9KE6X74Q9";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      {/* Google Consent Mode v2 - Default Consent State */}
      {/* Musí být PŘED načtením gtag.js */}
      <Script id="google-consent-init" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied', // I pokud nepoužíváte Ads, je dobré zahrnout
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500 // Čeká max 500ms na update z banneru
          });
          // Inicializace dataLayer pro gtag.js
          gtag('js', new Date());
        `}
      </Script>

      {/* Načtení gtag.js */}
      <Script
        strategy="afterInteractive" // Načte se později, ale 'config' počká na souhlas
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      {/* Konfigurace Google Analytics (gtag.js) */}
      {/* Tento config se spustí až po aktualizaci souhlasu (díky Consent Mode) */}
      <Script id="google-analytics-config" strategy="afterInteractive">
        {`
           gtag('config', '${GA_TRACKING_ID}');
           console.log('GA config command executed (actual tracking depends on consent)');
        `}
      </Script>

      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
        <SpeedInsights />
        <CookieConsentBanner /> {/* Náš banner pro update souhlasu */}
      </body>
    </html>
  );
}
