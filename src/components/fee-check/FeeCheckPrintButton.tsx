"use client";

import { trackFeeCheckPrint } from "@/lib/analytics";

export function FeeCheckPrintButton({ domain, itemId }: { domain: string; itemId: string }) {
    return (
        <button
            type="button"
            onClick={() => {
                trackFeeCheckPrint({ fee_domain: domain, fee_item_id: itemId });
                window.print();
            }}
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-black text-blue-700 transition hover:border-blue-400 hover:bg-blue-50 print:hidden"
        >
            印刷する
        </button>
    );
}
