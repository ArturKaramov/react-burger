import burgerIngridientsStyles from './burger-ingridients.module.css'
import TabPanel from '../tab-panel/tab-panel';
import IngridientPanel from '../ingridient-panel/ingridient-panel';
import PropTypes from 'prop-types';
import { ingrTypePropTypes, ingrPropTypes } from "../../utils/prop-types";

function BurgerIngridients(props) {
  return (
    <section className={`mr-10 ${burgerIngridientsStyles.burgerIngridients}`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <TabPanel tabs={props.types}/>
      <div className={`${burgerIngridientsStyles.burgerIngridientsTypes} pt-8`}>
        {props.types.map(element => <IngridientPanel key={element.type} type={element} data={props.ingridients.filter(ingr => ingr.type === element.type)}/>)}
      </div>
    </section>
  )
};

BurgerIngridients.propTypes = {
  types: PropTypes.arrayOf(ingrTypePropTypes).isRequired,
  ingridients: PropTypes.arrayOf(ingrPropTypes).isRequired
};

export default BurgerIngridients;