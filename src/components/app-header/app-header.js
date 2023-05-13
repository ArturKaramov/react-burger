import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";

export default function AppHeader() {
  const location = useLocation().pathname;

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.menu}>
        <NavLink
          to={"/react-burger"}
          className={`${styles.link} pl-5 pr-5 pb-4 pt-4 mr-2`}
        >
          <BurgerIcon
            type={location === "/react-burger" ? "primary" : "secondary"}
          />
          <p
            className={
              location === "/react-burger"
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Конструктор
          </p>
        </NavLink>
        <NavLink className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}>
          <ListIcon
            type={location === "/react-burger/feed" ? "primary" : "secondary"}
          />
          <p
            className={
              location === "/react-burger/feed"
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Лента заказов
          </p>
        </NavLink>
        <NavLink
          to={"/react-burger/profile"}
          className={`${styles.link} ${styles.personal} pl-5 pr-5 pb-4 pt-4`}
        >
          <ProfileIcon
            type={
              location === "/react-burger/profile" ? "primary" : "secondary"
            }
          />
          <p
            className={
              location === "/react-burger/profile"
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
