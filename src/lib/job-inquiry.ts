/**
 * 求人掲載の「初回相談」フォームの検証ルール。
 * ================================================================
 * ★クライアント（JobPostingInquiryForm）とAPI（/api/jobs/inquiry）の両方から読む。
 *   同じ規則を2か所に書くと必ずずれるので、ここ1本にまとめている。
 *   データ（@/data/jobs）は import しない（クライアントに巻き込まないため）。
 *
 * 【なぜ初回を軽くするのか】
 *   従来の申込CTAは、勤務条件・給与・職場情報まで含む長いmailtoを開いていた。
 *   労働条件の明示に必要な項目がそろう利点はあるが、
 *   「まず話を聞きたい」段階の施設には重すぎるうえ、
 *   メールアプリが設定されていない端末では申し込みそのものができなかった。
 *
 *   そこで段階を2つに分ける：
 *     STEP 1（このフォーム）… 施設名・担当者・連絡先・採用ページURL・相談内容
 *     STEP 2（掲載原稿）    … 職業安定法の明示事項を含む掲載項目一式
 *   ★STEP 2 の項目は減らしていない（@/constants/jobs の掲載原稿メール雛形が正本）。
 */

/** 入力欄の最大文字数。API側でも同じ値で弾く。 */
export const JOB_INQUIRY_LIMITS = {
    facilityName: 100,
    contactName: 50,
    email: 254,
    recruitUrl: 500,
    message: 1000,
} as const;

export interface JobInquiryInput {
    /** 施設名・法人名（必須） */
    facilityName: string;
    /** ご担当者名（必須） */
    contactName: string;
    /** 返信先メールアドレス（必須） */
    email: string;
    /** 公式採用ページのURL（任意。無ければ空欄でよい） */
    recruitUrl: string;
    /** ご相談内容（任意） */
    message: string;
}

export const EMPTY_JOB_INQUIRY: JobInquiryInput = {
    facilityName: "",
    contactName: "",
    email: "",
    recruitUrl: "",
    message: "",
};

/** 入力欄のキー。エラー表示のひも付けに使う。 */
export type JobInquiryField = keyof JobInquiryInput;

export type JobInquiryErrors = Partial<Record<JobInquiryField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * 1行の欄。制御文字（改行を含む）を空白に置き換えて前後を詰める。
 * ★メールの件名・ヘッダーに入る値なので、改行の混入をここで断つ。
 */
export function sanitizeLine(value: unknown): string {
    if (typeof value !== "string") return "";
    return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
}

/** 複数行の欄。改行とタブは残し、それ以外の制御文字だけ落とす。 */
export function sanitizeMultiline(value: unknown): string {
    if (typeof value !== "string") return "";
    return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ").trim();
}

/**
 * 採用ページURLの検証。
 * ★http／https 以外（javascript: や mailto: など）は受け取らない。
 *   受け取った値はメール本文にそのまま載るため、スキームを絞っておく。
 */
export function normalizeRecruitUrl(raw: string): string | null {
    if (!raw) return "";
    const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
        const url = new URL(withScheme);
        if (url.protocol !== "http:" && url.protocol !== "https:") return null;
        if (!url.hostname.includes(".")) return null;
        return url.toString();
    } catch {
        return null;
    }
}

/**
 * 入力を検証して、正規化済みの値かエラーを返す。
 * ★必須は「施設名・担当者名・メール」の3つだけ。
 *   採用ページURLは、公式採用ページがまだ無い施設もあるので任意にしている。
 */
export function validateJobInquiry(
    raw: Partial<Record<JobInquiryField, unknown>>,
): { ok: true; value: JobInquiryInput } | { ok: false; errors: JobInquiryErrors } {
    const errors: JobInquiryErrors = {};

    const facilityName = sanitizeLine(raw.facilityName);
    const contactName = sanitizeLine(raw.contactName);
    const email = sanitizeLine(raw.email);
    const recruitUrlRaw = sanitizeLine(raw.recruitUrl);
    const message = sanitizeMultiline(raw.message);

    if (!facilityName) {
        errors.facilityName = "施設名・法人名をご記入ください。";
    } else if (facilityName.length > JOB_INQUIRY_LIMITS.facilityName) {
        errors.facilityName = `施設名・法人名は${JOB_INQUIRY_LIMITS.facilityName}文字以内でご記入ください。`;
    }

    if (!contactName) {
        errors.contactName = "ご担当者名をご記入ください。";
    } else if (contactName.length > JOB_INQUIRY_LIMITS.contactName) {
        errors.contactName = `ご担当者名は${JOB_INQUIRY_LIMITS.contactName}文字以内でご記入ください。`;
    }

    if (!email) {
        errors.email = "返信先のメールアドレスをご記入ください。";
    } else if (email.length > JOB_INQUIRY_LIMITS.email || !EMAIL_RE.test(email)) {
        errors.email = "メールアドレスの形式をご確認ください。";
    }

    let recruitUrl = "";
    if (recruitUrlRaw) {
        if (recruitUrlRaw.length > JOB_INQUIRY_LIMITS.recruitUrl) {
            errors.recruitUrl = `URLは${JOB_INQUIRY_LIMITS.recruitUrl}文字以内でご記入ください。`;
        } else {
            const normalized = normalizeRecruitUrl(recruitUrlRaw);
            if (normalized === null) {
                errors.recruitUrl = "URLの形式をご確認ください（例：https://example.jp/recruit/）。";
            } else {
                recruitUrl = normalized;
            }
        }
    }

    if (message.length > JOB_INQUIRY_LIMITS.message) {
        errors.message = `ご相談内容は${JOB_INQUIRY_LIMITS.message}文字以内でご記入ください。`;
    }

    if (Object.keys(errors).length > 0) return { ok: false, errors };

    return {
        ok: true,
        value: { facilityName, contactName, email, recruitUrl, message },
    };
}
