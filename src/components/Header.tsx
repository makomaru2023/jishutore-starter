import Link from "next/link";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">自主トレ素材庫.jp</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/basic" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        無料素材
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        料金プラン
                    </Link>
                    <Link href="/license" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                        ライセンス
                    </Link>
                </nav>
            </div>
        </header>
    );
}
