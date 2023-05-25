import { ProfileNavigation } from "../../components/profile-navigation/profile-navigation";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { updateUser } from "../../services/actions/user";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [value, setValue] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onCancelClick = () => {
    setValue({ name: user.name, email: user.email, password: "" });
  };

  const onSaveClick = () => {
    dispatch(updateUser(value));
  };

  return (
    <>
      <main className={styles.main}>
        <ProfileNavigation />
        <form>
          <Input
            type={"text"}
            onChange={onChange}
            value={value.name}
            placeholder={"Имя"}
            name={"name"}
            errorText={"Ошибка"}
            size={"default"}
            icon={"EditIcon"}
            extraClass="mb-6"
          />
          <EmailInput
            onChange={onChange}
            name={"email"}
            value={value.email}
            placeholder={"Логин"}
            icon={"EditIcon"}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChange}
            value={value.password}
            name={"password"}
            icon="EditIcon"
            placeholder={"Пароль"}
            extraClass="mb-6"
          />
          <div className={styles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={onCancelClick}
            >
              Отмена
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={onSaveClick}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};
