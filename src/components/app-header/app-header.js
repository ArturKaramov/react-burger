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
        <NavLink to={"/"} className={`${styles.link} pl-5 pr-5 pb-4 pt-4 mr-2`}>
          <BurgerIcon type={location === "/" ? "primary" : "secondary"} />
          <p
            className={
              location === "/"
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Конструктор
          </p>
        </NavLink>
        <NavLink className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}>
          <ListIcon type={location === "/feed" ? "primary" : "secondary"} />
          <p
            className={
              location === "/feed"
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Лента заказов
          </p>
        </NavLink>
        <NavLink
          to={"/login"}
          className={`${styles.link} ${styles.personal} pl-5 pr-5 pb-4 pt-4`}
        >
          <ProfileIcon
            type={location === "/profile" ? "primary" : "secondary"}
          />
          <p
            className={
              location === "/profile"
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
