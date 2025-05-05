import React from 'react';
import { Inter } from 'next/font/google'; 
import CookieConsentBanner from '@/components/CookieConsentBanner'; 
import '@/app/globals.css'; 

// Konfigurace fontu
const inter = Inter({ subsets: ['latin', 'latin-ext'] }); 

// Metadata by měla být ideálně generována dynamicky v page.tsx nebo specifických layoutách
// export const metadata = { ... };

// Komponenty Header/Footer - vytvořte je podle potřeby
const SiteHeader = () => <header className="p-4 bg-gray-800 text-white">Header Placeholder</header>;
const SiteFooter = () => <footer className="p-4 mt-8 bg-gray-800 text-white text-center text-sm">Footer Placeholder</footer>;


export default function RootLayout({
    children,
    params: { locale } // Získáme locale z parametrů
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={locale} className={`${inter.className} bg-background text-text_default`}> {/* Nastavení lang a třídy fontu */}
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="color-scheme" content="dark light" /> {/* Podpora světlého/tmavého režimu */}
                {/* Další globální meta tagy nebo linky sem */}
            </head>
            <body className="flex flex-col min-h-screen"> {/* Základní layout pro přilepení footeru dolů */}
                <SiteHeader /> {/* Vložení hlavičky */}
                <main className="flex-grow"> {/* Hlavní obsah */}
                    {children}
                </main>
                <SiteFooter /> {/* Vložení patičky */}
                <CookieConsentBanner /> {/* Vložení cookie banneru */}
                {/* Zde můžete přidat Vercel Analytics/Speed Insights, pokud je chcete mít globálně */}
                {/* <Analytics /> */}
                {/* <SpeedInsights /> */}
            </body>
        </html>
    );
} 