import styles from "./forgot-password.module.css";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { api } from "../utils/api";
import { useNavigate, Navigate } from "react-router-dom";
import { resetPassword } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Preloader } from "../components/preloader/preloader";
import { useEffect } from "react";
import { loginUrl, resetUrl } from "../utils/data";

export const ForgotPage = () => {
  const pageData = {
    title: "Восстановление пароля",
    inputs: [{ name: "email", placeholder: "Укажите email" }],
    button: "Восстановить",
    links: [
      {
        question: "Вспомнили пароль",
        answer: "Войти",
        link: loginUrl,
      },
    ],
  };
  const { passRequest, passSuccess, passFailed } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = (email) => {
    dispatch(resetPassword(email));
  };

  return (
    <>
      {passRequest ? (
        <Preloader />
      ) : passSuccess ? (
        <Navigate to={resetUrl} />
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
