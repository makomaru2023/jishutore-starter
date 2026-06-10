import { getR2ObjectAsString, putR2Object } from "./r2";

const REDOWNLOAD_WINDOW_DAYS = 30;

export interface Order {
    sessionId: string;
    productId: string;
    amount: number;
    currency: string;
    email: string | null;
    stripeCustomerId: string | null;
    paymentStatus: string;
    createdAt: string; // ISO 8601
    expiresAt: string; // ISO 8601
    zipKey: string; // R2 object key of the product ZIP
}

/**
 * Map of productId -> R2 key of the product ZIP.
 * Update this when adding new products.
 */
export const PRODUCT_ZIP_KEYS: Record<string, string> = {
    "self-training-materials-vol01": "products/jishutore-materials-vol01.zip",
    "home-elderly-self-training": "products/home-elderly-self-training.zip",
    // バンドル：order.zipKey は R2 から配信する疾患別ZIPを指す。
    // 姿勢別ZIPは public/files/ から直接配信するため、サンクスページ側で別途リンクを出す。
    "bundle-self-training-set": "products/jishutore-materials-vol01.zip",
};

function orderKey(sessionId: string): string {
    return `orders/${sessionId}.json`;
}

export async function saveOrder(order: Order): Promise<void> {
    await putR2Object(orderKey(order.sessionId), JSON.stringify(order, null, 2), "application/json");
}

export async function getOrder(sessionId: string): Promise<Order | null> {
    const raw = await getR2ObjectAsString(orderKey(sessionId));
    if (!raw) return null;
    try {
        return JSON.parse(raw) as Order;
    } catch {
        return null;
    }
}

/** Returns true if the order is still within its re-download window. */
export function isOrderActive(order: Order): boolean {
    return new Date(order.expiresAt).getTime() > Date.now();
}

export function buildOrder(input: {
    sessionId: string;
    productId: string;
    amount: number;
    currency: string;
    email: string | null;
    stripeCustomerId: string | null;
    paymentStatus: string;
}): Order {
    const now = new Date();
    const expires = new Date(now.getTime() + REDOWNLOAD_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    const zipKey = PRODUCT_ZIP_KEYS[input.productId];
    if (!zipKey) {
        throw new Error(`No zipKey configured for productId=${input.productId}`);
    }
    return {
        ...input,
        createdAt: now.toISOString(),
        expiresAt: expires.toISOString(),
        zipKey,
    };
}
