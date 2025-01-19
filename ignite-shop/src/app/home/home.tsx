import { Product } from "@/components/product/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { ProductType } from "@/types/products/product";
import { use } from "react";
import styles from "./home.module.css";

export function Home({ products }: { products: Promise<ProductType[]> }) {
  const allProducts = use(products);

  return (
    // <div className={`${styles.home} flex gap-12 ml-auto min-h-[656px]`}>
    <div className={`${styles.home} flex gap-12 min-h-[656px]`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {allProducts.map((product) => {
            return (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Product product={product} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
