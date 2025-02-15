import { useEffect, useState } from "react";
import Button from "../Button/Button";
import styles from "./Footer.module.scss";
import SpotifyCard from "../SpotifyCard/SpotifyCard";

const Footer = () => {
  const [time, setTime] = useState("");
  const [buttonText, setButtonText] = useState("Click here to copy");

  useEffect(() => {
    // Only runs on client-side
    const updateTime = () => {
      setTime(
        new Date().toLocaleString("en-US", {
          timeZone: "Europe/Lisbon",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const goToSocial = (url: string) => {
    window.open(url, "_blank");
  };

  const clickToCopyEmail = () => {
    const email = "adisamicheal20@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
      setButtonText("copied");
      setTimeout(() => {
        setButtonText("Click here to copy");
      }, 2000);
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__collaborate}>
        <div className={styles.footer__collaborate__wrapper}>
          <a
            href="mailto:adisamicheal20@gmail.com"
            className={styles.footer__collaborate__text}
          >
            Talk to me — Let&apos;s Collaborate
          </a>
        </div>
        <div className={styles.footer__collaborate__email}>
          <Button
            className={styles.footer__collaborate__email__button}
            onClick={clickToCopyEmail}
          >
            {buttonText}
          </Button>
          <p>adisamicheal20@gmail.com</p>
        </div>
      </div>
      <div className={styles.footer__footnote}>
        <div>
          <p>
            LISBON, PORTUGAL <span>{time || "Loading..."}</span>
          </p>
          <div className={styles.footer__footnote__music}>

          <SpotifyCard />
          </div>
        </div>
        <div className={styles.footer__footnote__social}>
          <Button
            className={styles.footer__button}
            onClick={() => goToSocial("https://github.com/adisamicheal")}
          >
            Github
          </Button>
          <Button
            className={styles.footer__button}
            onClick={() =>
              goToSocial("https://www.linkedin.com/in/micheal-adisa-5b5250170/")
            }
          >
            Linkedin
          </Button>
          <Button
            className={styles.footer__button}
            onClick={() => goToSocial("https://x.com/michellead")}
          >
            Twitter
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
