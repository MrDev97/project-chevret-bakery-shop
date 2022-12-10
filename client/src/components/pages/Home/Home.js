import { Container } from 'react-bootstrap';
import Products from '../../views/Products/Products';

const Home = () => {
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between">
        <h1 className="m-0 mb-4 align-self-center fs-2 fw-bold">
          All Delicious Products
        </h1>
      </div>
      <Products />
    </Container>
  );
};

export default Home;
