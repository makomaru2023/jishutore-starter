import { Metadata } from 'next';
import { SponsorDetailLayout } from '@/components/SponsorDetailLayout';

export const metadata: Metadata = {
    title: 'プレミアムスポンサー｜自主トレ素材庫',
    description:
        '無料素材一覧ページの目立つ位置や資料セットページ下部など、主要導線付近に掲載できる「プレミアムスポンサー」枠の詳細です。月額10,000円から、リハビリ職に強く届けたいサービスに向いています。',
    alternates: { canonical: '/sponsor/premium-sponsor' },
};

export default function PremiumSponsorPage() {
    return (
        <SponsorDetailLayout
            planName="プレミアムスポンサー"
            price="月額 10,000円"
            summary="自主トレ素材庫内で、比較的目立つ位置に掲載できるスポンサー枠です。資料作成や患者説明に関心が高いユーザーへ届けたいサービスに向いています。"
            placement={[
                '無料素材一覧ページの目立つ位置',
                '資料セットページ下部（/products）',
                '主要導線付近',
                '必要に応じてnoteまたはSNSでの紹介相談',
            ]}
            features={[
                'サイト内でもっとも目に入りやすい枠',
                '紹介文を200文字までしっかり書ける',
                'noteやSNSでの紹介もご相談可能',
                'バナー画像と紹介文の両方でアピールできる',
            ]}
            fitFor={[
                '研修告知',
                '採用広報',
                'リハ職向け教材',
                '医療介護系サービス',
                '資料作成支援サービス',
                'セミナー',
                '有料講座',
            ]}
            placeableItems={[
                'サービス名または会社名',
                '200文字程度の紹介文',
                '公式サイトへのリンク',
                'バナー画像',
                '必要に応じた簡易紹介文',
            ]}
            notes={[
                '掲載枠数に限りがあるため、ご希望の時期に空きがない場合があります。',
                'noteでの紹介は別途内容の打ち合わせをさせていただきます。',
                '初回は1ヶ月単位から、継続のご相談も承ります。',
            ]}
            previewVariant="premium"
            previewCaption="無料素材一覧ページの目立つ位置や資料セットページ下部に、下のような形で掲載されます。"
        />
    );
}
