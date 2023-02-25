import React from "react";
import Ingridient from '../ingridient/ingridient';
import ingridientPanelStyle from './ingridient-panel.module.css'

class IngridientPanel extends React.Component {
  render() {
    return(
      <>
        <h2 key={this.props.type.value} className="text text_type_main-medium pb-6 pt-2">{this.props.type.name}</h2>
        <ul className={`${ingridientPanelStyle.ingridientList} pb-10`}>
          {this.props.data.map(ingr => <Ingridient key={ingr._id} data={ingr}/>)}
        </ul>
      </>
    )
  }
}

export default IngridientPanel;
