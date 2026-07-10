import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-slate-900 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-sm font-bold text-slate-400">
                        <Link href="/about" className="hover:text-white transition-colors">
                            運営者情報
                        </Link>
                        <Link href="/products" className="hover:text-white transition-colors">
                            有料コンテンツ
                        </Link>
                        <Link href="/fee-check" className="hover:text-white transition-colors">
                            報酬チェック
                        </Link>
                        <Link href="/faq" className="hover:text-white transition-colors">
                            よくあるご質問
                        </Link>
                        <Link href="/license" className="hover:text-white transition-colors">
                            利用規約・ガイドライン
                        </Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            プライバシーポリシー
                        </Link>
                        <Link href="/tokushoho" className="hover:text-white transition-colors">
                            特定商取引法に基づく表記
                        </Link>
                        <Link href="/contact" className="hover:text-white transition-colors">
                            お問合せ
                        </Link>
                        <Link href="/sponsor" className="hover:text-white transition-colors">
                            広告掲載・スポンサー募集
                        </Link>
                    </div>
                    <div className="text-sm font-bold text-slate-500 flex items-center gap-2">
                        © {new Date().getFullYear()} 自主トレ素材庫
                    </div>
                </div>
            </div>
        </footer>
    );
}
