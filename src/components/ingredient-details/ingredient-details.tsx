import styles from './ingredient-details.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from '../../services/hooks';
import { useParams, useLocation } from 'react-router-dom';
import { IIngredient } from '../../services/types';

interface INutrValues {
  name: string;
  value: keyof IIngredient;
}

function IngredientDetails() {
  const { id } = useParams();
  const { items } = useSelector((state) => state.burger);
  const location = useLocation();
  const [ingr, setIngr] = useState<IIngredient | null>(null);
  useEffect(() => {
    const item = items.find((item) => item._id === id);
    item ? setIngr(item) : setIngr(null);
    return () => setIngr(null);
  }, []);

  const nutritionValues: ReadonlyArray<INutrValues> = [
    {
      name: 'Калории, ккал',
      value: 'calories',
    },
    {
      name: 'Белки, г',
      value: 'proteins',
    },
    {
      name: 'Жиры, г',
      value: 'fat',
    },
    {
      name: 'Углеводы, г',
      value: 'carbohydrates',
    },
  ];

  return (
    <>
      {ingr && (
        <>
          <h2 className={`${location.state && styles.titleModal} text text_type_main-large`}>
            Детали ингридиента
          </h2>
          <img src={ingr.image_large} alt={ingr.name} />
          <span className="text text_type_main-medium mt-4">{ingr.name}</span>
          <ul className={`mt-8 ${styles.values}`}>
            {nutritionValues.map((item, i) => (
              <li key={i} className={`mr-5 ${styles.value}`}>
                <span className="text text_type_main-default text_color_inactive pb-2">
                  {item.name}
                </span>
                <span className="text text_type_digits-default text_color_inactive">
                  {ingr[item.value]}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default IngredientDetails;
