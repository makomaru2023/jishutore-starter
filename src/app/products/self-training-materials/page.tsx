import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "疾患別自主トレ資料セット｜自主トレ素材庫",
    description:
        "編集できるPPTX・印刷用PDF・自主トレイラスト素材入りの資料セット。患者さんへの説明、家族説明、退院前指導、通所リハ・訪問リハの資料作成に。980円の買い切り。",
};

const PRODUCT_ID = "self-training-materials-vol01";
const PRODUCT_NAME = "疾患別自主トレ資料セット";
const PRICE = 980;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <h2 className="mb-3 text-lg font-black text-slate-900">{title}</h2>
            {children}
        </section>
    );
}

function CheckList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-2">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function SelfTrainingMaterialsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto max-w-3xl px-4 py-10 sm:py-14">
                    <nav className="mb-6 text-sm font-medium text-slate-500">
                        <Link href="/products" className="hover:text-blue-600">
                            資料セット
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-700">疾患別自主トレ資料セット</span>
                    </nav>

                    <header className="mb-8">
                        <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-widest text-blue-600">
                            資料セット
                        </p>
                        <h1 className="text-2xl font-black leading-snug tracking-tight text-slate-900 sm:text-3xl">
                            {PRODUCT_NAME}
                        </h1>
                        <div className="mt-4 flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">¥{PRICE.toLocaleString()}</span>
                            <span className="text-xs font-bold text-slate-400">税込・買い切り</span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-slate-600">
                            自主トレ素材庫のイラストを使って、リハビリ・介護現場で使いやすい説明資料をまとめました。
                            PPTXは編集可能、PDFはそのまま印刷して使用できます。
                        </p>
                    </header>

                    <div className="space-y-5">
                        <Section title="こんな方におすすめ">
                            <CheckList
                                items={[
                                    "自主トレ資料を毎回ゼロから作っている",
                                    "患者さんに分かりやすく説明したい",
                                    "家族説明や退院前指導で使える資料が欲しい",
                                    "通所リハ・訪問リハで使える資料を探している",
                                ]}
                            />
                        </Section>

                        <Section title="含まれるファイル">
                            <CheckList
                                items={[
                                    "編集用PPTX（9疾患）",
                                    "印刷用PDF（9疾患）",
                                    "使い方テキスト",
                                    "利用規約テキスト",
                                ]}
                            />
                            <p className="mt-3 text-xs text-slate-500">
                                収録疾患：パーキンソン病 ／ 五十肩 ／ 人工股関節（術後）／ 圧迫骨折後 ／ 大腿骨骨折（術後）／ 脳卒中 上肢・下肢 ／ 腰痛 ／ 膝OA・TKA
                            </p>
                        </Section>

                        <Section title="使える場面">
                            <CheckList
                                items={[
                                    "患者さんへの自主トレ指導",
                                    "家族説明・退院前指導",
                                    "通所リハ・訪問リハでの資料作成",
                                    "施設内資料・勉強会資料の作成",
                                ]}
                            />
                        </Section>

                        <Section title="利用できる範囲">
                            <CheckList
                                items={[
                                    "患者さんへの説明資料",
                                    "家族説明",
                                    "施設内資料",
                                    "勉強会資料",
                                    "職場内での資料作成",
                                ]}
                            />
                        </Section>

                        <Section title="禁止事項">
                            <ul className="space-y-2">
                                {[
                                    "ファイルそのものの再配布",
                                    "購入者以外へのデータ共有",
                                    "素材や資料をそのまま販売・配布する行為",
                                    "公序良俗に反する利用",
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>

                        <Section title="購入後の流れ">
                            <ol className="space-y-2.5">
                                {[
                                    "購入ボタンを押す",
                                    "Stripe決済画面で支払い",
                                    "決済完了後、ダウンロードページに移動",
                                    "ZIPファイルをダウンロード",
                                ].map((step, i) => (
                                    <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-600">
                                            {i + 1}
                                        </span>
                                        <span className="pt-0.5">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </Section>
                    </div>

                    <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-7">
                        <div className="mb-4 text-center">
                            <p className="text-sm font-bold text-slate-600">買い切り価格</p>
                            <p className="text-3xl font-black text-slate-900">¥{PRICE.toLocaleString()}</p>
                        </div>
                        <CheckoutButton
                            productId={PRODUCT_ID}
                            productName={PRODUCT_NAME}
                            price={PRICE}
                            label="980円で購入する"
                        />
                        <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                            Stripeの決済画面に移動します。決済完了後、ダウンロードページに自動で戻ります。
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
