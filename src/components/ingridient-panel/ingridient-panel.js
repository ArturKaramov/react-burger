import React from "react";
import Ingridient from '../ingridient/ingridient';
import ingridientPanelStyle from './ingridient-panel.module.css'
import { ingrTypePropTypes } from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngridientDetails from "../ingridient-details/ingridient-details";

function IngridientPanel(props) {
  const [ingridient, setIngridient] = React.useState({data: {}, isToggle: false});

  const showIngridient = (obj) => {
    setIngridient({data: obj, isToggle: true})
  };

  const hideIngridient = () => {
    setIngridient({data: {}, isToggle: false});
  };

  return(
    <>
      <h2 key={props.type.value} className="text text_type_main-medium pb-6 pt-2">{props.type.name}</h2>
      <ul className={`${ingridientPanelStyle.ingridientList} pb-10`}>
        {props.data.map(ingr => <li key={ingr._id} onClick={() => showIngridient(ingr)} ><Ingridient data={ingr}/></li>)}
      </ul>
      {ingridient.isToggle && <Modal closeModal={hideIngridient}><IngridientDetails data={ingridient.data} /></Modal>}
    </>
  )
};

IngridientPanel.propTypes = {
  type: ingrTypePropTypes.isRequired
}

export default IngridientPanel;
