import { OrderInfo } from '../../components/order-info/order-info';
import Modal from '../../components/modal/modal';
import { useNavigate, useLocation } from 'react-router';
import { useSelector } from '../../services/hooks';
import { Preloader } from '../../components/preloader/preloader';

export const OrderViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ordersIsReady = useSelector((state) => state.feed.orders);
  return (
    <>
      {ordersIsReady ? (
        <Modal closeModal={() => navigate(location.state.from)}>
          <OrderInfo />
        </Modal>
      ) : (
        <Preloader />
      )}
    </>
  );
};
