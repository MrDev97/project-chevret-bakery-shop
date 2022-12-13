import styles from './CheckoutPayment.module.scss';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserPaymentMethodsCard from '../../common/UserPaymentMethodsCard/UserPaymentMethodsCard';
import UserPaymentMethodsSlider from '../../features/UserPaymentMethodsSlider/UserPaymentMethodsSlider';
import { SwiperSlide } from 'swiper/react';
import { checkLoginRequest } from '../../../redux/usersRedux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrderPaymentMethodRequest } from '../../../redux/orderRedux';

const CheckoutPayment = () => {
  const dispatch = useDispatch();
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(null);

  useEffect(() => {
    dispatch(checkLoginRequest());
  }, [dispatch]);

  const updateCheckout = (props) => {
    setCurrentPaymentMethod(props.name);
    dispatch(addOrderPaymentMethodRequest(props.name));
  };

  return (
    <Container className={`mt-4 ${styles.main}`}>
      <div className="d-flex justify-content-center">
        <h1>Checkout</h1>
      </div>
      {!currentPaymentMethod && (
        <div className="d-flex justify-content-start">
          <h2>Choose Payment Method</h2>
        </div>
      )}
      {currentPaymentMethod && (
        <div className={`d-flex justify-content-start`}>
          <h2>
            Chosen Payment Method is{' '}
            <span className={styles.chosen}>{currentPaymentMethod}</span>
          </h2>
        </div>
      )}
      <Container className={`my-4`}>
        <UserPaymentMethodsSlider>
          <SwiperSlide>
            <UserPaymentMethodsCard action={updateCheckout} />
          </SwiperSlide>
        </UserPaymentMethodsSlider>
      </Container>
      <div className={`d-flex mt-4 row ${styles.links}`}>
        <Link
          to={`/checkout/address`}
          className={`d-flex col align-items-center justify-content-start`}
        >
          <Button className={`align-self-center`}>Go Back</Button>
        </Link>
        <Link
          to={`/checkout/summary`}
          className={`d-flex col align-items-center justify-content-end`}
        >
          <Button className={`align-self-center ${styles.next}`}>
            Summary
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default CheckoutPayment;
