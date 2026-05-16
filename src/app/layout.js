import localFont from "next/font/local";

import { getSiteUrl, portfolioSite } from "@/lib/portfolio";

import "./globals.css";

const geistSans = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL(portfolioSite.url),
  title: {
    default: portfolioSite.title,
    template: `%s | ${portfolioSite.name}`,
  },
  description: portfolioSite.description,
  applicationName: portfolioSite.shortName,
  alternates: {
    canonical: getSiteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: getSiteUrl("/"),
    title: portfolioSite.title,
    description: portfolioSite.description,
    siteName: portfolioSite.shortName,
    images: [
      {
        url: getSiteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${portfolioSite.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioSite.title,
    description: portfolioSite.description,
    images: [getSiteUrl("/twitter-image")],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
