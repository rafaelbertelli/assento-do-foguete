import logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export function Header() {
  return (
    // <header className={`${styles.header} py-8 px-0 max-w-[1180px] w-full`}>
    <header className={`${styles.header} py-8 px-0 w-full`}>
      <Link href="/">
        <Image src={logo} alt="logo" />
      </Link>
    </header>
  );
}
