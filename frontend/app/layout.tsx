import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EsportsCalc — AI Tournament Toolkit for BGMI, PUBG & Free Fire",
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
    title: "EsportsCalc — AI Tournament Toolkit for BGMI, PUBG & Free Fire",
    description:
      "AI-powered tournament toolkit for BGMI, PUBG Mobile & Free Fire organizers. Drop screenshots — get the points table, warhead, top fraggers, slot list and certificates in seconds.",
    type: "website",
    siteName: "EsportsCalc",
  },
  twitter: {
    card: "summary_large_image",
    title: "EsportsCalc — AI Tournament Toolkit",
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Teko:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      </head>
      <body>
        <div className="bg-characters">
          <img
            className="bg-char bg-char-left"
            src="/Pose_Awaken Kelly Left_03.png"
            alt=""
          />
          <img
            className="bg-char bg-char-right"
            src="/pubg-game-player-character-isolated-on-a-transparent-background-free-png.webp"
            alt=""
          />
        </div>
        {children}
      </body>
    </html>
  );
}
