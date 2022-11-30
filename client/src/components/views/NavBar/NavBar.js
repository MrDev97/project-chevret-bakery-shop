import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="py-4 fs-3">
          Chevret Bakery
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
