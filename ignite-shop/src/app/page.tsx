export const revalidate = 86400; // Cache de 24 horas

import { Home } from "@/components/home";
import { getProducts } from "@/services/products/get-products";
import { Suspense } from "react";

export default function InitialPage() {
  const products = getProducts();

  return (
    <main className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Home products={products} />
      </Suspense>
    </main>
  );
}
