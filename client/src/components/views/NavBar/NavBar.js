import styles from './NavBar.module.scss';
import { IMGS_URL } from '../../../config';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand
          href="/"
          className={`d-flex justify-content-start md-justify-content-center col ${styles.brand}`}
        >
          <div className="d-flex align-items-start justify-content-center col-4 col-md-4">
            <img
              src={IMGS_URL + 'logo.svg'}
              className="d-inline-block align-top"
              alt="Bakery Logo"
            />
          </div>
          <div className="d-flex align-items-start justify-content-center flex-column col-4 col-md-8">
            <span> Crunchy Dreams </span>
            <span> ONLINE SHOP </span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center">
          <Nav className="fs-4 me-3">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <>
              <Nav.Link as={NavLink} to="/auth/register">
                Sign Up
              </Nav.Link>
              <Nav.Link as={NavLink} to="/auth/login">
                Login
              </Nav.Link>
            </>
          </Nav>
          <Form className="d-flex m-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 my-2"
              aria-label="Search"
            />
            <Button
              type="submit"
              className={`align-self-center ${styles.button}`}
              variant="outline"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
