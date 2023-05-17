import styles from "./register.module.css";
import AppHeader from "../components/app-header/app-header";
import { Form } from "../components/form/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { registerUser } from "../services/actions/user";
import { Preloader } from "../components/preloader/preloader";
import { loginUrl, profileUrl } from "../utils/data";

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
        link: loginUrl,
      },
    ],
  };
  const { authRequest, authSuccess } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (obj) => {
    dispatch(registerUser(obj));
    navigate(loginUrl);
  };

  return (
    <>
      {authRequest ? (
        <Preloader />
      ) : authSuccess ? (
        <Navigate to={profileUrl} />
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
