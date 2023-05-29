import styles from "./reset-password.module.css";
import { Form } from "../../components/form/form";
import { useDispatch, useSelector } from "react-redux";
import { createNewPassword } from "../../services/actions/user";
import { useNavigate, Navigate } from "react-router";
import { Preloader } from "../../components/preloader/preloader";
import { forgotUrl, loginUrl } from "../../utils/data";

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
        link: loginUrl,
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
      navigate(loginUrl);
    }
  };

  return (
    <>
      {passSuccess ? (
        newPassRequest ? (
          <Preloader />
        ) : newPassSuccess ? (
          <Navigate to={loginUrl} />
        ) : (
          <>
            <main className={styles.main}>
              <Form {...pageData} buttonClick={onClick} />
            </main>
          </>
        )
      ) : (
        <Navigate to={forgotUrl} />
      )}
    </>
  );
};
