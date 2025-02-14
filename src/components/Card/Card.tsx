import { CardProps } from "@/types";
import styles from "./Card.module.scss";

const Card = ({ id, name, image }: CardProps) => {
  return (
    <div className={styles.card} key={id}>
      <img className={styles.card__image} src={image} alt={name} />
      <div className={styles.card__name}>
        <h3  className={styles.card__name__text}>{name}</h3>

        <div  className={styles.card__name__icon}>
          <svg
            width="38"
            height="16"
            viewBox="0 0 38 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.7071 8.70711C38.0976 8.31658 38.0976 7.68342 37.7071 7.29289L31.3431 0.928932C30.9526 0.538408 30.3195 0.538408 29.9289 0.928932C29.5384 1.31946 29.5384 1.95262 29.9289 2.34315L35.5858 8L29.9289 13.6569C29.5384 14.0474 29.5384 14.6805 29.9289 15.0711C30.3195 15.4616 30.9526 15.4616 31.3431 15.0711L37.7071 8.70711ZM0 9H37V7L0 7V9Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Card;
