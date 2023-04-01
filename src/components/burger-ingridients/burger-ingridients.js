import React from "react";
import burgerIngridientsStyles from "./burger-ingridients.module.css";
import TabPanel from "../tab-panel/tab-panel";
import IngridientPanel from "../ingridient-panel/ingridient-panel";
import { BurgerContext } from "../../services/burgerContext";
import { BUN, SAUCE, MAIN } from "../../utils/data";

function BurgerIngridients() {
  const ingridientList = React.useContext(BurgerContext);

  const ingrTypes = [
    {
      name: "Булки",
      type: BUN,
    },
    {
      name: "Соусы",
      type: SAUCE,
    },
    {
      name: "Начинки",
      type: MAIN,
    },
  ];

  return (
    <section className={`mr-10 ${burgerIngridientsStyles.burgerIngridients}`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <TabPanel tabs={ingrTypes} />
      <div className={`${burgerIngridientsStyles.burgerIngridientsTypes} pt-8`}>
        {ingrTypes.map((element) => (
          <IngridientPanel
            key={element.type}
            type={element}
            data={ingridientList.data.filter(
              (ingr) => ingr.type === element.type
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default BurgerIngridients;
