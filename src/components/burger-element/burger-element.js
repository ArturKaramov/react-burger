import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-element.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_INGR, MOVE_INGRS } from "../../services/actions/burger";

function BurgerElement({ data, index }) {
  const { name, price, image } = data;
  const dispatch = useDispatch();
  const constructor = useSelector((state) => state.burger.constructor);

  const [{ isDragging, draggingItem }, drag] = useDrag({
    type: "element",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      draggingItem:
        monitor.getItemType() === "element" ? monitor.getItem().index : "",
    }),
  });

  const [{ isHover }, drop] = useDrop({
    accept: "element",
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
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const ref = React.useRef(null);
  const dragDropRef = drag(drop(ref));
  let paddingBottom = `16px`;
  let paddingTop = "0px";

  if (isHover && draggingItem >= index) {
    paddingTop = "96px";
    paddingBottom = "16px";
  } else if (isHover && draggingItem < index) {
    paddingBottom = `96px`;
    paddingTop = "0px";
  }

  return (
    <li
      ref={dragDropRef}
      className={`pr-2 ${style.burgerElement}`}
      style={{ paddingTop, paddingBottom }}
    >
      {!isDragging && (
        <>
          <DragIcon type="primary" />
          <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={() => dispatch({ type: DELETE_INGR, ingr: index + 1 })}
          />
        </>
      )}
    </li>
  );
}

export default BurgerElement;
