import React from "react";
import AppHeader from "../app-header/app-header.js";
import BurgerIngridients from "../burger-ingridients/burger-ingridients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import appStyles from "./app.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux/es/exports.js";
import { getIngredients } from "../../services/actions/index.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(getIngredients()), []);

  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.burger
  );

  return (
    <>
      {ingredientsRequest ? (
        <div className={appStyles.loading}>
          <Logo />
        </div>
      ) : ingredientsFailed ? (
        <div className={appStyles.error}>
          <p className="text text_type_main-large">
            Кажется, данные не найдены :&lang;
          </p>
        </div>
      ) : (
        <>
          <AppHeader />
          <main className={appStyles.content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngridients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      )}
    </>
  );
}

export default App;
