import { useState } from 'react';
import { Col, Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import QuantityController from '../ProductWidget/QuantityController/QuantityController';
import MapCardTags from '../../features/MapCardTags/MapCardTags';
import styles from './ProductCard.module.scss';

const ProductCard = (props) => {
  const [quantity, setQuantity] = useState(0);

  const updateCart = (props) => {
    console.log('Cart Updated!');
    console.log(props);
  };

  return (
    <Col>
      <Card className={styles.card}>
        {props.images && (
          <Card.Img crossOrigin="anonymous" src={IMGS_URL + props.images[0]} />
        )}
        <Card.Body>
          <div className={`d-flex flex-column ${styles.header}`}>
            <Card.Title className="mb-3 text-truncate text-center">
              <h2>{props.name}</h2>
            </Card.Title>
            {!!props.tags.length && (
              <MapCardTags className={styles.tags} tags={props.tags} />
            )}
          </div>
          <Container className="d-flex p-0">
            <div className="d-flex col-8 flex-column justify-content-start">
              <div
                className={`d-flex p-0 justify-content-center ${styles.price}`}
              >
                <h3>{props.price}</h3>
                <span>PLN</span>
              </div>
              <QuantityController
                quantity={quantity}
                setQuantity={setQuantity}
                action={updateCart}
                productId={props.id}
                price={props.price}
                name={props.name}
              />
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

export default ProductCard;
