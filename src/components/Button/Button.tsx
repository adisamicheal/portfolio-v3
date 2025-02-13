import styles from "./Button.module.scss";
import { ButtonProps } from "@/types";

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
