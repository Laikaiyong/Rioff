import type { Metadata } from "next";
import { Wallet } from "./providers";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Rioff',
  description: 'Tie your riot game account to your solana wallet',
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'https://yourdomain.com'),
  twitter: {
    card: 'player',
    site: '@KaiVandyck',
    title: 'Rioff',
    description: 'Tie your riot to wallet',
    players: {
      playerUrl: '/',
      streamUrl: '/',
      width: 480,
      height: 480,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Rioff',
    description: 'Tie your riot to wallet',
    images: 'https://media.assettype.com/afkgaming/import/media/images/13974-fd9b45e17c5887653166de9fbe97437f.jpeg?w=1200&h=675&auto=format%2Ccompress&fit=max',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
    <Wallet>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {children}
    </body>
    </Wallet>
    </html>
  );
}
