import styles from "./order.module.css";
import AppHeader from "../components/app-header/app-header";
import { OrderInfo } from "../components/order-info/order-info";

export const OrderPage = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <OrderInfo />
      </main>
    </>
  );
};
