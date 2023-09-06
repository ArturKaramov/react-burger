import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import { useDrag } from "react-dnd/dist/hooks/useDrag";
import { useSelector } from "../../services/hooks";
import { IIngredient } from "../../services/types/data";

function Ingredient(props: IIngredient) {
  const { image, name, _id, price } = props;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props,
  });

  const count = useSelector(
    (state) =>
      state.burger.constructor.filter((item) => item._id === _id).length
  );

  return (
    <div
      ref={dragRef}
      className={`mb-8 ml-4 mr-2 ${ingredientStyles.ingredient}`}
    >
      <img className="ml-4 mr-4" src={image} alt={name} />
      {Boolean(count) && (
        <Counter count={count} size="default" extraClass="m-1" />
      )}
      <div className={`${ingredientStyles.price} mt-2 mb-2`}>
        <p className="pr-2 text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{name}</p>
    </div>
  );
}

export default Ingredient;
