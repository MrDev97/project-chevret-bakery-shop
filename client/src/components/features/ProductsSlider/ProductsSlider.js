import { useState, useEffect, useRef } from 'react';
import useWindowSize from '../../common/useWindowSize/useWindowSize';
import { Swiper } from 'swiper/react';
import { Grid } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/grid';

const ProductsSlider = ({ children }) => {
  const newGallerySize = useWindowSize();
  const [galleryRows, setGalleryRows] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (newGallerySize[0] < 768) {
      setGalleryRows(1);
    } else {
      setGalleryRows(2);
    }
  }, [newGallerySize]);

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
      {children}
    </Swiper>
  );
};

export default ProductsSlider;
