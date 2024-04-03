import styles from './login.module.css';
import { Form } from '../../components/form/form';
import { loginUser } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../services/hooks';
import { useNavigate } from 'react-router';
import { Preloader } from '../../components/preloader/preloader';
import { FORGOT_URL, REGISTER_URL } from '../../utils/data';

export const LoginPage = () => {
  const pageData = {
    title: 'Вход',
    inputs: [
      { name: 'email', placeholder: 'Email' },
      { name: 'password', placeholder: 'Пароль' },
    ],
    button: 'Войти',
    links: [
      {
        question: 'Вы — новый пользователь?',
        answer: 'Зарегистрироваться',
        link: REGISTER_URL,
      },
      {
        question: 'Забыли пароль?',
        answer: 'Восстановить пароль',
        link: FORGOT_URL,
      },
    ],
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authRequest } = useSelector((state) => state.user);

  const onClick = (obj: Record<'email' | 'password', string>) => {
    dispatch(loginUser(obj));
    navigate(-1);
  };

  return (
    <>
      {authRequest ? (
        <Preloader />
      ) : (
        <main className={styles.main}>
          <Form {...pageData} buttonClick={onClick} />
        </main>
      )}
    </>
  );
};
