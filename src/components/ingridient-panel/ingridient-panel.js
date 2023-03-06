import React from "react";
import Ingridient from '../ingridient/ingridient';
import ingridientPanelStyle from './ingridient-panel.module.css'
import { ingrTypePropTypes } from "../../utils/prop-types";

function IngridientPanel(props) {
  return(
    <>
      <h2 key={props.type.value} className="text text_type_main-medium pb-6 pt-2">{props.type.name}</h2>
      <ul className={`${ingridientPanelStyle.ingridientList} pb-10`}>
        {props.data.map(ingr => <li key={ingr._id}><Ingridient openModal={props.openModal} data={ingr}/></li>)}
      </ul>
    </>
  )
};

IngridientPanel.propTypes = {
  type: ingrTypePropTypes.isRequired
}

export default IngridientPanel;
