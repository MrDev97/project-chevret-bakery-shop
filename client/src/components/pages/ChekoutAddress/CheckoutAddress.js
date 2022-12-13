import styles from './CheckoutAddress.module.scss';
import { Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../../redux/usersRedux';
import UserAddressCard from '../../common/UserAddressCard/UserAddressCard';
import UserAddAddressCard from '../../common/UserAddAddressCard/UserAddAddressCard';
import UserAddressesSlider from '../../features/UserAddressesSlider/UserAddressesSlider';
import { SwiperSlide } from 'swiper/react';
import { checkLoginRequest } from '../../../redux/usersRedux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCartProducts } from '../../../redux/cartRedux';
import {
  addOrderAddressRequest,
  addOrderProductsRequest,
} from '../../../redux/orderRedux';

const CheckoutAddress = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const cartProducts = useSelector(getAllCartProducts);
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    dispatch(checkLoginRequest());
    dispatch(addOrderProductsRequest(cartProducts));
  }, [dispatch]);

  const updateCheckout = (props) => {
    setCurrentAddress(props.street);
    dispatch(addOrderAddressRequest(props.id));
  };

  return (
    <Container className={`mt-4 ${styles.main}`}>
      <div className="d-flex justify-content-center">
        <h1>Checkout</h1>
      </div>
      {!currentAddress && (
        <div className="d-flex justify-content-start">
          <h2>Choose Address</h2>
        </div>
      )}
      {currentAddress && (
        <div className={`d-flex justify-content-start`}>
          <h2>
            Chosen Address is{' '}
            <span className={styles.chosen}>{currentAddress}</span>
          </h2>
        </div>
      )}
      <Container className={`my-4`}>
        <UserAddressesSlider>
          <SwiperSlide>
            <UserAddAddressCard />
          </SwiperSlide>
          {user.address.map((address, i) => {
            return (
              <SwiperSlide key={i}>
                <UserAddressCard {...address} action={updateCheckout} />
              </SwiperSlide>
            );
          })}
        </UserAddressesSlider>
      </Container>
      <div className={`d-flex mt-4 row ${styles.links}`}>
        <Link
          to={`/cart`}
          className={`d-flex col align-items-center justify-content-start`}
        >
          <Button className={`align-self-center`}>Go Back</Button>
        </Link>
        <Link
          to={`/checkout/payment`}
          className={`d-flex col align-items-center justify-content-end`}
        >
          <Button className={`align-self-center ${styles.next}`}>Next</Button>
        </Link>
      </div>
    </Container>
  );
};

export default CheckoutAddress;
