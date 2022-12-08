import Carousel from 'react-bootstrap/Carousel';
import styles from './ProductCarousel.module.scss';
import { IMGS_URL } from '../../../config';

const ProductCarousel = ({ images }) => {
  return (
    <Carousel fade className={styles.carousel}>
      {images.map((image, i) => {
        return (
          <Carousel.Item key={`${image.name}-${i}`}>
            <img
              crossOrigin="anonymous"
              src={IMGS_URL + image}
              alt={image.name}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default ProductCarousel;
