import AppHeader from "../components/app-header/app-header";
import { NavLink, useLocation } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { api } from "../utils/api";
import { updateUser } from "../services/actions/user";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { authSuccess, user } = useSelector((state) => state.user);
  const [value, setValue] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onCancelClick = () => {
    setValue({ name: user.name, email: user.email, password: "" });
  };

  const onSaveClick = () => {
    dispatch(updateUser(value));
  };

  const location = useLocation().pathname;

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
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
            to={{ pathname: "react-burger/profile/orders" }}
            className={
              location === "/react-burger/profile/orders"
                ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
                : `${styles.link} text text_type_main-medium text_color_inactive`
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={{ pathname: "/profile/orders/exit" }}
            className={
              location === "/profile/orders/exit"
                ? `${styles.activeLink} ${styles.link} text text_type_main-medium `
                : `${styles.link} text text_type_main-medium text_color_inactive`
            }
          >
            Выход
          </NavLink>
          <span className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </nav>
        <form>
          <Input
            type={"text"}
            onChange={onChange}
            value={value.name}
            placeholder={"Имя"}
            name={"name"}
            errorText={"Ошибка"}
            size={"default"}
            icon={"EditIcon"}
            extraClass="mb-6"
          />
          <EmailInput
            onChange={onChange}
            name={"email"}
            value={value.email}
            placeholder={"Логин"}
            icon={"EditIcon"}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChange}
            value={value.password}
            name={"password"}
            icon="EditIcon"
            placeholder={"Пароль"}
            extraClass="mb-6"
          />
          <div className={styles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={onCancelClick}
            >
              Отмена
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={onSaveClick}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};
