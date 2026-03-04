import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "John Rodriguez | GTM Systems Builder and Web Developer",
  description:
    "Portfolio of John Rodriguez, a Central Texas sales and marketing director building GTM systems, automation, and modern web apps.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
