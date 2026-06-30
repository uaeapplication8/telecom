import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Order, OrderStatus } from "@/types";

const ORDERS = "orders";

export async function createOrder(order: Order) {
  await setDoc(doc(db, ORDERS, order.id), {
    ...order,
    createdAt: serverTimestamp(),
  });
  return order.id;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, ORDERS, orderId));
  if (!snap.exists()) return null;
  return normalizeOrder(snap.id, snap.data());
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, ORDERS),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeOrder(d.id, d.data()));
}

export async function getAllOrders(): Promise<Order[]> {
  const q = query(collection(db, ORDERS), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => normalizeOrder(d.id, d.data()));
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await updateDoc(doc(db, ORDERS, orderId), { status });
}

function normalizeOrder(id: string, data: any): Order {
  const createdAt =
    data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : data.createdAt || new Date().toISOString();
  return { ...(data as Order), id, createdAt };
}
