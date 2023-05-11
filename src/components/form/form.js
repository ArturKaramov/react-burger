import styles from "./form.module.css";
import React from "react";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Form = (props) => {
  const { title, inputs, button, links, buttonClick } = props;
  const initValue = {};
  inputs.map((input) => (initValue[input.name] = ""));

  const [value, setValue] = React.useState(initValue);

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      <form className={styles.form}>
        {inputs.map((item, i) =>
          item.name === "email" ? (
            <EmailInput
              key={i}
              onChange={onChange}
              name={item.name}
              value={value[item.name]}
              placeholder={item.placeholder}
              isIcon={false}
              extraClass="mb-6"
            />
          ) : item.name === "password" ? (
            <PasswordInput
              key={i}
              onChange={onChange}
              value={value[item.name]}
              name={"password"}
              placeholder={item.placeholder}
              extraClass="mb-6"
            />
          ) : (
            <Input
              key={i}
              type={"text"}
              onChange={onChange}
              value={value[item.name]}
              placeholder={item.placeholder}
              name={item.name}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="mb-6"
            />
          )
        )}
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={() => buttonClick(value)}
        >
          {button}
        </Button>
      </form>
      {links.map((item, i) => (
        <p key={i} className="text text_type_main-default mb-4">
          {item.question + " "}
          <Link to={item.link} className={styles.answer}>
            {item.answer}
          </Link>
        </p>
      ))}
    </div>
  );
};
