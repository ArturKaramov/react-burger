import React from 'react';
import AppHeader from './components/app-header/app-header.js';
import BurgerIngridients from './components/burger-ingridients/burger-ingridients.js'
import BurgerConstructor from './components/burger-constructor/burger-constructor.js'
import { currentBurger } from './utils/data.js';

class App extends React.Component {
  render() {
    return (
    <>
      <AppHeader />
      <main className='main'>
        <BurgerIngridients />
        <BurgerConstructor bun={currentBurger.find(ingr => ingr.type === 'bun')} ingridients={currentBurger.filter(ingr => ingr.type !== 'bun')} />
      </main>
    </>
    )
  }
}

export default App