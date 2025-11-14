import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pokémon App - Browse and Explore All Pokémon",
    template: "%s | Pokémon App",
  },
  description:
    "Explore and discover all Pokémon with detailed information about their abilities, moves, and forms. Search, filter, and browse through the complete Pokédex.",
  keywords: [
    "pokemon",
    "pokedex",
    "pokemon app",
    "pokemon list",
    "pokemon search",
    "pokemon abilities",
    "pokemon moves",
  ],
  authors: [{ name: "Roberto Zapata" }],
  creator: "Roberto Zapata",
  publisher: "Roberto Zapata",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pokemon-app.vercel.app",
    title: "Pokémon App - Browse and Explore All Pokémon",
    description:
      "Explore and discover all Pokémon with detailed information about their abilities, moves, and forms.",
    siteName: "Pokémon App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokémon App - Browse and Explore All Pokémon",
    description:
      "Explore and discover all Pokémon with detailed information about their abilities, moves, and forms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
