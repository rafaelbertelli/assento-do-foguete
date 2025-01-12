import styles from "./product.module.css";

export function Product({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${styles.product}`}>
      {children}

      <footer>
        <strong>camiseta X</strong>
        <span>R$ 100,00</span>
      </footer>
    </div>
  );
}
