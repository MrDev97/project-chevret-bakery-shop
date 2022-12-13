import styles from './Cart.module.scss';
import { Col, Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CartProducts from '../../views/CartProducts/CartProducts';
import { getAllCartProductsSum } from '../../../redux/cartRedux';
import { Link } from 'react-router-dom';
import { getUser } from '../../../redux/usersRedux';

const Cart = () => {
  const cartProductCount = useSelector((state) => getAllCartProductsSum(state));
  const user = useSelector(getUser);

  return (
    <Container className={`mt-4 ${styles.main}`}>
      <div className="d-flex justify-content-center">
        <h1>Your Cart</h1>
      </div>
      <CartProducts />

      <div className={`d-flex row ${styles.row}`}>
        <Col className="d-flex mb-2 justify-content-start align-items-end">
          <h2>Total:</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className={`d-flex p-0 justify-content-center ${styles.price}`}>
            {cartProductCount}
            <span>PLN</span>
          </div>
        </Col>
      </div>
      <div className={`d-flex mt-4 row ${styles.links}`}>
        <Link
          to={`/`}
          className={`d-flex col align-items-center justify-content-start`}
        >
          <Button className={`align-self-center`}>Go Back</Button>
        </Link>
        <Link
          to={user ? `/checkout/address` : `/auth/login`}
          className={`d-flex col align-items-center justify-content-end`}
        >
          <Button className={`align-self-center ${styles.checkout}`}>
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default Cart;
