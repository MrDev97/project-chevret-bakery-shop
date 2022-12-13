import styles from './CheckoutSummary.module.scss';
import { Container, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, getUserAddressByAddressId } from '../../../redux/usersRedux';
import UserAddressCard from '../../common/UserAddressCard/UserAddressCard';
import UserPaymentMethodsCard from '../../common/UserPaymentMethodsCard/UserPaymentMethodsCard';
import { checkLoginRequest } from '../../../redux/usersRedux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getAllCartProducts,
  getAllCartProductsSum,
} from '../../../redux/cartRedux';
import {
  addOrderDescriptionRequest,
  addOrderProductsRequest,
  addOrderRequest,
  getOrder,
} from '../../../redux/orderRedux';
import SummaryHeader from '../../common/SummaryHeader/SummaryHeader';
import CheckoutProducts from '../../views/CheckoutProducts/CheckoutProducts';
import { getRequest } from '../../../redux/orderRedux';

const CheckoutSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const order = useSelector(getOrder);
  const userAddress = useSelector((state) =>
    getUserAddressByAddressId(state, order.address),
  );
  const cartProducts = useSelector(getAllCartProducts);
  const cartProductSum = useSelector((state) => getAllCartProductsSum(state));
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(checkLoginRequest());
    dispatch(addOrderProductsRequest(cartProducts));
  }, [dispatch]);

  const updateCheckout = (props) => {
    dispatch(addOrderDescriptionRequest(props));
  };

  const handleSubmit = () => {
    const fd = {
      userId: user.id,
      addressId: order.address,
      description: order.description,
      orderedProducts: order.products,
    };
    dispatch(addOrderRequest(fd));
  };

  useEffect(() => {
    if (request && request.success) {
      navigate('/checkout/order');
    }
  }, [request]);

  return (
    <Container className={`mt-4 ${styles.main}`}>
      <div className="d-flex justify-content-center">
        <h1>Summary</h1>
      </div>

      <SummaryHeader text="Products" />
      <CheckoutProducts />

      <SummaryHeader text="Address" />
      <Container className={`col col-md-4 my-4`}>
        <UserAddressCard {...userAddress} />
      </Container>

      <SummaryHeader text="Payment" />
      <Container className={`col col-md-4 my-4`}>
        <UserPaymentMethodsCard />
      </Container>

      <div className={`d-flex mt-5 row ${styles.links}`}>
        <div className={`d-flex col-12 col-md-6 justify-content-start`}>
          <h2>Additional Remarks:</h2>
        </div>
        <input
          className={`d-flex col-12 col-md-6 mt-3 m-md-0 justify-content-start`}
          type="text"
          value={order.description || ''}
          onChange={(e) => updateCheckout(e.target.value)}
          placeholder="Remarks"
        />
      </div>

      <div className={`d-flex mt-3 row ${styles.row}`}>
        <Col className="d-flex mb-2 justify-content-start align-items-end">
          <h2>Total:</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className={`d-flex p-0 justify-content-center ${styles.price}`}>
            {cartProductSum}
            <span>PLN</span>
          </div>
        </Col>
      </div>

      <div className={`d-flex mt-4 row ${styles.links}`}>
        <Link
          to={`/cart`}
          className={`d-flex col align-items-center justify-content-start`}
        >
          <Button className={`align-self-center`}>Go Back</Button>
        </Link>
        <Button
          onClick={handleSubmit}
          className={`align-self-center ${styles.next}`}
        >
          Order & Pay
        </Button>
      </div>
    </Container>
  );
};
export default CheckoutSummary;
