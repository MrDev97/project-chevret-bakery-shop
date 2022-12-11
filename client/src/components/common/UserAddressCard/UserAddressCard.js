import { Card } from 'react-bootstrap';
import { IMGS_URL } from '../../../config';
import styles from './UserAddressCard.module.scss';
import PropTypes from 'prop-types';

const UserAddressCard = (props) => {
  return (
    <Card className={styles.card}>
      <Card.Body>
        <div className={`d-flex flex-column ${styles.header}`}>
          <Card.Title className="mb-3 text-truncate text-center">
            <h2>{props.street}</h2>
          </Card.Title>
          <Card.Img crossOrigin="anonymous" src={IMGS_URL + 'main-star.svg'} />
        </div>
        <div className={`mt-2 ${styles.description}`}>
          <p>
            {props.street} {props.houseNo} {props?.apartmentNo}
          </p>
          <p>{props.city}</p>
          <p>{props.country}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserAddressCard;

UserAddressCard.propTypes = {
  street: PropTypes.string,
  houseNo: PropTypes.number,
  apartmentNo: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
};
