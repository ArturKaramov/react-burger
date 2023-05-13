import styles from "./forgot-password.module.css";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { api } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { createNewPassword } from "../services/actions/user";
import { useNavigate, Navigate } from "react-router";
import { useEffect } from "react";
import { Preloader } from "../components/preloader/preloader";

export const ResetPage = () => {
  const pageData = {
    title: "Восстановление пароля",
    inputs: [
      { name: "password", placeholder: "Введите новый пароль" },
      { name: "token", placeholder: "Введите код из письма" },
    ],
    button: "Сохранить",
    links: [
      {
        question: "Вспомнили пароль?",
        answer: "Войти",
        link: "/react-burger/login",
      },
    ],
  };

  const { passSuccess, newPassRequest, newPassSuccess, newPassFailed } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (password) => {
    dispatch(createNewPassword(password));
    if (newPassSuccess) {
      navigate("/react-burger/login");
    }
  };

  return (
    <>
      {newPassRequest ? (
        <Preloader />
      ) : newPassSuccess ? (
        <Navigate to="/react-burger/login" />
      ) : (
        <>
          <AppHeader />
          <main className={styles.main}>
            <Form {...pageData} buttonClick={onClick} />
          </main>
        </>
      )}
    </>
  );
};
