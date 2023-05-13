import styles from "./login.module.css";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { loginUser } from "../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { useEffect } from "react";
import { Preloader } from "../components/preloader/preloader";

export const LoginPage = () => {
  const pageData = {
    title: "Вход",
    inputs: [
      { name: "email", placeholder: "Email" },
      { name: "password", placeholder: "Пароль" },
    ],
    button: "Войти",
    links: [
      {
        question: "Вы — новый пользователь?",
        answer: "Зарегистрироваться",
        link: "/react-burger/register",
      },
      {
        question: "Забыли пароль?",
        answer: "Восстановить пароль",
        link: "/react-burger/forgot-password",
      },
    ],
  };

  const { authRequest, authFailed, authSuccess } = useSelector(
    (state) => state.user
  );
  const auth = useSelector((state) => !!state.user.user.name.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (obj) => {
    dispatch(loginUser(obj));
    navigate(-1);
  };

  return (
    <>
      <>
        <AppHeader />
        <main className={styles.main}>
          <Form {...pageData} buttonClick={onClick} />
        </main>
      </>
    </>
  );
};
