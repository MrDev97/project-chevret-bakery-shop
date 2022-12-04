import { useState } from 'react';
import { Col, Card, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import QuantityButton from '../ProductWidget/QuantityButton/QuantityButton';
import MapCardTags from '../../features/MapCardTags/MapCardTags';
import styles from './ProductCard.module.scss';

const Product = (props) => {
  const [quantity, setQuantity] = useState(0);
  const updateCart = (props) => {
    console.log('Cart Updated!');
  };

  const addCartProduct = () => {
    setQuantity(quantity + 1);
  };

  const removeCartProduct = () => {
    setQuantity(quantity - 1);
  };

  return (
    <Col>
      <Card className={styles.card}>
        <Card.Img
          style={{ resizeMode: 'cover' }}
          crossOrigin="anonymous"
          src={IMGS_URL + props.image}
        />
        <Card.Body>
          <Card.Title className="mb-3 text-truncate text-center">
            {props.name}
          </Card.Title>
          <MapCardTags tags={props.tags} />
          <Container className="d-flex p-0">
            <div className="d-flex col-8 flex-column justify-content-start">
              <div
                className={`d-flex p-0 justify-content-center ${styles.price}`}
              >
                {props.price} PLN
              </div>
              <div className="d-flex justify-content-center">
                <QuantityButton action={removeCartProduct} add={false} />
                <Form.Control
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  className={`align-self-center ${styles.input}`}
                />
                <QuantityButton action={addCartProduct} add={true} />
              </div>
            </div>
            <Link
              to={`/products/${props.id}`}
              className={`d-flex col align-items-center justify-content-center ${styles.link}`}
            >
              <Button className={`align-self-center ${styles.button}`}>
                MORE
              </Button>
            </Link>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
