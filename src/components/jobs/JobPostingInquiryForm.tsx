"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { trackB2bContactClick, trackB2bContactSubmit } from "@/lib/analytics";
import { JOB_CONTACT_EMAIL } from "@/constants/jobs";
import {
    EMPTY_JOB_INQUIRY,
    JOB_INQUIRY_LIMITS,
    validateJobInquiry,
    type JobInquiryErrors,
    type JobInquiryField,
    type JobInquiryInput,
} from "@/lib/job-inquiry";

/**
 * 求人掲載の初回相談フォーム（/jobs/posting/ の #inquiry）。
 * ================================================================
 * ★ここは「まず相談する」段階。料金は発生しない。
 *   掲載原稿（勤務条件・給与・職場情報など、職業安定法の明示事項を含む一式）は
 *   STEP 2 で別途お送りする。原稿の項目は減らしていない。
 *
 * ★メールアプリの設定がない端末でも送れるよう、mailto ではなくフォーム送信にした。
 *   送信先は既存のメール基盤（Resend）経由で運営の受信アドレスへ届く。
 *
 * 【計測の約束】
 *   - クリック（フォームを開いた時点）＝ 既存の b2b_contact_click。placement も従来どおり
 *   - 送信完了 ＝ b2b_contact_submit。★サーバーが成功を返したあとにだけ送る
 *   - 施設名・担当者名・メール・採用URL・相談本文はGA4へ一切送らない
 */

type Status = "idle" | "submitting" | "success";

const FIELD_LABELS: Record<JobInquiryField, string> = {
    facilityName: "施設名・法人名",
    contactName: "ご担当者名",
    email: "メールアドレス",
    recruitUrl: "公式採用ページのURL",
    message: "ご相談内容",
};

