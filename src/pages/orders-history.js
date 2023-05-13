import styles from "./exit.module.css";
import AppHeader from "../components/app-header/app-header";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";

export const OrdersHistoryPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <ProfileNavigation />
        <div></div>
      </main>
    </>
  );
};
