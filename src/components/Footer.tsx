import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white py-8 mt-12 border-t">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                    <div className="text-sm text-gray-600">
                        <Link href="/about" className="hover:text-gray-900 hover:underline mr-6">
                            運営者情報
                        </Link>
                        <Link href="/faq" className="hover:text-gray-900 hover:underline mr-6">
                            よくあるご質問
                        </Link>
                        <Link href="/license" className="hover:text-gray-900 hover:underline mr-6">
                            利用規約・ガイドライン
                        </Link>
                        <Link href="/privacy" className="hover:text-gray-900 hover:underline mr-6">
                            プライバシーポリシー
                        </Link>
                        <Link href="/tokushoho" className="hover:text-gray-900 hover:underline">
                            特定商取引法に基づく表記
                        </Link>
                    </div>
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} 自主トレ素材庫.jp All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
