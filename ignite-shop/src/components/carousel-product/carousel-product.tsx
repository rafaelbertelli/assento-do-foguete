import { formatCurrency } from "@/lib/formatCurrency";
import { ProductType } from "@/types/products/product";
import Image from "next/image";
import styles from "./carousel-product.module.css";

export function CarouselProduct({ product }: { product: ProductType }) {
  return (
    <div className={`${styles.carouselProduct}`}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={520}
        height={480}
        style={{ objectFit: "cover" }}
      />

      <footer className={styles.footer}>
        <strong className={styles.title}>{product.name}</strong>
        <span className={styles.price}>
          {product.price ? formatCurrency(product.price) : "Esgotado"}
        </span>
      </footer>
    </div>
  );
}
