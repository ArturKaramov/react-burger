import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import { baseUrl, feedUrl, profileUrl } from "../../utils/data";

export default function AppHeader() {
  const location = useLocation().pathname;

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <NavLink to={baseUrl} className={styles.logoLink}>
        <Logo />
      </NavLink>
      <nav className={styles.menu}>
        <NavLink
          to={baseUrl}
          className={`${styles.link} pl-5 pr-5 pb-4 pt-4 mr-2`}
        >
          <BurgerIcon type={location === baseUrl ? "primary" : "secondary"} />
          <p
            className={
              location === baseUrl
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Конструктор
          </p>
        </NavLink>
        <NavLink className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}>
          <ListIcon type={location === feedUrl ? "primary" : "secondary"} />
          <p
            className={
              location === feedUrl
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Лента заказов
          </p>
        </NavLink>
        <Link to={profileUrl} className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}>
          <ProfileIcon
            type={location.startsWith(profileUrl) ? "primary" : "secondary"}
          />
          <p
            className={
              location.startsWith(profileUrl)
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Личный кабинет
          </p>
        </Link>
      </nav>
    </header>
  );
}
