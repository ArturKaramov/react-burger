import React from "react";
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import { ingrPropTypes } from "../../utils/prop-types";
import { BUN } from "../../utils/data";

function BurgerConstructor(props) {
  const totalPrice = React.useMemo(() => props.ingridients.map(ingr => ingr.price).reduce((prevIngr, ingr) => ingr + prevIngr), [props.ingridients])
  const bun = React.useMemo(() => props.ingridients.find(ingr => ingr.type === BUN), [props.ingridients]);
  const products = React.useMemo(() => props.ingridients.filter(ingr => ingr.type !== BUN), [props.ingridients]);
  
  return (
    <section className={`pt-25 pl-4 ${burgerConstructorStyles.burgerConstructor}`}>
      <div key={0} className='pl-8 pr-4'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={`mt-4 mb-4 ${burgerConstructorStyles.burgerConstructorList}`}>
        {products.map((ingr, i) => 
          <li key={i + 1} className={`pb-4 pr-2 ${burgerConstructorStyles.burgerElement}`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingr.name}
              price={ingr.price}
              thumbnail={ingr.image}/>
          </li>
        )}
      </ul>
      <div key={props.ingridients.length + 1} className='pl-8 pr-4'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`pt-10 pr-4 ${burgerConstructorStyles.totalPrice}`}>
        <p className="pr-2 text text_type_digits-medium">{totalPrice}</p>
        <span className={`${burgerConstructorStyles.currency} pr-10`}><CurrencyIcon type="primary" /></span>
        <Button onClick={props.openModal} htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  )
};

BurgerConstructor.propTypes = {
  ingridients: PropTypes.arrayOf(ingrPropTypes.isRequired).isRequired
};

export default BurgerConstructor;
