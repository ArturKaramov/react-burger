import styles from "./forgot-password.module.css";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { api } from "../utils/api";

export const ResetPage = () => {
  const pageData = {
    title: "Восстановление пароля",
    reset: true,
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

  const onClick = (obj) => {
    api
      .createNewPassword(obj)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
