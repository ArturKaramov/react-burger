import styles from "./forgot-password.module.css";
import { Form } from "../../components/form/form";
import { useNavigate, Navigate } from "react-router-dom";
import { resetPassword } from "../../services/actions/user";
import { useDispatch, useSelector } from "../../services/hooks";
import { Preloader } from "../../components/preloader/preloader";
import { LOGIN_URL, RESET_URL } from "../../utils/data";
import { TInputValue } from "../../services/types/data";

export const ForgotPage = () => {
  const pageData = {
    title: "Восстановление пароля",
    inputs: [{ name: "email", placeholder: "Укажите email" }],
    button: "Восстановить",
    links: [
      {
        question: "Вспомнили пароль",
        answer: "Войти",
        link: LOGIN_URL,
      },
    ],
  };
  const { passRequest, passFailed } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = (email: TInputValue) => {
    dispatch(resetPassword(email));
  };

  return (
    <>
      {passRequest ? (
        <Preloader />
      ) : !passFailed ? (
        <Navigate to={RESET_URL} />
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
