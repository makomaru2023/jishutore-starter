import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import { FREE_MATERIAL_COUNT } from "@/constants/content-counts";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

/**
 * GA4タグを読み込む条件
 * --------------------------------------------------------------
 * 本番デプロイのときだけ計測タグを出す。
 * プレビュー環境（*.vercel.app）とローカル（npm run dev / npm start）は、
 * 同じ計測IDへ送られてしまい、動作確認のアクセスが実ユーザーの数字に混ざる。
 * Plus LPの到達数のように母数が小さい指標は、これだけで読めなくなる。
 *
 * VERCEL_ENV は Vercel が自動で入れるシステム環境変数。
 * Production は "production"、Preview は "preview"、ローカルは未設定。
 * 一時的にローカルで計測を試したいときは、この定数を true にして戻す。
 */
const isProductionDeploy = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  title: `自主トレイラスト無料素材集｜リハビリ職向け${FREE_MATERIAL_COUNT}点｜自主トレ素材庫`,
  description: `PT・OT・STのための自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチなど${FREE_MATERIAL_COUNT}点すべて無料・商用OK。患者配布資料がすぐ作れます。登録不要でダウンロード可能。`,
  metadataBase: new URL('https://jishutore-sozaiko.online'),
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: `自主トレイラスト無料素材集｜リハビリ職向け${FREE_MATERIAL_COUNT}点｜自主トレ素材庫`,
    description: `PT・OT・STのための自主トレイラスト素材サイト。スクワット・ブリッジ・ストレッチなど${FREE_MATERIAL_COUNT}点すべて無料・商用OK。患者配布資料がすぐ作れます。`,
    siteName: "自主トレ素材庫",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `自主トレイラスト無料素材集｜リハビリ職向け${FREE_MATERIAL_COUNT}点｜自主トレ素材庫`,
    description: `PT・OT・STのための自主トレイラスト素材サイト。${FREE_MATERIAL_COUNT}点すべて無料・商用OK。登録不要でダウンロード可能。`,
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
        {isProductionDeploy && <GoogleAnalytics gaId="G-TDY9RZPYWX" />}
      </body>
    </html>
  );
}
