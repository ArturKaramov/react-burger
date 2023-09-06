import styles from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { EXIT_URL, USER_ORDERS_URL, PROFILE_URL } from "../../utils/data";

export const ProfileNavigation = () => {
  const location = useLocation().pathname;
  return (
    <nav className={`${styles.menu} mr-15`}>
      <NavLink
        to={PROFILE_URL}
        state={{ from: location }}
        className={
          location === PROFILE_URL
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        Профиль
      </NavLink>

      <NavLink
        to={USER_ORDERS_URL}
        state={{ from: location }}
        className={
          location.startsWith(USER_ORDERS_URL)
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        История заказов
      </NavLink>
      <NavLink
        to={EXIT_URL}
        state={{ from: location }}
        className={
          location === EXIT_URL
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        Выход
      </NavLink>
      {location === PROFILE_URL && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      )}
      {location.startsWith(USER_ORDERS_URL) && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </span>
      )}
      {location === EXIT_URL && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете выйти из своего профиля
        </span>
      )}
    </nav>
  );
};
