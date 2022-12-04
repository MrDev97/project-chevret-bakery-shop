import { useState } from 'react';
import styles from './NavBar.module.scss';
import { IMGS_URL } from '../../../config';
import { Navbar, Form, Button, Container, Collapse } from 'react-bootstrap';
import SearchButton from '../../common/SearchButton/SearchButton';
import ShoppingCart from '../../common/ShoppingCart/ShoppingCart';
import UserArea from '../../common/UserArea/UserArea';
import HomeButton from '../../common/HomeButton/HomeButton';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleSearch = () => {
    setOpen(!open);
  };

  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/" className={`d-flex ${styles.brand}`}>
          <img
            src={IMGS_URL + 'logo.svg'}
            className="d-inline-block align-top"
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
            <UserArea />
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
