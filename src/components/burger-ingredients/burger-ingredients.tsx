import { FC, RefObject, useEffect, useState } from 'react';
import styles from './burger-ingredients.module.css';
import IngredientPanel from '../ingredient-panel/ingredient-panel';
import { useSelector } from '../../services/hooks';
import { useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient, IngrType } from '../../services/types';

interface IngrInterface {
  name: string;
  type: IngrType;
  ref: RefObject<HTMLHeadingElement>;
}

const BurgerIngredients: FC = () => {
  const ingridientList = useSelector((state) => state.burger.items);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const ingrTypes: IngrInterface[] = [
    {
      name: 'Булки',
      type: IngrType.BUN,
      ref: bunRef,
    },
    {
      name: 'Соусы',
      type: IngrType.SAUCE,
      ref: sauceRef,
    },
    {
      name: 'Начинки',
      type: IngrType.MAIN,
      ref: mainRef,
    },
  ];
  const [current, setCurrent] = useState(ingrTypes[0].type);

  const setCurrentOnScroll = (): void => {
    const arr: number[] = [];
    ingrTypes.forEach((item, i) => {
      if (item.ref && item.ref.current && parentRef && parentRef.current)
        arr[i] = Math.abs(item.ref.current.getBoundingClientRect().y - parentRef.current.offsetTop);
    });
    setCurrent(ingrTypes[arr.indexOf(Math.min(...arr))].type);
  };

  return (
    <section className={`mr-10 ${styles.burgerIngredients}`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <nav className={styles.tabPanel}>
        {ingrTypes.map((tab) => (
          <Tab
            key={tab.type}
            value={tab.type}
            active={current === tab.type}
            onClick={() => {
              if (tab.ref && tab.ref.current) {
                tab.ref.current.scrollIntoView({
                  block: 'start',
                  behavior: 'smooth',
                });
              }
            }}
          >
            {tab.name}
          </Tab>
        ))}
      </nav>

      <div
        onScroll={setCurrentOnScroll}
        ref={parentRef}
        className={`${styles.burgerIngredientsTypes} pt-8`}
      >
        {ingridientList &&
          ingrTypes.map((element) => (
            <IngredientPanel
              key={element.type}
              name={element.name}
              data={ingridientList.filter((item) => item.type === element.type)}
              ref={element.ref}
            />
          ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
