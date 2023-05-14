import IngridientDetails from "../components/ingridient-details/ingridient-details";
import Modal from "../components/modal/modal";
import { useNavigate } from "react-router";
import { baseUrl } from "../utils/data";

export const ModalViewPage = () => {
  const navigate = useNavigate();
  return (
    <Modal closeModal={() => navigate(baseUrl)}>
      <IngridientDetails />
    </Modal>
  );
};
