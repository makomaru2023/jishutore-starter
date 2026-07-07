import type { Metadata } from "next";
import { FeeCheckTool } from "@/components/plus/FeeCheckTool";

export const metadata: Metadata = {
    title: "報酬算定チェック｜自主トレ素材庫Plus",
    description:
        "訪問リハビリテーションの単位数・算定要件・記録・自己点検ポイントを、厚生労働省の根拠資料リンクつきで確認できるPlus会員向けツールです。",
    robots: { index: false, follow: false },
};

export default function PlusFeeCheckPage() {
    return <FeeCheckTool />;
}
