import { Metadata } from 'next';
import { SponsorDetailLayout } from '@/components/SponsorDetailLayout';

export const metadata: Metadata = {
    title: 'noteスポンサー｜自主トレ素材庫',
    description:
        '自主トレ素材庫のnote記事内でサービスや取り組みを紹介できる「noteスポンサー」枠の詳細です。1記事3,000円から、読み物コンテンツの中で自然に紹介できます。',
    alternates: { canonical: '/sponsor/note-sponsor' },
};

export default function NoteSponsorPage() {
    return (
        <SponsorDetailLayout
            planName="noteスポンサー"
            price="1記事 3,000円"
            summary="自主トレ素材庫のnote記事内で、記事テーマに合わせてサービスや取り組みを紹介できるスポンサー枠です。サイト内掲載とは別に、読み物コンテンツの中で自然に紹介したい場合に向いています。"
            placement={[
                '自主トレ素材庫のnote記事内',
                '記事内容に合わせた位置（記事中盤または末尾）',
            ]}
            features={[
                '記事内容と合わせた文脈で紹介できる',
                '1記事単位で出稿できるため小さく試しやすい',
                'note上で読者に届くため、サイト外への到達も見込める',
                'サービスの世界観に合った文章で紹介ができる',
            ]}
            fitFor={[
                '研修告知',
                '教材紹介',
                'イベント告知',
                '採用広報',
                'サービス紹介',
                '医療介護系メディア',
            ]}
            placeableItems={[
                'スポンサー名',
                '100〜150文字程度の紹介文',
                '公式サイトまたはSNSへのリンク',
            ]}
            notes={[
                '記事テーマとスポンサー内容の相性を事前に確認させていただきます。',
                '記事中での見せ方は、運営側で内容を整える形になります。',
                '掲載タイミングは、記事の公開スケジュールに合わせて調整します。',
            ]}
        />
    );
}
