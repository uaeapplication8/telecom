 export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/firebase/firestore";
import { Order } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const order = (await req.json()) as Order;
    await createOrder(order);
    return NextResponse.json({ id: order.id });
  } catch (err: any) {
    console.error("Create order error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
