import styles from './forgot-password.module.css';
import { Form } from '../../components/form/form';
import { Navigate } from 'react-router-dom';
import { resetPassword } from '../../services/thunks/user';
import { useDispatch, useSelector } from '../../services/hooks';
import { Preloader } from '../../components/preloader/preloader';
import { LOGIN_URL, RESET_URL } from '../../utils/data';

export const ForgotPage = () => {
  const pageData = {
    title: 'Восстановление пароля',
    inputs: [{ name: 'email', placeholder: 'Укажите email' }],
    button: 'Восстановить',
    links: [
      {
        question: 'Вспомнили пароль',
        answer: 'Войти',
        link: LOGIN_URL,
      },
    ],
  };
  const { passRequest, passSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClick = (mail: Record<'email', string>) => {
    dispatch(resetPassword(mail));
  };

  return (
    <>
      {passRequest ? (
        <Preloader />
      ) : passSuccess ? (
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
