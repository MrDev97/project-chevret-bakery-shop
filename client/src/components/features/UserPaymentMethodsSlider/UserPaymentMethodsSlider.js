import { useRef } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/scss';

const UserPaymentMethodsSlider = ({ children }) => {
  const sliderRef = useRef(null);

  return (
    <Swiper
      ref={sliderRef}
      initialSlide={1}
      centeredSlides={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
      slidespercolumnfill="row"
      spaceBetween={30}
    >
      {children}
    </Swiper>
  );
};

export default UserPaymentMethodsSlider;
