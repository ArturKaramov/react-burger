import IngridientDetails from "../../components/ingridient-details/ingridient-details";
import { OrderInfo } from "../../components/order-info/order-info";
import Modal from "../../components/modal/modal";
import { useNavigate, useLocation } from "react-router";
import { baseUrl } from "../../utils/data";
import { useSelector } from "react-redux";
import { Preloader } from "../../components/preloader/preloader";

export const ModalViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isReady = useSelector(
    (state) => state.burger.items.length && state.feed.orders
  );
  return (
    <>
      {isReady ? (
        <Modal closeModal={() => navigate(location.state.from)}>
          {location.state.from !== baseUrl ? (
            <OrderInfo />
          ) : (
            <IngridientDetails />
          )}
        </Modal>
      ) : (
        <Preloader />
      )}
    </>
  );
};
