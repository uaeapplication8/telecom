import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { items, orderId, customerEmail } = (await req.json()) as {
      items: CartItem[];
      orderId: string;
      customerEmail: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      line_items: items.map((item) => ({
        price_data: {
          currency: "aed",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      metadata: { orderId },
      success_url: `${siteUrl}/order-tracking/${orderId}?success=true`,
      cancel_url: `${siteUrl}/checkout?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
