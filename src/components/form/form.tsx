import { FC } from 'react';
import styles from './form.module.css';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

type Props = {
  title: string;
  inputs: { name: string; placeholder: string }[];
  button: string;
  links: { question: string; answer: string; link: string }[];
  buttonClick: (value: Record<string, string>) => void;
};

export const Form: FC<Props> = ({ title, inputs, button, links, buttonClick }) => {
  const getInitValues = () => {
    const initValue: Record<string, string> = {};
    inputs.map((input) => (initValue[input.name] = ''));
    return initValue;
  };
  const initValue: Record<string, string> = getInitValues();

  const [value, setValue] = React.useState<Record<string, string>>(initValue);

  const isDisabled = useMemo(
    () =>
      Object.values(value).some((item) => {
        return item.length === 0;
      }),
    [value],
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          buttonClick(value);
        }}
      >
        {inputs.map((item, i) =>
          item.name === 'email' ? (
            <EmailInput
              key={i}
              onChange={onChange}
              name="email"
              value={value.email}
              placeholder={item.placeholder}
              isIcon={false}
              extraClass="mb-6"
            />
          ) : item.name === 'password' ? (
            <PasswordInput
              key={i}
              onChange={onChange}
              value={value[item.name]}
              name={'password'}
              placeholder={item.placeholder}
              extraClass="mb-6"
            />
          ) : (
            <Input
              key={i}
              type={'text'}
              onChange={onChange}
              value={value[item.name]}
              placeholder={item.placeholder}
              name={item.name}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="mb-6"
            />
          ),
        )}
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
          disabled={isDisabled}
        >
          {button}
        </Button>
      </form>
      {links.map((item, i) => (
        <p key={i} className="text text_type_main-default text_color_inactive mb-4">
          {item.question + ' '}
          <Link to={item.link} className={styles.answer}>
            {item.answer}
          </Link>
        </p>
      ))}
    </div>
  );
};
