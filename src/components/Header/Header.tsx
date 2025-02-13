import Button from "../Button/Button";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <p>MICHEAL ADISA</p>
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
