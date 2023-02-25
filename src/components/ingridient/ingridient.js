import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientStyles from './ingridient.module.css';
import { currentBurger } from '../../utils/data';

class Ingridient extends React.Component {
  getCount() {
    return (currentBurger.map(ingr => ingr._id).filter(id => id === this.props.data._id).length)
  }

  render() {
    return (
      <li className={`mb-8 ml-4 mr-2 ${ingridientStyles.ingridient}`}>
        <img className='ml-4 mr-4' src={this.props.data.image} alt={this.props.data.name}/>
        {this.getCount() ? <Counter count={this.getCount()} size="default" extraClass="m-1" /> : <></>}
        <div className={`${ingridientStyles.price} mt-2 mb-2`}>
          <p className="text text_type_digits-default">{this.props.data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{this.props.data.name}</p>
      </li>
    )
  }
};

export default Ingridient