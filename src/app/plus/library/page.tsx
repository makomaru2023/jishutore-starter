import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PlusLibrary } from "@/components/plus/PlusLibrary";
import { hasActivePlusAccess } from "@/lib/plus-access";

export const metadata: Metadata = {
    title: "資料を選ぶ｜自主トレ素材庫Plus",
    description:
        "完成済みのPowerPoint資料を選んでZIPでまとめてダウンロードできる、リハ職・医療職・介護職向けの資料庫です。",
    // 会員向け画面のため、当面は検索エンジンに登録しない
    robots: { index: false, follow: false },
};

// middleware はセッションCookieの有無だけを見るため、ここで Stripe の契約状態まで
// 確認し、解約者が資料庫UIを閲覧できないようにする（ダウンロードAPIと同じ基準）。
export default async function PlusLibraryPage() {
    if (!(await hasActivePlusAccess())) {
        redirect("/plus/login/?error=nosub");
    }
    return <PlusLibrary />;
}
