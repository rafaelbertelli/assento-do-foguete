import Image from "next/image";
import logo from "../../assets/logo.svg";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Image src={logo} alt="logo" />
    </header>
  );
}
