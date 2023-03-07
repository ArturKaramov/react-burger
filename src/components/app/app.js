import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import appStyles from './app.module.css'
import { ingrTypes, currentBurger } from '../../utils/data.js';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { api } from '../../utils/api.js';

function App() {
  const [state, setState] = React.useState({ success: false, data: [], isLoading: false });

  const getData = () => {
    setState({ ...state, isLoading: true })
    api.getData()
      .then(ans => setState({ success: true, data: ans.data, isLoading: false }))
      .catch((err) => {
        console.error(err)
        setState({ ...state, isLoading: false })
      })
  }

  React.useEffect(() => getData(), []);

  return (
    <>
      {state.isLoading ? <div className={appStyles.loading}><Logo /></div> :
        state.success ?
          <>
            <AppHeader />
            <main className={appStyles.content}>
              <BurgerIngridients types={ingrTypes} ingridients={state.data} />
              <BurgerConstructor ingridients={currentBurger} />
            </main>
          </> : <div className={appStyles.error}><p className="text text_type_main-large">Кажется, данные не найдены :&lang;</p></div>}
    </>
  )
};

export default App