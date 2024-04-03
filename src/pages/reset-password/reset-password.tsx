import React, { useEffect } from 'react';
import styles from './reset-password.module.css';
import { Form } from '../../components/form/form';
import { useDispatch, useSelector } from '../../services/hooks';
import { createNewPassword } from '../../services/actions/user';
import { useNavigate } from 'react-router';
import { Preloader } from '../../components/preloader/preloader';
import { FORGOT_URL, LOGIN_URL } from '../../utils/data';

export const ResetPage = () => {
  const pageData = {
    title: 'Восстановление пароля',
    inputs: [
      { name: 'password', placeholder: 'Введите новый пароль' },
      { name: 'token', placeholder: 'Введите код из письма' },
    ],
    button: 'Сохранить',
    links: [
      {
        question: 'Вспомнили пароль?',
        answer: 'Войти',
        link: LOGIN_URL,
      },
    ],
  };

  const { passSuccess, newPassRequest, newPassSuccess } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!passSuccess && !newPassSuccess) {
      navigate(FORGOT_URL);
    }
  }, [passSuccess, newPassSuccess]);

  const onClick = (obj: Record<'password' | 'token', string>) => {
    dispatch(createNewPassword(obj));
    navigate(LOGIN_URL);
  };

  return (
    <>
      {newPassRequest ? (
        <Preloader />
      ) : (
        <main className={styles.main}>
          <Form {...pageData} buttonClick={onClick} />
        </main>
      )}
    </>
  );
};
