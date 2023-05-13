import styles from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ProfileNavigation = () => {
  const location = useLocation().pathname;
  return (
    <nav className={`${styles.menu} mr-15`}>
      <NavLink
        to="/react-burger/profile"
        className={
          location === "/react-burger/profile"
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        Профиль
      </NavLink>

      <NavLink
        to={{ pathname: "/react-burger/profile/orders" }}
        className={
          location === "/react-burger/profile/orders"
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        История заказов
      </NavLink>
      <NavLink
        to={{ pathname: "/react-burger/profile/exit" }}
        className={
          location === "/react-burger/profile/exit"
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        Выход
      </NavLink>
      {location === "/react-burger/profile" && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      )}
      {location === "/react-burger/profile/orders" && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </span>
      )}
      {location === "/react-burger/profile/exit" && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете выйти из своего профиля
        </span>
      )}
    </nav>
  );
};
