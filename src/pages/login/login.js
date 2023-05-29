import styles from "./login.module.css";
import { Form } from "../../components/form/form";
import { loginUser } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Preloader } from "../../components/preloader/preloader";
import { forgotUrl, registerUrl } from "../../utils/data";

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
        link: registerUrl,
      },
      {
        question: "Забыли пароль?",
        answer: "Восстановить пароль",
        link: forgotUrl,
      },
    ],
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authRequest, authSuccess } = useSelector((state) => state.user);

  const onClick = (obj) => {
    dispatch(loginUser(obj));
    navigate(-1);
  };

  return (
    <>
      {authRequest ? (
        <Preloader />
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
