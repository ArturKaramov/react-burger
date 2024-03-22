import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Modal from '../../components/modal/modal';
import { useNavigate, useLocation } from 'react-router';
import { useSelector } from '../../services/hooks';
import { Preloader } from '../../components/preloader/preloader';

export const IngrViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ingrsIsReady = useSelector((state) => state.burger.items.length);
  return (
    <>
      {ingrsIsReady ? (
        <Modal closeModal={() => navigate(location.state.from)}>
          <IngredientDetails />
        </Modal>
      ) : (
        <Preloader />
      )}
    </>
  );
};
