import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "自主トレイラスト無料素材集｜リハビリ職向け370点以上｜自主トレ素材庫",
  description: "PT・OT・STのための自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチなど370点以上すべて無料・商用OK。患者配布資料がすぐ作れます。登録不要でダウンロード可能。",
  metadataBase: new URL('https://jishutore-sozaiko.online'),
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: "自主トレイラスト無料素材集｜リハビリ職向け370点以上｜自主トレ素材庫",
    description: "PT・OT・STのための自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチなど370点以上すべて無料・商用OK。患者配布資料がすぐ作れます。",
    siteName: "自主トレ素材庫",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "自主トレイラスト無料素材集｜リハビリ職向け370点以上｜自主トレ素材庫",
    description: "PT・OT・STのための自主トレイラスト素材サイト。370点以上すべて無料・商用OK。登録不要でダウンロード可能。",
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
