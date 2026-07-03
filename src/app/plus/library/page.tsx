import type { Metadata } from "next";
import { PlusLibrary } from "@/components/plus/PlusLibrary";

export const metadata: Metadata = {
    title: "資料を選ぶ｜自主トレ素材庫Plus",
    description:
        "完成済みのPowerPoint資料を選んでZIPでまとめてダウンロードできる、リハ職・医療職・介護職向けの資料庫です。",
    // 会員向け画面のため、当面は検索エンジンに登録しない
    robots: { index: false, follow: false },
};

export default function PlusLibraryPage() {
    return <PlusLibrary />;
}
