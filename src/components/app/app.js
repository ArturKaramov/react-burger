import React from "react";
import AppHeader from "../app-header/app-header.js";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import appStyles from "./app.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { api } from "../../utils/api.js";
import { BurgerContext } from "../../services/burgerContext.js";

function App() {
  const [ingridientList, setIngridientList] = React.useState({
    success: false,
    data: [],
    isLoading: false,
  });

  const getData = () => {
    setIngridientList({ ...ingridientList, isLoading: true });
    api
      .getData()
      .then((ans) =>
        setIngridientList({ success: true, data: ans.data, isLoading: false })
      )
      .catch((err) => {
        console.error(err);
        setIngridientList({ ...ingridientList, isLoading: false });
      });
  };

  React.useEffect(() => getData(), []);

  return (
    <>
      {ingridientList.isLoading ? (
        <div className={appStyles.loading}>
          <Logo />
        </div>
      ) : ingridientList.success ? (
        <BurgerContext.Provider value={ingridientList}>
          <AppHeader />
          <main className={appStyles.content}>
            <BurgerIngridients />
            <BurgerConstructor />
          </main>
        </BurgerContext.Provider>
      ) : (
        <div className={appStyles.error}>
          <p className="text text_type_main-large">
            Кажется, данные не найдены :&lang;
          </p>
        </div>
      )}
    </>
  );
}

export default App;
