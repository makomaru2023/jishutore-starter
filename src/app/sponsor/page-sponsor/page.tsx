import { Metadata } from 'next';
import { SponsorDetailLayout } from '@/components/SponsorDetailLayout';

export const metadata: Metadata = {
    title: 'ページスポンサー｜自主トレ素材庫',
    description:
        '無料素材一覧ページや素材詳細ページに掲載できる「ページスポンサー」枠の詳細です。月額5,000円から、リハビリ・介護職に向けたサービス紹介が可能です。',
    alternates: { canonical: '/sponsor/page-sponsor' },
};

export default function PageSponsorDetailPage() {
    return (
        <SponsorDetailLayout
            planName="ページスポンサー"
            price="月額 5,000円"
            summary="無料素材を探しているユーザーや、個別素材ページを閲覧しているユーザーに向けて掲載できるスポンサー枠です。リハビリ・介護現場で使える素材を探している方に、サービスや取り組みを自然に紹介できます。"
            placement={[
                '無料素材一覧ページ（/items）',
                '素材詳細ページ下部',
                '必要に応じて特定ページ下部',
            ]}
            features={[
                '素材を探しているリハビリ・介護職に届きやすい',
                'カード型レイアウトでサイトに馴染む形で掲載',
                'バナー画像も掲載可能（テキストのみでも可）',
                '月額制で継続的に認知を取りやすい',
            ]}
            fitFor={[
                'リハビリ職向け教材',
                '介護職向けサービス',
                '医療介護系求人',
                '研修・セミナー',
                '資料作成支援サービス',
                '福祉用具・自助具',
            ]}
            placeableItems={[
                'サービス名または会社名',
                '150文字程度の紹介文',
                '公式サイトへのリンク',
                'バナー画像',
            ]}
            notes={[
                '掲載内容が医療・介護・福祉領域と関連性が低い場合、お断りすることがあります。',
                '掲載開始までに内容調整のための打ち合わせが入る場合があります。',
                '掲載期間中の差し替えは月単位でご相談可能です。',
            ]}
            previewVariant="page"
            previewCaption="無料素材一覧ページや素材詳細ページに、下のような形で掲載されます。"
        />
    );
}
