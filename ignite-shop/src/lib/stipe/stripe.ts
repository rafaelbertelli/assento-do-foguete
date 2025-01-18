import Stripe from "stripe";

export const stripe = new Stripe(process.env.SECRET_KEY_STRIPE!, {
  apiVersion: "2024-12-18.acacia",
  appInfo: {
    name: "Ignite Shop",
  },
});
