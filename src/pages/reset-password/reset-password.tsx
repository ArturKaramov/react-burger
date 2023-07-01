import React from "react";
import styles from "./reset-password.module.css";
import { Form } from "../../components/form/form";
import { useDispatch, useSelector } from "../../services/hooks";
import { createNewPassword } from "../../services/actions/user";
import { useNavigate, Navigate } from "react-router";
import { Preloader } from "../../components/preloader/preloader";
import { FORGOT_URL, LOGIN_URL } from "../../utils/data";
import { TInputValue } from "../../services/types/data";

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
        link: LOGIN_URL,
      },
    ],
  };

  const { passFailed, newPassRequest, newPassFailed } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (obj: TInputValue) => {
    createNewPassword(obj);
    if (!newPassFailed) {
      navigate(LOGIN_URL);
    }
  };

  return (
    <>
      {!passFailed ? (
        newPassRequest ? (
          <Preloader />
        ) : !newPassFailed ? (
          <Navigate to={LOGIN_URL} />
        ) : (
          <>
            <main className={styles.main}>
              <Form {...pageData} buttonClick={onClick} />
            </main>
          </>
        )
      ) : (
        <Navigate to={FORGOT_URL} />
      )}
    </>
  );
};
