import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-element.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_INGR, MOVE_INGRS } from "../../services/actions";

function BurgerElement({ data, index }) {
  const { name, price, image } = data;
  const dispatch = useDispatch();
  const constructor = useSelector((state) => state.burger.constructor);

  const [{ isDragging }, drag] = useDrag({
    type: "element",
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: "element",
    hover(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
    },
    drop(item) {
      const dragIndex = item.index + 1;
      const hoverIndex = index + 1;
      if (dragIndex > hoverIndex) {
        const elem = constructor.splice(dragIndex, 1);
        constructor.splice(hoverIndex, 0, ...elem);
      } else if (dragIndex < hoverIndex) {
        const elem = constructor[dragIndex];
        constructor.splice(hoverIndex + 1, 0, elem);
        constructor.splice(dragIndex, 1);
      } else return;

      dispatch({ type: MOVE_INGRS, data: constructor });
    },
  });

  const ref = React.useRef(null);
  const dragDropRef = drag(drop(ref));

  return (
    <div ref={dragDropRef} className={style.burgerElement}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => dispatch({ type: DELETE_INGR, ingr: index + 1 })}
      />
    </div>
  );
}

export default BurgerElement;
