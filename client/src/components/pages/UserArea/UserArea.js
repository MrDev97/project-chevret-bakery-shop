import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUser, getRequest } from '../../../redux/usersRedux';
import { Nav, NavLink } from 'react-bootstrap';

const UserArea = () => {
  const request = useSelector(getRequest);
  const user = useSelector(getUser);

  if (request.success)
    return (
      <Container className="mt-4">
        <div className="d-flex justify-content-between">
          <h1 className="m-0 align-self-center fs-2 fw-bold">
            Welcome {user.firstName} {user.lastName}! How Are You?
          </h1>
        </div>
        <Nav.Link as={NavLink} to="/auth/logout">
          <Button variant="success">Logout</Button>
        </Nav.Link>
      </Container>
    );
};

export default UserArea;
