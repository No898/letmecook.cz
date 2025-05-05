import React from 'react';
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CookieConsentBanner from '@/components/CookieConsentBanner';
import '@/app/globals.css';
import { languages } from "../../i18n/settings";

// Konfigurace fontů
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

// Metadata
export const metadata: Metadata = {
    title: "Moje kniha receptů",
    description: "Osobní sbírka oblíbených receptů.",
    icons: {
        icon: "/favicon.svg",
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://letmecook.cz'),
};

// Viewport
export const viewport: Viewport = {
    themeColor: "#2d3748",
};

// GA ID
const GA_TRACKING_ID = "G-R9KE6X74Q9";

// generateStaticParams
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
        <html lang={locale} dir="ltr" className="bg-background text-text_default scroll-smooth" suppressHydrationWarning>
            <head>
                {/* Přidány GA skripty a Consent Mode */}
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
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <Script id="google-analytics-config" strategy="lazyOnload">
                    {`
                     gtag('config', '${GA_TRACKING_ID}');
                     console.log('GA config command executed (actual tracking depends on consent)');
                  `}
                </Script>
                {/* Stávající head obsah */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="color-scheme" content="dark light" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={`${inter.variable} ${playfairDisplay.variable} font-sans flex flex-col min-h-screen antialiased`}>
                <div className="flex-grow w-full max-w-full mx-auto">
                    <main>
                        {children}
                    </main>
                </div>
                <CookieConsentBanner />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
} 