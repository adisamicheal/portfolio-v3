import Link from "next/link";
import Button from "../Button/Button";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">
          <p>
            MICHEAL <br /> ADISA
          </p>
        </Link>
      </div>
      <div>
        <p>EKÁÀBÒ 👋🏾</p>
      </div>
      <div>
        <Button className={styles.header__button}>📝 CONTACT</Button>
      </div>
    </header>
  );
};

export default Header;
