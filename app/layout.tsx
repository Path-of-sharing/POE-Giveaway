import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = localFont({
  src: [
    {
      path: "../public/font/Cinzel-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/Cinzel-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/Cinzel-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
});

const cinzelDecorative = localFont({
  src: [
    {
      path: "../public/font/CinzelDecorative-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/CinzelDecorative-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/CinzelDecorative-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cinzel-decorative",
});

export const metadata: Metadata = {
  title: "Path of Sharing",
  description:
    "A community-driven giveaway platform for Path of Exile players. Create giveaways and share the loot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} ${cinzelDecorative.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
