'use client';

import { useState } from 'react';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface FAQItemProps {
    question: string;
    answer: React.ReactNode;
}

function FAQItem({ question, answer }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                        Q
                    </span>
                    <span className="text-lg font-medium text-gray-900">{question}</span>
                </div>
                <svg
                    className={`h-6 w-6 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="pb-6 pl-12 pr-4 text-gray-600">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
    const faqs = [
        {
            question: "自主トレ素材庫.jpとはどんなサービスですか？",
            answer: "リハビリテーションの現場で働く療法士のために作られた、自主トレーニング指導用イラスト素材集です。統一感のあるデザインで、質の高い指導資料を短時間で作成できます。"
        },
        {
            question: "どのような人におすすめですか？",
            answer: "理学療法士、作業療法士、言語聴覚士などのリハビリ専門職の方や、患者様への指導を行う医療・介護従事者の方におすすめです。"
        },
        {
            question: "他の素材サイトとの違いは何ですか？",
            answer: "「リハビリ職が作った」という点が最大の特徴です。臨床現場で本当に必要な動きや、指導のポイントを押さえたイラストを厳選しています。また、全てのイラストのテイストが統一されているため、資料としての完成度が高まります。"
        },
        {
            question: "無料で利用できますか？",
            answer: (
                <>
                    はい、「無料素材」プランのアイテムは無料でご利用いただけます（クレジット表記が必要です）。
                    より多くの素材や、クレジット表記なしでの利用をご希望の場合は、有料プラン（Basic/Pro/Premium）をご検討ください。
                </>
            )
        },
        {
            question: "購入した素材の商用利用は可能ですか？",
            answer: "はい、可能です。院内資料や患者様への配布はもちろん、有料のセミナー資料やSNS、Webサイトなどでもご利用いただけます。ただし、素材そのものの再配布や販売は禁止されています。"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-16">
                <div className="mx-auto max-w-3xl">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Q & A</span>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">よくあるご質問</h1>
                        <div className="mt-4 h-1 w-20 bg-blue-200 mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
