import { Card } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import styles from './UserPaymentMethodsCard.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserPaymentMethodsCard = ({ action }) => {
  const details = {
    id: 'Pay_at_Store',
    name: 'Payment at the Store',
  };

  const handleClick = () => {
    if (action) {
      action(details);
    }
  };

  return (
    <Link onClick={handleClick} className={styles.link}>
      <Card className={styles.card}>
        <Card.Body>
          <div className={`d-flex flex-column ${styles.header}`}>
            <Card.Title className="mb-3 text-truncate text-center">
              <h2>{details.name}</h2>
            </Card.Title>
            <Card.Img
              crossOrigin="anonymous"
              src={IMGS_URL + 'main-star.svg'}
            />
          </div>
          <div
            className={`d-flex mt-2 justify-content-center ${styles.description}`}
          >
            We are thrilled to see You!
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default UserPaymentMethodsCard;

UserPaymentMethodsCard.propTypes = {
  action: PropTypes.func,
};
