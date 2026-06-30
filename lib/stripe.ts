import Stripe from "stripe";

export const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
  }
  return new Stripe(key, { apiVersion: "2024-06-20" });
};
