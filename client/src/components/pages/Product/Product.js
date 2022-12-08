import styles from './Product.module.scss';
import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import ProductCarousel from '../../common/ProductCarousel/ProductCarousel';
import MapCardTags from '../../features/MapCardTags/MapCardTags';
import QuantityController from '../../common/ProductWidget/QuantityController/QuantityController';

const Product = () => {
  const { id } = useParams();
  const productData = useSelector((state) => getProductById(state, id));
  const [quantity, setQuantity] = useState(0);

  const updateCart = (props) => {
    console.log('Cart Updated!');
    console.log(props);
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
            <Card.Text className={`${styles.description}`}>
              <span>Description: </span>
              <p>{productData.description}</p>
            </Card.Text>
            <Container className="d-flex p-0 justify-content-between">
              <div className="d-flex col-8 flex-column justify-content-center align-items-start">
                <QuantityController
                  quantity={quantity}
                  setQuantity={setQuantity}
                  action={updateCart}
                  productId={id}
                  price={productData.price}
                  name={props.name}
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
