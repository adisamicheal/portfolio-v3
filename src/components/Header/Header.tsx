import Link from "next/link";
import Button from "../Button/Button";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";

const Header = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    // Only runs on client-side
    const updateTime = () => {
      setTime(
        new Date().toLocaleString("en-US", {
          timeZone: "Europe/Lisbon",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
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
      <div className={styles.header__button}>
        <Button className={styles.header__button}>
          { time } WET
        </Button>
      </div>
    </header>
  );
};

export default Header;
