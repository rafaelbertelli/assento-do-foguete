import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={`${styles.header} py-8 px-0 max-w-[1180px] w-full`}>
      <Image src={logo} alt="logo" />
    </header>
  );
}
