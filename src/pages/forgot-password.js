import styles from "./forgot-password.module.css";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const ForgotPage = () => {
  const pageData = {
    title: "Восстановление пароля",
    inputs: [{ name: "email", placeholder: "Укажите email" }],
    password: false,
    button: "Восстановить",
    links: [
      {
        question: "Вспомнили пароль",
        answer: "Войти",
        link: "/login",
      },
    ],
  };

  const navigate = useNavigate();

  const onClick = (email) => {
    api
      .resetPassword(email)
      .then((data) => console.log(data))
      .then(() => navigate("/reset-password"));
  };

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Form {...pageData} buttonClick={onClick} />
      </main>
    </>
  );
};
