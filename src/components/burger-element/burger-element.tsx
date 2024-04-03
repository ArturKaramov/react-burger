import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-element.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../services/hooks';

import { IIngredient } from '../../services/types/data';
import { deleteIngr, moveIngr } from '../../services/reducers/burger';

interface Props {
  data: IIngredient;
  index: number;
}

const BurgerElement: FC<Props> = ({ data, index }) => {
  const { name, price, image } = data;
  const dispatch = useDispatch();
  const constructor = useSelector((state) => state.burger.constructor);

  const [{ isDragging, draggingItem }, drag] = useDrag({
    type: 'element',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      draggingItem: monitor.getItemType() === 'element' ? monitor.getItem().index : 0,
    }),
  });

  const [{ isHover }, drop] = useDrop({
    accept: 'element',
    drop(item: Props) {
      const dragIndex: number = item.index + 1;
      const hoverIndex: number = index + 1;
      if (dragIndex > hoverIndex) {
        const elem = constructor.splice(dragIndex, 1);
        constructor.splice(hoverIndex, 0, ...elem);
      } else if (dragIndex < hoverIndex) {
        const elem = constructor[dragIndex];
        constructor.splice(hoverIndex + 1, 0, elem);
        constructor.splice(dragIndex, 1);
      } else return;

      dispatch(moveIngr(constructor));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const ref = React.useRef<HTMLLIElement>(null);
  drag(drop(ref));
  let paddingBottom = `16px`;
  let paddingTop = '0px';

  if (isHover && draggingItem >= index) {
    paddingTop = '96px';
    paddingBottom = '16px';
  } else if (isHover && draggingItem < index) {
    paddingBottom = `96px`;
    paddingTop = '0px';
  }

  return (
    <li ref={ref} className={`pr-2 ${style.burgerElement}`} style={{ paddingTop, paddingBottom }}>
      {!isDragging && (
        <>
          <DragIcon type="primary" />
          <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
            handleClose={() => dispatch(deleteIngr(index + 1))}
          />
        </>
      )}
    </li>
  );
};

export default BurgerElement;
