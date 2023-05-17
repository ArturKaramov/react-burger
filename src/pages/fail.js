import styles from "./fail.module.css";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/data";

export const FailPage = () => {
  return (
    <>
      <div className={styles.error}>
        <span className="text text_type_main-large">
          Кажется, что-то пошло не так :&lang;
        </span>
        <Link to={baseUrl} className="text text_type_main-large">
          Вернуться на главную страницу
        </Link>
      </div>
    </>
  );
};
