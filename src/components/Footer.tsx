import Link from "next/link";
import { TrackedPlusMemberLink } from "@/components/TrackedPlusMemberLink";
import { SurveyFooterLink } from "@/components/survey/SurveyFooterLink";
import { SURVEY_ENABLED } from "@/constants/survey";

/**
 * フッターのリンクは「使う人／掲載する事業者／運営・サポート」の3グループに畳む。
 * 平置きだと項目が多すぎて何も探せないので、見出しを付けて列に分ける。
 * 規約類のうちサイト全体にかかる3本（利用規約・プライバシー・特商法）だけ最下段の細い行に置き、
 * 報酬チェック編集方針は各報酬チェックページと利用規約ページから辿れるのでフッターからは外した。
 */
const linkClass = "text-sm font-bold text-slate-400 transition-colors hover:text-white";
const headingClass = "mb-3 text-xs font-black tracking-wide text-slate-500";

export function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-900 py-12">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
                    <div>
                        <p className={headingClass}>コンテンツ</p>
                        <ul className="flex flex-col gap-2.5">
                            <li>
                                <Link href="/items" className={linkClass}>
                                    素材一覧
                                </Link>
                            </li>
                            <li>
                                <Link href="/fee-check" className={linkClass}>
                                    報酬チェック
                                </Link>
                            </li>
                            <li>
                                <Link href="/column/" className={linkClass}>
                                    コラム
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs/" className={linkClass}>
                                    求人情報
                                </Link>
                            </li>
                            <li>
                                <TrackedPlusMemberLink placement="footer" className={linkClass}>
                                    会員ログイン
                                </TrackedPlusMemberLink>
                            </li>
                        </ul>
                    </div>

                    {/* 掲載事業者向け。申込前に規約を読める場所として、サービス側の導線だけでなくここにも置く。 */}
                    <div>
                        <p className={headingClass}>施設・企業の方へ</p>
                        <ul className="flex flex-col gap-2.5">
                            <li>
                                <Link href="/jobs/posting/" className={linkClass}>
                                    求人掲載のご案内
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs/terms/" className={linkClass}>
                                    求人掲載規約
                                </Link>
                            </li>
                            <li>
                                <Link href="/sponsor/terms/" className={linkClass}>
                                    スポンサー掲載規約
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <p className={headingClass}>運営・サポート</p>
                        <ul className="flex flex-col gap-2.5">
                            <li>
                                <Link href="/about" className={linkClass}>
                                    運営者情報
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://note.com/jisyutore"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkClass}
                                >
                                    運営者のnote
                                </a>
                            </li>
                            <li>
                                <Link href="/faq" className={linkClass}>
                                    よくあるご質問
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className={linkClass}>
                                    お問合せ
                                </Link>
                            </li>
                            {/* アンケート終了時（SURVEY_ENABLED=false）は行ごと消す。 */}
                            {SURVEY_ENABLED && (
                                <li>
                                    <SurveyFooterLink className={linkClass} />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-500">
                        <Link href="/license" className="transition-colors hover:text-slate-300">
                            利用規約・ガイドライン
                        </Link>
                        <Link href="/privacy" className="transition-colors hover:text-slate-300">
                            プライバシーポリシー
                        </Link>
                        <Link href="/tokushoho" className="transition-colors hover:text-slate-300">
                            特定商取引法に基づく表記
                        </Link>
                    </div>
                    <p className="text-xs font-bold text-slate-500">
                        © {new Date().getFullYear()} 自主トレ素材庫
                    </p>
                </div>
            </div>
        </footer>
    );
}
