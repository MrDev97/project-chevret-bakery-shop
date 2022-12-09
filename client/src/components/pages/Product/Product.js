import styles from './Product.module.scss';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import ProductCarousel from '../../common/ProductCarousel/ProductCarousel';
import MapCardTags from '../../features/MapCardTags/MapCardTags';
import QuantityController from '../../common/ProductWidget/QuantityController/QuantityController';
import {
  updateCartProductsRequest,
  getCartProductById,
} from '../../../redux/cartRedux';
import { useDispatch } from 'react-redux';

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productData = useSelector((state) => getProductById(state, id));
  const cartData = useSelector((state) => getCartProductById(state, id));

  const updateCart = (props) => {
    dispatch(updateCartProductsRequest(props));
  };

  if (!productData) return <Navigate to="/" />;
  return (
    <Card className={`mt-4 mt-md-5 justify-content-center ${styles.card}`}>
      <Row className="h-100 flex-row-reverse">
        <Col className="col-12 col-md-5">
          <ProductCarousel images={productData.images} />
        </Col>
        <Col className="col-12 col-md-7">
          <Card.Body className="h-100 d-flex flex-column justify-content-between">
            <Card.Title className={`d-flex ${styles.header}`}>
              {productData.name}
            </Card.Title>
            {!!productData.tags.length && (
              <MapCardTags className={styles.tags} tags={productData.tags} />
            )}
            <div className={`${styles.description}`}>
              <span>Description: </span>
              <p>{productData.description}</p>
            </div>
            <Container className="d-flex p-0 justify-content-between">
              <div className="d-flex col-8 flex-column justify-content-center align-items-start">
                <QuantityController
                  quantity={cartData ? cartData.quantity : 0}
                  action={updateCart}
                  productId={id}
                  price={productData.price}
                  name={productData.name}
                  images={[productData.images[0]]}
                />
              </div>
              <div className="d-flex justify-content-end align-items-start">
                <div
                  className={`d-flex p-0 justify-content-center ${styles.price}`}
                >
                  <h3>{productData.price}</h3>
                  <span>PLN</span>
                </div>
              </div>
            </Container>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default Product;
