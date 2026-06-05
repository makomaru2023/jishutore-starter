import { Metadata } from 'next';
import { SponsorDetailLayout } from '@/components/SponsorDetailLayout';

export const metadata: Metadata = {
    title: '応援スポンサー｜自主トレ素材庫',
    description:
        '自主トレ素材庫の無料素材配布を応援してくださる方向けのライトなスポンサー枠です。月額3,000円から、個人事業主・小規模サービスでもご利用いただけます。',
    alternates: { canonical: '/sponsor/detail-sponsor' },
};

export default function DetailSponsorPage() {
    return (
        <SponsorDetailLayout
            planName="応援スポンサー"
            price="月額 3,000円"
            summary="自主トレ素材庫の無料素材配布を応援してくださる方向けのライトなスポンサー枠です。まずは小さく掲載を試したい個人・事業者さまに向いています。"
            placement={[
                'スポンサー一覧ページ',
                'トップページ下部',
                'サイト下部の応援スポンサー欄',
            ]}
            features={[
                '個人事業主や小規模事業者でも始めやすい料金設定',
                'サイト全体に薄く露出するため、認知づくりの第一歩に',
                '掲載準備がシンプルで開始しやすい',
                'まずは応援掲載を試したい方に向く',
            ]}
            fitFor={[
                '個人事業主',
                '小規模サービス',
                'リハビリ・介護系メディア',
                '教材販売',
                '自主トレ素材庫を応援したい個人・団体',
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
