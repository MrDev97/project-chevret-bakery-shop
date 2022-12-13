import styles from './CartProduct.module.scss';
import { Container, Col, Card } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import { useSelector } from 'react-redux';
import QuantityController from '../../common/ProductWidget/QuantityController/QuantityController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import {
  updateCartProductsRequest,
  getCartProductById,
} from '../../../redux/cartRedux';
import { useDispatch } from 'react-redux';

const CartProduct = (props) => {
  const dispatch = useDispatch();

  const cartData = useSelector((state) => getCartProductById(state, props.id));

  const updateCart = (props) => {
    dispatch(updateCartProductsRequest(props));
  };

  const handleRemove = () => {
    const itemToRemove = { ...cartData, quantity: 0 };
    updateCart(itemToRemove);
  };

  return (
    <Col>
      <Card className={styles.card}>
        <Card.Body className={`row p-md-0 flex-md-row-reverse ${styles.body}`}>
          <Container className="d-flex col-md-6 p-0">
            <div className={`d-flex align-items-center ${styles.header}`}>
              <Card.Title className="col-8 m-0 text-truncate text-center">
                <h2>{cartData.name}</h2>
              </Card.Title>
              <div>
                {props.images && (
                  <Card.Img
                    crossOrigin="anonymous"
                    src={IMGS_URL + props.images[0]}
                  />
                )}
              </div>
            </div>
          </Container>
          <Container className="d-flex col-md-6 p-0 align-items-center">
            <div className="d-flex col-8 flex-column justify-content-start">
              <div
                className={`d-flex p-0 justify-content-center ${styles.price}`}
              >
                <h3>{cartData.price}</h3>
                <span>PLN</span>
              </div>
              <QuantityController
                quantity={cartData ? cartData.quantity : 0}
                action={updateCart}
                productId={cartData.id}
                price={cartData.price}
                name={cartData.name}
                images={[cartData.images[0]]}
              />
            </div>
            <button onClick={handleRemove} className={`col-4 ${styles.trash}`}>
              <FontAwesomeIcon icon={solid('trash-can')} />
            </button>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CartProduct;
