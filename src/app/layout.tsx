import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "自主トレ素材庫",
  description: "リハビリ職のための自主トレ素材配布サイト",
  metadataBase: new URL('https://self-training.pro-kinkin-sss.com'),
  verification: {
    google: 'f3q9ceJU7IKZ48rmxhZJNpec6pHOKeaLGqjc0wu5Q78',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId="G-TDY9RZPYWX" />
      </body>
    </html>
  );
}
