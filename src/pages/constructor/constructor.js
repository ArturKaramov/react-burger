import styles from "./constructor.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngridients from "../../components/burger-ingridients/burger-ingridients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const ConstructorPage = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (state) => state.burger
  );
  return (
    <>
      {ingredientsRequest ? (
        <div className={styles.loading}>
          <Logo />
        </div>
      ) : ingredientsFailed ? (
        <div className={styles.error}>
          <span className="text text_type_main-large">
            Кажется, данные не найдены :&lang;
          </span>
        </div>
      ) : (
        <>
          <main className={styles.content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngridients />
              <BurgerConstructor />
            </DndProvider>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
};
