import styles from "./register.module.css";
import { Form } from "../../components/form/form";
import { useDispatch, useSelector } from "../../services/hooks";
import { useNavigate, Navigate } from "react-router-dom";
import { registerUser } from "../../services/actions/user";
import { Preloader } from "../../components/preloader/preloader";
import { LOGIN_URL, PROFILE_URL } from "../../utils/data";
import { TInputValue } from "../../services/types/data";

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
        link: LOGIN_URL,
      },
    ],
  };
  const { authRequest, authFailed } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (obj: TInputValue) => {
    dispatch(registerUser(obj));
    navigate(LOGIN_URL);
  };

  return (
    <>
      {authRequest ? (
        <Preloader />
      ) : !authFailed ? (
        <Navigate to={PROFILE_URL} />
      ) : (
        <>
          <main className={styles.main}>
            <Form {...pageData} buttonClick={onClick} />
          </main>
        </>
      )}
    </>
  );
};
