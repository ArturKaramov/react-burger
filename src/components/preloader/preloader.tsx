import styles from "./preloader.module.css";
import burger from "../../images/burger.svg";

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img src={burger} alt="Burger" className={styles.burger} />
    </div>
  );
};
