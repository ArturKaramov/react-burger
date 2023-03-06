import React from 'react';
import AppHeader from '../app-header/app-header.js';
import BurgerIngridients from '../burger-ingridients/burger-ingridients.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js'
import ModalOverlay from '../modal-overlay/modal-overlay.js';
import Modal from '../modal/modal.js';
import IngridientDetails from '../ingridient-details/ingridient-details.js';
import appStyles from './app.module.css'
import { url, order, ingrTypes, currentBurger } from '../../utils/data.js';
import { Logo  } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details.js';

function App() {
  const [state, setState] = React.useState({success: false, data: [], isLoading: false})
  const [isToggle, setToggle] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const isResponseOk = response => {
    if (response.ok) {return response.json()}
    else {return Promise.reject(`Ошибка: ${response.status}`)}
  };

  const getData = () => {
    setState({...state, isLoading: true})
    fetch(url)
      .then(res => isResponseOk(res))
      .then(ans => setState({success: true, data: ans.data, isLoading: false}))
      .catch((err) => {
        console.error(err)
        setState({...state, isLoading: false})
      })
  };

  React.useEffect(() => getData(), []);

  const showIngridient = (ingr) => {
    setModalData(<IngridientDetails data={ingr}/>)
    setToggle(true)
  };

  const showOrder = () => {
    setModalData(<OrderDetails order={order} />)
    setToggle(true)
  }

  const hideModal = () => {
    setModalData(null)
    setToggle(false)
  };
  
  return (
    <>
      {state.isLoading ? <div className={appStyles.loading}><Logo /></div> :
      state.success ?
      <>
        <AppHeader />
        <main className={appStyles.content}>
          <BurgerIngridients openModal={showIngridient} types={ ingrTypes } ingridients={ state.data } />
          <BurgerConstructor openModal={showOrder} ingridients={ currentBurger } />
          {isToggle && <ModalOverlay closeModal={hideModal}><Modal closeModal={hideModal}>{modalData}</Modal></ModalOverlay>}
        </main>
      </> : <div className={appStyles.error}><p className="text text_type_main-large">Кажется, данные не найдены :&lang;</p></div>}
    </>
  )
};

export default App