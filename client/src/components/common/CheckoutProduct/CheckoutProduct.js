import styles from './CheckoutProduct.module.scss';
import { Container, Col, Card } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import { useSelector } from 'react-redux';
import { getCartProductById } from '../../../redux/cartRedux';

const CheckoutProduct = (props) => {
  const cartData = useSelector((state) => getCartProductById(state, props.id));

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
            </div>
            <h3 className={`d-flex col-4 justify-content-center`}>
              {cartData.quantity}{' '}
              <span
                className={`d-flex align-items-end ${styles.multiplicator}`}
              >
                x
              </span>
            </h3>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CheckoutProduct;
