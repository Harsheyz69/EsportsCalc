import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PointCalc — AI Tournament Toolkit for BGMI, PUBG & Free Fire",
  description:
    "AI-powered tournament toolkit for BGMI, PUBG Mobile & Free Fire organizers. Drop screenshots — get the points table, warhead, top fraggers, slot list and certificates in seconds.",
  keywords: [
    "BGMI tournament",
    "PUBG Mobile points table",
    "Free Fire tournament",
    "esports calculator",
    "points table maker",
    "warhead graphic",
    "top fraggers",
    "slot list",
    "tournament toolkit",
    "AI OCR",
  ],
  openGraph: {
    title: "PointCalc — AI Tournament Toolkit for BGMI, PUBG & Free Fire",
    description:
      "AI-powered tournament toolkit for BGMI, PUBG Mobile & Free Fire organizers. Drop screenshots — get the points table, warhead, top fraggers, slot list and certificates in seconds.",
    type: "website",
    siteName: "PointCalc",
  },
  twitter: {
    card: "summary_large_image",
    title: "PointCalc — AI Tournament Toolkit",
    description:
      "Drop screenshots — get the whole tournament kit in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="theme-color" content="#08080b" />
      </head>
      <body>{children}</body>
    </html>
  );
}
