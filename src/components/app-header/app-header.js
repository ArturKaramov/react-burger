import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import appHeaderStyles from './app-header.module.css'

export default function AppHeader() {
  return (
    <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
      <div className={appHeaderStyles.logo}><Logo  /></div>
      <nav className={appHeaderStyles.menu}>
        <a className={`${appHeaderStyles.link} pl-5 pr-5 pb-4 pt-4 mr-2`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </a>
        <a className={`${appHeaderStyles.link} pl-5 pr-5 pb-4 pt-4`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Лента заказов</p>
        </a>
        <a className={`${appHeaderStyles.link} ${appHeaderStyles.personal} pl-5 pr-5 pb-4 pt-4`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Личный кабинет</p>
        </a>
      </nav>
    </header>
  )
};