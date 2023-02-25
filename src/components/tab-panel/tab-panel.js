import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabPanelStyle from './tab-panel.module.css'

function TabPanel(props) {
  const [current, setCurrent] = React.useState('one');
  return(
    <nav className={tabPanelStyle.tabPanel}>
      {props.tabs.map((tab, i) => 
        <Tab key={i} value={tab.value} active={current === tab.value} onClick={setCurrent}>{tab.name}</Tab>)}
    </nav>
  )
}

export default TabPanel;