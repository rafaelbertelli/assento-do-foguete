import styles from "./Header.module.css";

import ignateLogo from "../assets/ignite.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={ignateLogo} alt="Ignite Logo" />
    </header>
  );
}
