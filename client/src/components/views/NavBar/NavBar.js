import { useState } from 'react';
import styles from './NavBar.module.scss';
import { Navbar, Form, Button, Container, Collapse } from 'react-bootstrap';
import SearchButton from '../../common/SearchButton/SearchButton';
import ShoppingCart from '../../common/ShoppingCart/ShoppingCart';
import UserAreaButton from '../../common/UserAreaButton/UserAreaButton';
import HomeButton from '../../common/HomeButton/HomeButton';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleSearch = () => {
    setOpen(!open);
  };

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container className="mb-2">
        <Navbar.Brand
          href="/"
          className={`d-flex col my-3 mx-0 justify-content-center ${styles.brand}`}
        >
          <img
            src={'../../../logo.svg'}
            className="d-inline-block"
            alt="Bakery Logo"
          />

          <div className="d-flex justify-content-center flex-column">
            <span> Crunchy Dreams </span>
            <span> ONLINE SHOP </span>
          </div>
        </Navbar.Brand>

        <Container>
          <div className="d-flex justify-content-between justify-content-md-end">
            <HomeButton />
            <UserAreaButton />
            <SearchButton
              action={toggleSearch}
              aria-controls="collapse-search-form"
              aria-expanded={open}
            />
            <ShoppingCart />
          </div>

          <Collapse in={open}>
            <div id="collapse-search-form">
              <Form className="d-flex m-2">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 my-2"
                />
                <Button
                  type="submit"
                  className={`align-self-center ${styles.button}`}
                  variant="outline"
                >
                  Search
                </Button>
              </Form>
            </div>
          </Collapse>
        </Container>
      </Container>
    </Navbar>
  );
};

export default NavBar;
