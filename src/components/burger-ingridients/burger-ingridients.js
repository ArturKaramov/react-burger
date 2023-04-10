import React from "react";
import burgerIngridientsStyles from "./burger-ingridients.module.css";
import IngridientPanel from "../ingridient-panel/ingridient-panel";
import { BUN, SAUCE, MAIN } from "../../utils/data";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd/dist/hooks";
import { v4 as uuidv4 } from "uuid";

function BurgerIngridients() {
  const ingridientList = useSelector((state) => state.burger.items);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const parentRef = useRef(null);

  const ingrTypes = [
    {
      name: "Булки",
      type: BUN,
      ref: bunRef,
    },
    {
      name: "Соусы",
      type: SAUCE,
      ref: sauceRef,
    },
    {
      name: "Начинки",
      type: MAIN,
      ref: mainRef,
    },
  ];
  const [current, setCurrent] = React.useState(ingrTypes[0].type);

  const setCurrentOnScroll = () => {
    const arr = [];
    ingrTypes.forEach((item, i) => {
      arr[i] = Math.abs(
        item.ref.current.getBoundingClientRect().y - parentRef.current.offsetTop
      );
    });
    setCurrent(ingrTypes[arr.indexOf(Math.min(...arr))].type);
  };

  return (
    <section className={`mr-10 ${burgerIngridientsStyles.burgerIngridients}`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <nav className={burgerIngridientsStyles.tabPanel}>
        {ingrTypes.map((tab) => (
          <Tab
            key={uuidv4()}
            value={tab.type}
            active={current === tab.type}
            onClick={() => {
              tab.ref.current.scrollIntoView({
                block: "start",
                behavior: "smooth",
              });
            }}
          >
            {tab.name}
          </Tab>
        ))}
      </nav>

      <div
        onScroll={setCurrentOnScroll}
        ref={parentRef}
        className={`${burgerIngridientsStyles.burgerIngridientsTypes} pt-8`}
      >
        {ingrTypes.map((element) => (
          <IngridientPanel
            key={element.type}
            type={element}
            data={ingridientList.filter((ingr) => ingr.type === element.type)}
            ref={element.ref}
          />
        ))}
      </div>
    </section>
  );
}

export default BurgerIngridients;
