import styles from './OrderNumber.module.scss';
import { IMGS_URL } from '../../../config';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetOrder } from '../../../redux/orderRedux';
import { resetCartProduct } from '../../../redux/cartRedux';

const OrderNumber = () => {
  const dispatch = useDispatch();
  const order = JSON.parse(sessionStorage.getItem('order'));

  useEffect(() => {
    dispatch(resetOrder());
    dispatch(resetCartProduct());
  }, [dispatch]);

  return (
    <Container className="d-flex mt-5 justify-content-center">
      <div className={`d-flex flex-column align-items-center ${styles.main}`}>
        <h1>Your Order is now Complete!</h1>
        <h1>Your Order number:</h1>
        <h1>{order.id}</h1>
        <img
          className={`my-3`}
          crossOrigin="anonymous"
          src={IMGS_URL + 'main-star.svg'}
        />
        <h1>Thank You!</h1>
      </div>
    </Container>
  );
};

export default OrderNumber;
