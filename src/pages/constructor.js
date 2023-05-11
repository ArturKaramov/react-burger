import styles from "./constructor.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../components/app-header/app-header";
import BurgerIngridients from "../components/burger-ingridients/burger-ingridients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

export const ConstructorPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngridients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
};
