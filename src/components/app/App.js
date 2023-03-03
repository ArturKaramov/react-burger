import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import { ingrTypes, ingridients, currentBurger, BUN } from '../../utils/data.js';

class App extends React.Component {
  render() {
    return (
    <>
      <AppHeader />
      <main className='main'>
        <BurgerIngridients types={ ingrTypes } ingridients={ ingridients } />
        <BurgerConstructor ingridients={ currentBurger } />
      </main>
    </>
    )
  }
};

export default App