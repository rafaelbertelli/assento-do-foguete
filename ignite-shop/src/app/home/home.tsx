import image1 from "@/assets/image-1.png";
import image2 from "@/assets/image-2.png";
import image3 from "@/assets/image-3.png";
import image4 from "@/assets/image-4.png";
import image5 from "@/assets/image-5.png";
import { Product } from "@/components/product/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

import { use } from "react";
import styles from "./home.module.css";

export function Home({ products }: { products: Promise<any[]> }) {
  const allProducts = use(products);
  // console.log(allProducts);

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
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Product>
              <Image
                src={image1}
                alt="image-1"
                width={520}
                height={480}
                style={{ objectFit: "cover" }}
              />
            </Product>
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Product>
              <Image src={image2} alt="image-2" width={520} height={480} />
            </Product>
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Product>
              <Image src={image3} alt="image-3" width={520} height={480} />
            </Product>
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Product>
              <Image src={image4} alt="image-4" width={520} height={480} />
            </Product>
          </CarouselItem>

          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <Product>
              <Image src={image5} alt="image-5" width={520} height={480} />
            </Product>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
