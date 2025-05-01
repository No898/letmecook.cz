import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { languages } from "../i18n/settings";

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
  title: "Moje kniha receptů",
  description: "Osobní sbírka oblíbených receptů.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#2d3748",
};

const GA_TRACKING_ID = "G-R9KE6X74Q9";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} dir="ltr">
      <head>
        {/* Google Consent Mode v2 - Default Consent State */}
        <Script id="google-consent-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            gtag('js', new Date());
          `}
        </Script>

        {/* Načtení gtag.js */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />

        {/* Konfigurace Google Analytics (gtag.js) */}
        <Script id="google-analytics-config" strategy="lazyOnload">
          {`
             gtag('config', '${GA_TRACKING_ID}');
             console.log('GA config command executed (actual tracking depends on consent)');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <LayoutClientWrapper locale={locale}>{children}</LayoutClientWrapper>
        <SpeedInsights />
        <Analytics />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
