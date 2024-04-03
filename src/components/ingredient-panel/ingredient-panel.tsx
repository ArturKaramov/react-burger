import React, { FC, useRef, forwardRef, Ref } from 'react';
import Ingredient from '../ingredient/ingredient';
import styles from './ingredient-panel.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { INGREDIENTS_URL } from '../../utils/data';
import { IIngredient } from '../../services/types';

interface Props {
  name: string;
  readonly data: ReadonlyArray<IIngredient>;
}

const IngredientPanel = React.forwardRef((props: Props, ref: Ref<HTMLHeadingElement>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickIngr = (id: string) => {
    navigate(`${INGREDIENTS_URL}/${id}`, {
      replace: true,
      state: { from: location.pathname },
    });
  };
  return (
    <>
      <h2 key={props.name} ref={ref} className="text text_type_main-medium pb-6 pt-2">
        {props.name}
      </h2>
      <ul className={`${styles.ingredientList} pb-10`}>
        {props.data.map((ingr) => (
          <li key={ingr._id} onClick={() => onClickIngr(ingr._id)}>
            <Ingredient {...ingr} />
          </li>
        ))}
      </ul>
    </>
  );
});

export default IngredientPanel;
