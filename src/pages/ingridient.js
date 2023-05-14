import AppHeader from "../components/app-header/app-header";
import IngridientDetails from "../components/ingridient-details/ingridient-details";
import { useSelector } from "react-redux";
import styles from "./ingridient.module.css";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

export const IngridientPage = () => {
  return (
    <>
      <>
        <AppHeader />
        <main className={styles.main}>
          <IngridientDetails />
        </main>
      </>
    </>
  );
};