export function JobPostingInquiryForm({ placement }: { placement: string }) {
    const formId = useId();
    const [values, setValues] = useState<JobInquiryInput>(EMPTY_JOB_INQUIRY);
    const [errors, setErrors] = useState<JobInquiryErrors>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    // ハニーポット（人には見えない欄）。埋まっていたら機械的な送信とみなす。
    const [company, setCompany] = useState("");
    const openedAt = useRef<number>(Date.now());
    // 送信中の多重クリックを、状態更新の反映待ちに頼らず確実に止める。
    const submittingRef = useRef(false);

    const fieldId = (field: JobInquiryField) => `${formId}-${field}`;
    const errorId = (field: JobInquiryField) => `${formId}-${field}-error`;

    const update = (field: JobInquiryField, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (submittingRef.current || status === "submitting") return;

        const validated = validateJobInquiry(values);
        if (!validated.ok) {
            setErrors(validated.errors);
            setFormError("入力内容をご確認ください。");
            return;
        }

        submittingRef.current = true;
        setStatus("submitting");
        setErrors({});
        setFormError(null);

        try {
            const res = await fetch("/api/jobs/inquiry/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...validated.value,
                    company,
                    elapsedMs: Date.now() - openedAt.current,
                    placement,
                }),
            });
            const data = (await res.json().catch(() => ({}))) as {
                ok?: boolean;
                error?: string;
                errors?: JobInquiryErrors;
            };

            if (!res.ok || !data.ok) {
                if (data.errors) setErrors(data.errors);
                setFormError(
                    data.error ??
                        `送信できませんでした。お手数ですが ${JOB_CONTACT_EMAIL} までメールでご連絡ください。`,
                );
                setStatus("idle");
                return;
            }

            // ★送信完了の計測は、サーバーが成功を返したここでだけ行う。
            trackB2bContactSubmit(placement);
            setStatus("success");
            setValues(EMPTY_JOB_INQUIRY);
        } catch {
            setFormError(
                `通信に失敗しました。電波の良い場所でお試しいただくか、${JOB_CONTACT_EMAIL} までメールでご連絡ください。`,
            );
            setStatus("idle");
        } finally {
            submittingRef.current = false;
        }
    }

    if (status === "success") {
        return (
            <div
                role="status"
                className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8"
            >
                <p className="jp-text text-base font-black text-slate-900 sm:text-lg">
                    ご相談を受け付けました。
                </p>
                <p className="jp-text mt-3 text-sm font-bold leading-7 text-slate-700">
                    3営業日以内に、ご記入いただいたメールアドレスへ返信します。
                    掲載をご希望の場合は、そのときに掲載原稿の項目一式をお送りします。
                    この時点では料金は発生しません。
                </p>
                <p className="mt-3 text-xs font-bold leading-6 text-slate-500">
                    しばらく返信が届かない場合は、迷惑メールフォルダをご確認のうえ、
                    {JOB_CONTACT_EMAIL} まで直接ご連絡ください。
                </p>
            </div>
        );
    }

    const isSubmitting = status === "submitting";

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
            <p className="jp-text text-sm font-bold leading-7 text-slate-700">
                まずはご相談だけでも構いません。この時点では料金は発生しません。
                掲載をご希望の場合は、返信で掲載原稿の項目一式をお送りします。
            </p>

            <div className="mt-6 space-y-5">
                <Field
                    id={fieldId("facilityName")}
                    errorId={errorId("facilityName")}
                    label={FIELD_LABELS.facilityName}
                    required
                    error={errors.facilityName}
                >
                    <input
                        id={fieldId("facilityName")}
                        name="facilityName"
                        type="text"
                        autoComplete="organization"
                        maxLength={JOB_INQUIRY_LIMITS.facilityName}
                        value={values.facilityName}
                        onChange={(e) => update("facilityName", e.target.value)}
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={errors.facilityName ? true : undefined}
                        aria-describedby={errors.facilityName ? errorId("facilityName") : undefined}
                        className={inputClass(!!errors.facilityName)}
                        placeholder="例：〇〇リハビリテーション病院"
                    />
                </Field>

                <Field
                    id={fieldId("contactName")}
                    errorId={errorId("contactName")}
                    label={FIELD_LABELS.contactName}
                    required
                    error={errors.contactName}
                >
                    <input
                        id={fieldId("contactName")}
                        name="contactName"
                        type="text"
                        autoComplete="name"
                        maxLength={JOB_INQUIRY_LIMITS.contactName}
                        value={values.contactName}
                        onChange={(e) => update("contactName", e.target.value)}
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={errors.contactName ? true : undefined}
                        aria-describedby={errors.contactName ? errorId("contactName") : undefined}
                        className={inputClass(!!errors.contactName)}
                        placeholder="例：山田"
                    />
                </Field>

                <Field
                    id={fieldId("email")}
                    errorId={errorId("email")}
                    label={FIELD_LABELS.email}
                    required
                    error={errors.email}
                    hint="ご返信先です。"
                >
                    <input
                        id={fieldId("email")}
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        maxLength={JOB_INQUIRY_LIMITS.email}
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        disabled={isSubmitting}
                        aria-required="true"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? errorId("email") : undefined}
                        className={inputClass(!!errors.email)}
                        placeholder="例：saiyo@example.jp"
                    />
                </Field>

                <Field
                    id={fieldId("recruitUrl")}
                    errorId={errorId("recruitUrl")}
                    label={FIELD_LABELS.recruitUrl}
                    error={errors.recruitUrl}
                    hint="お持ちの場合だけで構いません。無い場合は、採用のお問い合わせ先をご相談内容にご記入ください。"
                >
                    <input
                        id={fieldId("recruitUrl")}
                        name="recruitUrl"
                        type="url"
                        inputMode="url"
                        maxLength={JOB_INQUIRY_LIMITS.recruitUrl}
                        value={values.recruitUrl}
                        onChange={(e) => update("recruitUrl", e.target.value)}
                        disabled={isSubmitting}
                        aria-invalid={errors.recruitUrl ? true : undefined}
                        aria-describedby={errors.recruitUrl ? errorId("recruitUrl") : undefined}
                        className={inputClass(!!errors.recruitUrl)}
                        placeholder="https://example.jp/recruit/"
                    />
                </Field>

                <Field
                    id={fieldId("message")}
                    errorId={errorId("message")}
                    label={FIELD_LABELS.message}
                    error={errors.message}
                    hint="募集職種や時期など、決まっている範囲で構いません。"
                >
                    <textarea
                        id={fieldId("message")}
                        name="message"
                        rows={4}
                        maxLength={JOB_INQUIRY_LIMITS.message}
                        value={values.message}
                        onChange={(e) => update("message", e.target.value)}
                        disabled={isSubmitting}
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={errors.message ? errorId("message") : undefined}
                        className={`${inputClass(!!errors.message)} min-h-28 resize-y`}
                        placeholder="例：作業療法士を1名募集予定です。掲載の流れを教えてください。"
                    />
                </Field>
            </div>

            {/* ハニーポット。人には見えないが、機械には見える欄。 */}
            <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor={`${formId}-company`}>この欄は入力しないでください</label>
                <input
                    id={`${formId}-company`}
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
            </div>

            {formError && (
                <p
                    role="alert"
                    className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-rose-800"
                >
                    {formError}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-8 py-4 text-base font-black text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
            >
                {isSubmitting ? "送信中…" : "この内容で相談する"}
            </button>
            <p aria-live="polite" className="sr-only">
                {isSubmitting ? "送信しています" : ""}
            </p>

            <p className="jp-text mt-4 text-xs font-bold leading-6 text-slate-500">
                ご記入いただいた内容は、このご相談への返信にのみ使用します。
                取り扱いは{" "}
                <Link href="/privacy/" className="text-blue-700 underline hover:text-blue-800">
                    プライバシーポリシー
                </Link>{" "}
                のとおりです。掲載条件は{" "}
                <Link href="/jobs/terms/" className="text-blue-700 underline hover:text-blue-800">
                    求人掲載規約
                </Link>{" "}
                をご確認ください。
            </p>
            <p className="mt-2 text-xs font-bold leading-6 text-slate-500">
                フォームが使えない場合は{" "}
                <a
                    href={`mailto:${JOB_CONTACT_EMAIL}?subject=${encodeURIComponent("【求人掲載β版】相談")}`}
                    onClick={() => trackB2bContactClick(`${placement}_mailto_fallback`)}
                    className="text-blue-700 underline hover:text-blue-800"
                >
                    {JOB_CONTACT_EMAIL}
                </a>{" "}
                まで直接ご連絡ください。
            </p>
        </form>
    );
}

function inputClass(hasError: boolean): string {
    return [
        "block w-full rounded-xl border bg-white px-4 py-3 text-base font-medium text-slate-900",
        "placeholder:font-normal placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "disabled:bg-slate-100 disabled:text-slate-500",
        hasError ? "border-rose-400 focus:border-rose-500" : "border-slate-300 focus:border-blue-500",
    ].join(" ");
}

function Field({
    id,
    errorId,
    label,
    required,
    hint,
    error,
    children,
}: {
    id: string;
    errorId: string;
    label: string;
    required?: boolean;
    hint?: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-black text-slate-900">
                {label}
                {required ? (
                    <span className="ml-2 rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-black text-rose-700">
                        必須
                    </span>
                ) : (
                    <span className="ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-black text-slate-500">
                        任意
                    </span>
                )}
            </label>
            {hint && <p className="jp-text mt-1 text-xs font-bold leading-6 text-slate-500">{hint}</p>}
            <div className="mt-2">{children}</div>
            {error && (
                <p id={errorId} className="mt-2 text-xs font-bold text-rose-700">
                    {error}
                </p>
            )}
        </div>
    );
}
