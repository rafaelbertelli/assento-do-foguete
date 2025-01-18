import { formatCurrency } from "@/lib/formatCurrency";
import { ProductType } from "@/types/products/product";
import Image from "next/image";
import styles from "./product.module.css";

export function Product({ product }: { product: ProductType }) {
  return (
    <div className={`${styles.product}`}>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={520}
        height={480}
        style={{ objectFit: "cover" }}
      />

      <footer className={styles.productFooter}>
        <strong className={styles.productTitle}>{product.name}</strong>
        <span className={styles.productPrice}>
          {product.price ? formatCurrency(product.price) : "Esgotado"}
        </span>
      </footer>
    </div>
  );
}
