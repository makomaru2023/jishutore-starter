import { cookies } from "next/headers";
import { PLUS_SESSION_COOKIE, verifySessionToken } from "@/lib/plus-auth";
import { hasActivePlusForCustomer } from "@/lib/plus-subscription";

/**
 * 現在も有効な Plus 会員かどうかを、サーバー側で判定する。
 *
 * セッションCookie（署名JWT・30日）の検証だけでは「解約後もCookieの期限まで
 * 閲覧できる」抜け道が残るため、Stripe の契約状態（解約者を弾く）まで確認する。
 * ダウンロードAPIと同じ基準。会員限定の「表示」ゲートに使う。
 */
export async function hasActivePlusAccess(): Promise<boolean> {
    const token = (await cookies()).get(PLUS_SESSION_COOKIE)?.value;
    if (!token) return false;
    const session = await verifySessionToken(token);
    if (!session) return false;
    return hasActivePlusForCustomer(session.cid);
}
