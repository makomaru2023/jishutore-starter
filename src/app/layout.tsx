import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "自主トレ素材庫 | リハビリ職のための無料・フリーイラスト素材集",
  description: "作業療法士が作成した、リハビリ職のための自主トレ無料イラスト素材配布サイト。全素材フリー・商用利用OK。自主トレーニング指導の資料作成を効率化します。",
  metadataBase: new URL('https://jishutore-sozaiko.online'),
  alternates: {
    canonical: './',
  },
  verification: {
    google: [
      'f3q9ceJU7IKZ48rmxhZJNpec6pHOKeaLGqjc0wu5Q78',
      'ucu5LYwdOVYrYr2CHVnd3o6vUlBRjTpjrJUiSZEXAgM'
    ],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} bg-slate-50 text-slate-800 antialiased`}>
        {children}
        <GoogleAnalytics gaId="G-TDY9RZPYWX" />
      </body>
    </html>
  );
}
