import React from 'react';
import burgerIngridientsStyles from './burger-ingridients.module.css'
import { ingrTypes, ingridients } from '../../utils/data';
import TabPanel from '../tab-panel/tab-panel';
import IngridientPanel from '../ingridient-panel/ingridient-panel';

class BurgerIngridients extends React.Component {
  render() {
    return (
      <section className={`mr-10 ${burgerIngridientsStyles.burgerIngridients}`}>
        <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
        <TabPanel tabs={ingrTypes}/>
        <div className={`${burgerIngridientsStyles.burgerIngridientsTypes} pt-8`}>
          {ingrTypes.map(element => <IngridientPanel key={element.value} type={element} data={ingridients.filter(ingr => ingr.type === element.type)}/>)}
        </div>
      </section>
    )
  }
};

export default BurgerIngridients;