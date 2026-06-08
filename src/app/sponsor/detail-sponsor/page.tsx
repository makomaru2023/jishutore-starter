import { Metadata } from 'next';
import { SponsorDetailLayout } from '@/components/SponsorDetailLayout';

export const metadata: Metadata = {
    title: '応援スポンサー｜自主トレ素材庫',
    description:
        'リハビリ・介護職向けサービスや個人の教材を、低価格で掲載できるライトなスポンサー枠です。月額3,000円から、個人事業主・小規模サービスでもご利用いただけます。',
    alternates: { canonical: '/sponsor/detail-sponsor' },
};

export default function DetailSponsorPage() {
    return (
        <SponsorDetailLayout
            planName="応援スポンサー"
            price="月額 3,000円"
            summary="まずは小さく掲載を試したい方向けの、ライトなスポンサー枠です。リハビリ・介護職向けの個人教材・講座・小規模サービスを、低価格でサイト内に掲載できます。"
            placement={[
                'スポンサー一覧ページ',
                'トップページ下部',
                'サイト下部のスポンサー欄',
            ]}
            features={[
                '個人事業主や小規模事業者でも始めやすい料金設定',
                'サイト全体に薄く露出するため、認知づくりの第一歩に',
                '掲載準備がシンプルで開始しやすい',
                'まずは小さく試したい広告主に向く',
            ]}
            fitFor={[
                '個人事業主',
                '小規模サービス',
                'リハビリ・介護系メディア',
                '教材販売',
                '個人の教材・講座・セミナー',
            ]}
            placeableItems={[
                'スポンサー名',
                '100文字程度の紹介文',
                '公式サイトまたはSNSへのリンク',
            ]}
            notes={[
                'バナー画像の掲載は含まれません（テキスト＋リンクのみです）。',
                '紹介文は内容を一緒に整える形になります。',
                '個人さまの場合、表記名はニックネーム・サービス名のみでもOKです。',
            ]}
        />
    );
}
