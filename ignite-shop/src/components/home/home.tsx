import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { ProductType } from "@/types/products/product";

import Link from "next/link";
import { use } from "react";
import { CarouselProduct } from "../carousel-product/carousel-product";
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
                <Link href={`/product/${product.id}`}>
                  <CarouselProduct product={product} />
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
