import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welkome",
  description: "Welkome - Gestion de locations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
          strategy="beforeInteractive"
        />
        <link 
          rel="stylesheet" 
          type="text/css" 
          href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" 
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
