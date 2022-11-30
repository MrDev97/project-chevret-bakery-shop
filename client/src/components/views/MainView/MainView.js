import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { Container } from 'react-bootstrap';

const MainView = ({ children }) => (
  <div>
    <NavBar />
    <Container>{children}</Container>
    <Footer />
  </div>
);

export default MainView;
