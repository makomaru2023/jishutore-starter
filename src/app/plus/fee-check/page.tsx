import type { Metadata } from "next";
import { FeeCheckTool } from "@/components/plus/FeeCheckTool";

export const metadata: Metadata = {
    title: "診療・介護報酬チェック｜自主トレ素材庫Plus",
    description:
        "訪問リハビリテーションの単位数・点数・算定要件・記録を、厚生労働省の根拠資料リンクつきで確認できるPlus会員向けツールです。",
    robots: { index: false, follow: false },
};

export default function PlusFeeCheckPage() {
    return <FeeCheckTool />;
}
