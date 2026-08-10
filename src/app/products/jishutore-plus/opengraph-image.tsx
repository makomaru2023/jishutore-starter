import { ImageResponse } from "next/og";
import {
    formatYen,
    PLUS_PROMO_CURRENT_PRICE_YEN,
    PLUS_PROMO_DEADLINE_LABEL,
    PLUS_PROMO_IS_ACTIVE,
    PLUS_PROMO_NEXT_PRICE_YEN,
} from "@/constants/plus-pricing";

export const alt = "算定確認も、資料づくりも、これひとつ。自主トレ素材庫Plus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const includedItems = [
    "診療・介護報酬チェック",
    "編集できる運動スライド",
    "疾患別・姿勢別の完成デッキ",
    "伝わるプロンプト工房",
];

export default function PlusOpenGraphImage() {
    const currentPrice = formatYen(PLUS_PROMO_CURRENT_PRICE_YEN);
    const nextPrice = formatYen(PLUS_PROMO_NEXT_PRICE_YEN);

    return new ImageResponse(
        (
            <div
                style={{
                    alignItems: "stretch",
                    background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 48%, #e0e7ff 100%)",
                    color: "#0f172a",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                    padding: "64px 72px",
                    width: "100%",
                }}
            >
                <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ color: "#1d4ed8", display: "flex", fontSize: 24, fontWeight: 800 }}>
                        自主トレ素材庫Plus
                    </div>
                    {PLUS_PROMO_IS_ACTIVE && (
                        <div
                            style={{
                                backgroundColor: "#fef3c7",
                                border: "2px solid #f59e0b",
                                borderRadius: 999,
                                color: "#78350f",
                                display: "flex",
                                fontSize: 20,
                                fontWeight: 800,
                                padding: "10px 20px",
                            }}
                        >
                            {PLUS_PROMO_DEADLINE_LABEL}の登録で据え置き
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", fontSize: 54, fontWeight: 900, letterSpacing: "-2px" }}>
                        算定確認も、資料づくりも、
                    </div>
                    <div style={{ color: "#1d4ed8", display: "flex", fontSize: 74, fontWeight: 900, letterSpacing: "-3px", marginTop: 4 }}>
                        これひとつ。
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {includedItems.map((item) => (
                        <div
                            key={item}
                            style={{
                                backgroundColor: "#ffffff",
                                border: "2px solid #bfdbfe",
                                borderRadius: 14,
                                color: "#1e3a8a",
                                display: "flex",
                                fontSize: 19,
                                fontWeight: 700,
                                padding: "11px 16px",
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <div
                    style={{
                        alignItems: "center",
                        backgroundColor: "#172554",
                        borderRadius: 22,
                        color: "#ffffff",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px 28px",
                    }}
                >
                    <div style={{ display: "flex", fontSize: 21, fontWeight: 700 }}>
                        リハ・介護現場の個人向け
                    </div>
                    <div style={{ alignItems: "baseline", display: "flex", gap: 14 }}>
                        <div style={{ display: "flex", fontSize: 35, fontWeight: 900 }}>
                            月額{currentPrice}
                        </div>
                        {PLUS_PROMO_IS_ACTIVE && (
                            <div style={{ color: "#bfdbfe", display: "flex", fontSize: 20, fontWeight: 700 }}>
                                キャンペーン終了後の新規は月額{nextPrice}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
