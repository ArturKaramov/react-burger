import React from "react";
import Ingridient from '../ingridient/ingridient';
import ingridientPanelStyle from './ingridient-panel.module.css'
import PropTypes from 'prop-types';
import { ingrTypePropTypes } from "../../utils/prop-types";

function IngridientPanel(props) {
  return(
    <>
      <h2 key={props.type.value} className="text text_type_main-medium pb-6 pt-2">{props.type.name}</h2>
      <ul className={`${ingridientPanelStyle.ingridientList} pb-10`}>
        {props.data.map(ingr => <Ingridient key={ingr._id} data={ingr}/>)}
      </ul>
    </>
  )
};

IngridientPanel.propTypes = {
  type: ingrTypePropTypes.isRequired
}

export default IngridientPanel;
