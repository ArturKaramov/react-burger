import styles from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { exitUrl, orderHistoryUrl, profileUrl } from "../../utils/data";

export const ProfileNavigation = () => {
  const location = useLocation().pathname;
  return (
    <nav className={`${styles.menu} mr-15`}>
      <NavLink
        to={profileUrl}
        className={
          location === profileUrl
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        Профиль
      </NavLink>

      <NavLink
        to={orderHistoryUrl}
        className={
          location === orderHistoryUrl
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        История заказов
      </NavLink>
      <NavLink
        to={exitUrl}
        className={
          location === exitUrl
            ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
            : `${styles.link} text text_type_main-medium text_color_inactive`
        }
      >
        Выход
      </NavLink>
      {location === profileUrl && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </span>
      )}
      {location === orderHistoryUrl && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </span>
      )}
      {location === exitUrl && (
        <span className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете выйти из своего профиля
        </span>
      )}
    </nav>
  );
};
