import { Alert, Progress } from 'reactstrap';
import ProductCard from '../../common/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getAllProducts,
  loadProductsRequest,
  getRequest,
} from '../../../redux/productsRedux';
import { SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/grid';
import ProductsSlider from '../../features/ProductsSlider/ProductsSlider';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
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
      <ProductsSlider>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </ProductsSlider>
    );
};

export default Products;
