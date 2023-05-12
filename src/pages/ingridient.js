import AppHeader from "../components/app-header/app-header";
import IngridientDetails from "../components/ingridient-details/ingridient-details";
import { useSelector } from "react-redux";
import styles from "./ingridient.module.css";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";

export const IngridientPage = () => {
  const { id } = useParams();
  //надо сделать что id был в адресе, кидать его в хранилище и доставать в IngridientDetails если details пустой
  const { details } = useSelector((state) => !!state.burger);
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <IngridientDetails />
      </main>
    </>
  );
};
