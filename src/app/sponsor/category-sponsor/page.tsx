import { Metadata } from 'next';
import { SponsorDetailLayout } from '@/components/SponsorDetailLayout';

export const metadata: Metadata = {
    title: 'カテゴリスポンサー｜自主トレ素材庫',
    description:
        '転倒予防・上肢・下肢・ADL・介護予防など、特定テーマのページに掲載できる「カテゴリスポンサー」枠の詳細です。月額8,000円から、関心の近いユーザーへ届けられます。',
    alternates: { canonical: '/sponsor/category-sponsor' },
};

export default function CategorySponsorPage() {
    return (
        <SponsorDetailLayout
            planName="カテゴリスポンサー"
            price="月額 8,000円"
            summary="転倒予防、上肢、下肢、ADL、介護予防など、特定テーマに関連するページへ掲載できるスポンサー枠です。サービス内容と近いカテゴリに掲載できるため、関心の近いユーザーに届けやすいのが特徴です。"
            placement={[
                '特定カテゴリページ（例：転倒予防・上肢・下肢 など）',
                '関連素材ページ下部',
            ]}
            features={[
                'テーマが近いユーザーに集中して届けやすい',
                'サービスとの相性がよいページにだけ掲載できる',
                'バナー画像と紹介文をしっかり載せられる',
                'カテゴリ単位での独占掲載をご相談可能',
            ]}
            fitFor={[
                '転倒予防サービス',
                '福祉用具',
                '上肢機能訓練教材',
                '介護予防教室',
                'リハビリ研修',
                '医療介護系求人',
            ]}
            placeableItems={[
                'サービス名または会社名',
                '150文字程度の紹介文',
                '公式サイトへのリンク',
                'バナー画像',
                '対象カテゴリ名',
            ]}
            notes={[
                'カテゴリにより読者規模が異なるため、想定到達数は事前にご案内します。',
                '同カテゴリで競合関係にあるサービスは、同時期の掲載をお断りすることがあります。',
                '掲載するカテゴリは申し込み時にご指定ください。',
            ]}
        />
    );
}
