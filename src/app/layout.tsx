import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-playfair-display",
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Recepty Tomáše Dinh",
  description: "Osobní sbírka oblíbených receptů.",
  themeColor: '#2d3748',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased`}
      >
        <LayoutClientWrapper>{children}</LayoutClientWrapper>
      </body>
    </html>
  );
}
