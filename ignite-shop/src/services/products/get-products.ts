"use server";
import { stripe } from "@/lib/stipe/stripe";
import { ProductType } from "@/types/products/product";
import Stripe from "stripe";

export async function getProducts(): Promise<ProductType[]> {
  const response = await stripe.products.list({
    limit: 10,
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    };
  });

  return products;
}
