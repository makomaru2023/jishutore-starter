import Link from "next/link";
import { HeaderDropdown } from "./HeaderDropdown";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-600 text-white shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-bold">自主トレ素材庫.jp</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6">
                    <HeaderDropdown />
                    <Link href="/pricing" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                        料金プラン
                    </Link>
                    <Link href="/faq" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                        よくある質問
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-blue-100 hover:text-white transition-colors">
                        お問合せ
                    </Link>
                </nav>
            </div>
        </header>
    );
}
