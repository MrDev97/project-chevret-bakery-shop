import styles from './Cart.module.scss';
import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CartProducts from '../../views/CartProducts/CartProducts';
import { getAllCartProductsSum } from '../../../redux/cartRedux';

const Cart = () => {
  const cartProductCount = useSelector((state) => getAllCartProductsSum(state));

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
    </Container>
  );
};

export default Cart;
