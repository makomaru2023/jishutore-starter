import { getTestimonials, type TestimonialProduct } from "@/data/testimonials";

/**
 * 掲載許諾つきの「お客様の声」を表示する。
 * ★声が0件のときはセクションごと何も表示しない（空の枠や「準備中」も出さない）。
 * 掲載してよい声の条件・出典は src/data/testimonials.ts のルールを参照。
 */
export function Testimonials({ product }: { product: TestimonialProduct }) {
    const testimonials = getTestimonials(product);
    if (testimonials.length === 0) return null;

    return (
        <section className="border-t border-slate-200 bg-white py-10 sm:py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold tracking-widest text-blue-700">お客様の声</p>
                    <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl jp-heading break-keep">
                        使っている方から届いた感想です
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 break-keep">
                        購入者アンケートで、掲載してよいと答えていただいた回答だけを載せています。
                    </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t) => (
                        <figure
                            key={t.id}
                            className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
                        >
                            <blockquote className="flex-1 text-sm leading-6 text-slate-700 break-keep">
                                「{t.body}」
                            </blockquote>
                            <figcaption className="mt-4 border-t border-slate-200 pt-3 text-xs font-bold text-slate-500">
                                {t.consent === "named" && t.displayName ? (
                                    <>
                                        {t.displayName}
                                        {t.role ? `（${t.role}）` : ""}
                                    </>
                                ) : (
                                    <>{t.role ?? "匿名"}</>
                                )}
                                <span className="ml-2 font-medium text-slate-400">{t.collectedAt}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
