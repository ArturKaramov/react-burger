import React from "react";
import PropTypes from 'prop-types';
import { ingrTypePropTypes } from "../../utils/prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabPanelStyle from './tab-panel.module.css';

export default function TabPanel(props) {
  const [current, setCurrent] = React.useState(props.tabs[0].type);
  return(
    <nav className={tabPanelStyle.tabPanel}>
      {props.tabs.map((tab, i) => 
        <Tab key={i} value={tab.type} active={current === tab.type} onClick={setCurrent}>{tab.name}</Tab>)}
    </nav>
  )
};

TabPanel.propTypes = {
  tabs: PropTypes.arrayOf(ingrTypePropTypes.isRequired).isRequired
};
