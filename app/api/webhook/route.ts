 export const dynamic = 'force-dynamic';
 import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { updateOrderStatus } from "@/firebase/firestore";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    if (!sig || !webhookSecret) throw new Error("Missing webhook signature or secret");
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      await updateOrderStatus(orderId, "confirmed");
    }
  }

  return NextResponse.json({ received: true });
}
