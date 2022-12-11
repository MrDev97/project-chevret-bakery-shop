import styles from './UserArea.module.scss';
import { Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getRequest } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../common/UserIcon/UserIcon';
import UserAddressCard from '../../common/UserAddressCard/UserAddressCard';
import UserAddAddressCard from '../../common/UserAddAddressCard/UserAddAddressCard';
import UserAddressesSlider from '../../features/UserAddressesSlider/UserAddressesSlider';
import { SwiperSlide } from 'swiper/react';
import { checkLoginRequest } from '../../../redux/usersRedux';
import { useEffect } from 'react';
import { Alert, Progress } from 'reactstrap';

const UserArea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const request = useSelector(getRequest);
  const user = useSelector((state) => getUser(state));

  useEffect(() => {
    dispatch(checkLoginRequest());
  }, [dispatch]);

  if (request.pending) return <Progress animated color="primary" value={50} />;
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (!request.success || !user)
    return <Alert color="info">No User Data!</Alert>;
  else if (request.success)
    return (
      <Container className={`${styles.main}`}>
        <div className="d-flex justify-content-between">
          <h1 className="align-self-center fs-2 fw-bold">
            Welcome {user.firstName} {user.lastName}! How Are You?
          </h1>
        </div>

        <Container className={`d-flex my-4 flex-column align-items-center`}>
          <UserIcon />
          <Container className={`my-4`}>
            <UserAddressesSlider>
              <SwiperSlide>
                <UserAddAddressCard />
              </SwiperSlide>
              {user.address.map((address, i) => {
                return (
                  <SwiperSlide key={i}>
                    <UserAddressCard {...address} />
                  </SwiperSlide>
                );
              })}
            </UserAddressesSlider>
          </Container>
          <Button onClick={() => navigate('/auth/logout')} variant="outline">
            Logout
          </Button>
        </Container>
      </Container>
    );
};

export default UserArea;
