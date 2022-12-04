import { Row } from 'react-bootstrap';
import { Alert, Progress } from 'reactstrap';
import Product from '../../common/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getAllProducts,
  loadProductsRequest,
  getRequest,
} from '../../../redux/productsRedux';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  if (request.pending) return <Progress animated color="primary" value={50} />;
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (!request.success || !products.length)
    return <Alert color="info">No Products!</Alert>;
  else if (request.success)
    return (
      <Row xs={1} md={2} lg={3} className="g-4 my-2">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </Row>
    );
};

export default Products;
