import { Geist, Geist_Mono } from "next/font/google";

import { getSiteUrl, portfolioSite } from "@/lib/portfolio";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(portfolioSite.url),
  title: {
    default: portfolioSite.name,
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
    title: portfolioSite.name,
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
    title: portfolioSite.name,
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
