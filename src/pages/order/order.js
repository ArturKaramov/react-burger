import styles from "./order.module.css";
import { OrderInfo } from "../../components/order-info/order-info";

export const OrderPage = () => {
  return (
    <>
      <main className={styles.main}>
        <OrderInfo />
      </main>
    </>
  );
};
