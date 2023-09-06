import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { BASE_URL, FEED_URL, PROFILE_URL } from "../../utils/data";

export default function AppHeader() {
  const location = useLocation().pathname;

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <NavLink to={BASE_URL} className={styles.logoLink}>
        <Logo />
      </NavLink>
      <nav className={styles.menu}>
        <NavLink
          to={BASE_URL}
          state={{ from: location }}
          className={`${styles.link} pl-5 pr-5 pb-4 pt-4 mr-2`}
        >
          <BurgerIcon type={location === BASE_URL ? "primary" : "secondary"} />
          <p
            className={
              location === BASE_URL
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Конструктор
          </p>
        </NavLink>
        <NavLink
          to={{ pathname: FEED_URL }}
          state={{ from: location }}
          className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
        >
          <ListIcon type={location === FEED_URL ? "primary" : "secondary"} />
          <p
            className={
              location === FEED_URL
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Лента заказов
          </p>
        </NavLink>
        <NavLink
          to={PROFILE_URL}
          state={{ from: location }}
          className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
        >
          <ProfileIcon
            type={location.startsWith(PROFILE_URL) ? "primary" : "secondary"}
          />
          <p
            className={
              location.startsWith(PROFILE_URL)
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
}
