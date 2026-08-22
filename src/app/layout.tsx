import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
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

/** GA4の測定ID。既存のプロパティをそのまま使う（新規作成しない）。 */
const GA_MEASUREMENT_ID = "G-TDY9RZPYWX";

/**
 * 計測を許可する本番ホスト名。
 * --------------------------------------------------------------
 * VERCEL_ENV だけでは、本番デプロイに割り当てられる *.vercel.app の別名URLから
 * アクセスされたときに素通りしてしまう。gtag.js 公式のオプトアウトフラグ
 * （window["ga-disable-<測定ID>"]）を、GAタグより先に立てて塞ぐ。
 * src/lib/analytics.ts 側にも同じホスト判定があり、二重に防いでいる。
 */
const MEASURABLE_HOSTS = ["jishutore-sozaiko.online", "www.jishutore-sozaiko.online"];

export const metadata: Metadata = {
  title: `自主トレイラスト無料素材集｜リハビリ職向け${FREE_MATERIAL_COUNT}点｜自主トレ素材庫`,
  // ★2026-08-17：Bing の「description が短すぎる」警告を受けて96字→150字へ拡充。
  //   あわせて報酬チェックを1文足した。来訪者の約半分が報酬チェック層なのに、
  //   トップの説明文がイラストの話だけだったため（[[audience-split]]）。
  description: `PT・OT・STのための自主トレイラスト素材サイト。スクワット・ブリッジ・嚥下体操など${FREE_MATERIAL_COUNT}点すべて無料・商用OK、登録不要でダウンロードできます。脳卒中や変形性膝関節症など疾患からも探せます。訪問リハ・通所リハ・老健の報酬チェック（単位数と算定要件）も無料で公開中。`,
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
        {isProductionDeploy && (
          <>
            {/* GAタグより先に走らせる。本番ホスト以外では計測を完全に無効化する。 */}
            <Script id="ga-host-guard" strategy="beforeInteractive">
              {`(function(){var h=location.hostname;var ok=${JSON.stringify(MEASURABLE_HOSTS)};if(ok.indexOf(h)===-1){window["ga-disable-${GA_MEASUREMENT_ID}"]=true;}})();`}
            </Script>
            <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
          </>
        )}
      </body>
    </html>
  );
}
