import styles from "./register.module.css";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { useDispatch } from "react-redux";
import { registerUser } from "../services/actions/user";

export const RegisterPage = () => {
  const pageData = {
    title: "Регистрация",
    inputs: [
      { name: "name", placeholder: "Имя" },
      { name: "email", placeholder: "Email" },
      { name: "password", placeholder: "Пароль" },
    ],
    button: "Зарегистрироваться",
    links: [
      {
        question: "Уже зарегистрированы?",
        answer: "Войти",
        link: "/react-burger/login",
      },
    ],
  };

  const dispatch = useDispatch();

  const onClick = (obj) => {
    console.log(obj);
    dispatch(registerUser(obj));
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
