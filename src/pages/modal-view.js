import IngridientDetails from "../components/ingridient-details/ingridient-details";
import { OrderInfo } from "../components/order-info/order-info";
import Modal from "../components/modal/modal";
import { useNavigate, useLocation } from "react-router";
import { baseUrl } from "../utils/data";

export const ModalViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Modal closeModal={() => navigate(location.state.background)}>
      {location.state.background !== baseUrl ? (
        <OrderInfo />
      ) : (
        <IngridientDetails />
      )}
    </Modal>
  );
};
