import React from 'react';
import styles from './NavBar.module.scss';
import { IMGS_URL } from '../../../config';
import { Navbar, Nav, Form, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.custom}>
      <Container className="p-0">
        <Navbar.Brand href="/" className="d-flex justify-content-center col">
          <div className="d-flex align-items-start justify-content-center col-6 col-md-4">
            <img
              src={IMGS_URL + 'logo.svg'}
              width="200"
              height="200"
              className="d-inline-block align-top"
              alt="Bakery Logo"
            />
          </div>
          <div className="d-flex align-items-start justify-content-center flex-column col-6 col-md-8">
            <span className="fs-md-4 fs-2"> Crunchy Dreams </span>
            <span className="fs-md-5 fs-3"> Online Shop </span>
          </div>
        </Navbar.Brand>

        <div className="d-flex col">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end text-center"
          >
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
                className="align-self-center"
                variant="outline-success"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
