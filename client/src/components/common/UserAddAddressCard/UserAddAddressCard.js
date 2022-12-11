import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../../../config';
import styles from './UserAddAddressCard.module.scss';

const UserAddAddressCard = () => {
  const { id } = useParams();

  return (
    <Link to={`/users/${id}/addresses`} className={styles.link}>
      <Card className={styles.card}>
        <Card.Body className={`d-flex flex-column ${styles.body}`}>
          <Card.Title className="mb-3 text-truncate text-center">
            <h2>Add New Address</h2>
          </Card.Title>
          <Card.Img crossOrigin="anonymous" src={IMGS_URL + 'main-star.svg'} />
        </Card.Body>
      </Card>
    </Link>
  );
};

export default UserAddAddressCard;
