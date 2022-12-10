import { Row } from 'react-bootstrap';
import { Alert, Progress } from 'reactstrap';
import ProductCard from '../../common/ProductCard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import {
  getAllProducts,
  loadProductsRequest,
  getRequest,
} from '../../../redux/productsRedux';
import useWindowSize from '../../common/useWindowSize/useWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/grid';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  const request = useSelector(getRequest);

  const newFurnitureSize = useWindowSize();
  const [galleryRows, setGalleryRows] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (newFurnitureSize[0] < 768) {
      setGalleryRows(1);
    } else {
      setGalleryRows(2);
    }
  }, [newFurnitureSize]);

  if (request.pending) return <Progress animated color="primary" value={50} />;
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (!request.success || !products.length)
    return <Alert color="info">No Products!</Alert>;
  else if (request.success)
    return (
      <Swiper
        ref={sliderRef}
        centeredSlides={true}
        grid={{
          rows: galleryRows,
          fill: 'row',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            grid: {
              rows: 1,
              fill: 'row',
            },
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            grid: {
              rows: 2,
              fill: 'row',
            },
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
            grid: {
              rows: 2,
              fill: 'row',
            },
          },
        }}
        slidespercolumnfill="row"
        spaceBetween={30}
        modules={[Grid]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default Products;
