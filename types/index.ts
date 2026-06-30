export type PlanCategory = "postpaid" | "prepaid" | "home-wifi";

export interface Plan {
  id: string;
  category: PlanCategory;
  name: string;
  tagline: string;
  price: number;
  currency: "AED";
  data: string;
  minutes: string;
  sms: string;
  speed?: string;
  features: string[];
  popular?: boolean;
}

export interface Device {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  monthlyFrom: number;
  colors: string[];
  storageOptions: string[];
  specs: { label: string; value: string }[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validTill: string;
  image: string;
}

export interface CartItem {
  id: string;
  type: "plan" | "device";
  refId: string;
  name: string;
  price: number;
  quantity: number;
  meta?: Record<string, string>;
}

export type OrderItem = CartItem;

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Address {
  fullName: string;
  phone: string;
  emirate: string;
  city: string;
  street: string;
  building?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: Address;
  paymentIntentId?: string;
  invoiceUrl?: string;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role: "customer" | "admin";
  createdAt: string;
}
