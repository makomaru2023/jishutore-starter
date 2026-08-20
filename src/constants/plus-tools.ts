export type PlusToolEntry = {
    id: string;
    title: string;
    description: string;
    href: string;
    cta: string;
    badge?: string;
};

/**
 * 会員資料庫上部のカード定義。
 * 今後の追加は、この配列へ1エントリを足すだけで反映できる。
 * 報酬件数はサーバー側で実データから計算して渡し、巨大なfee-items JSONを
 * 資料庫のクライアントバンドルへ含めない。
 */
export function createPlusTools({
    feeDomainCount,
    feeItemCount,
}: {
    feeDomainCount: number;
    feeItemCount: number;
}): readonly PlusToolEntry[] {
    return [
        // ★2026-08-20：疾患別・姿勢別は買い切り（各¥980）へ戻したため、
        // Plus LP・サイト内の宣伝からは外した。ただし**既存会員のダウンロードは残す**
        // （選択肢A・ユーザー判断）。ここと /api/plus/deck-download を消すと
        // 契約中の会員が使えなくなるので、消すときは必ず事前告知とセットにすること。
        {
            id: "disease-deck",
            title: "疾患別 完成デッキ 9本セット",
            description: "脳卒中・腰痛など、退院前・訪問リハでそのまま使える疾患別PowerPoint",
            href: "/api/plus/deck-download/?deck=disease-9-set",
            cta: "ZIPをダウンロード",
        },
        {
            id: "posture-deck",
            title: "姿勢別 完成デッキセット",
            description: "座位・臥位・立位など「今できる姿勢」から選べる自主トレPowerPoint",
            href: "/api/plus/deck-download/?deck=posture-set",
            cta: "ZIPをダウンロード",
        },
        {
            id: "slide-prompt-workshop",
            title: "伝わるプロンプト工房",
            description: "ChatGPTに貼るだけでスライド画像を量産できるプロンプト作成ツール",
            href: "/member/slide-prompt-generator/",
            cta: "ツールを開く",
        },
        {
            id: "fee-check-hub",
            title: "診療・介護報酬チェック 会員版",
            description: `全${feeDomainCount}分野・${feeItemCount}項目の算定要件と記録、加算の組み合わせチェックを1ページで`,
            href: "/plus/fee-hub/",
            cta: "チェックを開く",
            badge: "新機能",
        },
    ];
}
