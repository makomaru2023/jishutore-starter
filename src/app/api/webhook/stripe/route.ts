import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { buildOrder, saveOrder, PRODUCT_ZIP_KEYS } from "@/lib/orders";
import { POSTURE_SELF_TRAINING_PRICE_ID } from "@/lib/products";

// Disable Next.js body parsing — Stripe needs the raw request body for signature verification.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Map a Stripe Price ID to our internal productId.
 * Update when adding more products.
 */
function priceIdToProductId(priceId: string | null | undefined): string | null {
    if (!priceId) return null;
    const map: Record<string, string> = {
        [process.env.STRIPE_PRICE_ID_SELF_TRAINING_SET || ""]: "self-training-materials-vol01",
        [POSTURE_SELF_TRAINING_PRICE_ID]: "home-elderly-self-training",
    };
    return map[priceId] || null;
}

export async function POST(req: NextRequest) {
    if (!WEBHOOK_SECRET) {
        console.error("STRIPE_WEBHOOK_SECRET is not set");
        return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        const rawBody = await req.text();
        event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET);
    } catch (err) {
        console.error("Stripe webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type !== "checkout.session.completed") {
        // Acknowledge other events to avoid Stripe retries.
        return NextResponse.json({ received: true, ignored: event.type });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
        // Don't fulfill unpaid sessions.
        return NextResponse.json({ received: true, skipped: "unpaid" });
    }

    try {
        // Determine which product was purchased by looking at the line items.
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 5 });
        const priceId = lineItems.data[0]?.price?.id;
        const productId = priceIdToProductId(priceId);

        if (!productId || !PRODUCT_ZIP_KEYS[productId]) {
            console.error(`Unknown priceId in completed session ${session.id}: ${priceId}`);
            return NextResponse.json({ received: true, error: "unknown product" }, { status: 200 });
        }

        const order = buildOrder({
            sessionId: session.id,
            productId,
            amount: session.amount_total ?? 0,
            currency: session.currency ?? "jpy",
            email: session.customer_details?.email ?? session.customer_email ?? null,
            stripeCustomerId: typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
            paymentStatus: session.payment_status,
        });

        await saveOrder(order);
        console.log(`Order saved: ${order.sessionId} (${order.productId})`);
    } catch (err) {
        console.error("Failed to persist order from webhook:", err);
        // Return 500 so Stripe retries.
        return NextResponse.json({ error: "fulfillment failed" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
