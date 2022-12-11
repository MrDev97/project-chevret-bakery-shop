import styles from './UserArea.module.scss';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser, getRequest } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../common/UserIcon/UserIcon';
import UserAddressCard from '../../common/UserAddressCard/UserAddressCard';

const UserArea = () => {
  const navigate = useNavigate();
  const request = useSelector(getRequest);
  const user = useSelector(getUser);

  if (request.success)
    return (
      <Container className={`${styles.main}`}>
        <div className="d-flex justify-content-between">
          <h1 className="align-self-center fs-2 fw-bold">
            Welcome {user.firstName} {user.lastName}! How Are You?
          </h1>
        </div>

        <Container className={`d-flex my-4 flex-column align-items-center`}>
          <UserIcon />
          <Container className={`d-flex my-4 flex-column align-items-center`}>
            <UserAddressCard />
          </Container>
          <Button onClick={() => navigate('/auth/logout')} variant="outline">
            Logout
          </Button>
        </Container>
      </Container>
    );
};

export default UserArea;
