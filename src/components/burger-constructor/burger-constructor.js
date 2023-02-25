import React from "react";
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from './burger-constructor.module.css';

class BurgerConstructor extends React.Component {
  render() {
    return (
        <section className={`pt-25 pl-4 ${burgerConstructorStyles.burgerConstructor}`}>
          <div key={0} className='pl-8 pr-4'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${this.props.bun.name} (верх)`}
              price={this.props.bun.price}
              thumbnail={this.props.bun.image}
            />
          </div>
          <ul className={`mt-4 mb-4 ${burgerConstructorStyles.burgerConstructorList}`}>
            {this.props.ingridients.map((ingr, i) => 
              <li key={i + 1} className={`pb-4 pr-2 ${burgerConstructorStyles.burgerElement}`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingr.name}
                  price={ingr.price}
                  thumbnail={ingr.image}/>
              </li>
            )}
          </ul>
          <div key={this.props.ingridients.length + 1} className='pl-8 pr-4'>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${this.props.bun.name} (низ)`}
              price={this.props.bun.price}
              thumbnail={this.props.bun.image}
            />
          </div>
          <div className={`pt-10 pr-4 ${burgerConstructorStyles.totalPrice}`}>
            <p className="pr-2 text text_type_digits-medium">{this.props.ingridients.map(ingr => ingr.price).reduce((prevIngr, ingr) => ingr + prevIngr)}</p>
            <span className={`${burgerConstructorStyles.currency} pr-10`}><CurrencyIcon type="primary" /></span>
            <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
          </div>
        </section>
    )
  }
}

export default BurgerConstructor;