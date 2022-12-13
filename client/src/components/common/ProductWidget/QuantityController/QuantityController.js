import { useState, useEffect } from 'react';
import styles from './QuantityController.module.scss';
import QuantityButton from '../QuantityButton/QuantityButton';
import QuantityInput from '../QuantityInput/QuantityInput';
import PropTypes from 'prop-types';

const QuantityController = ({ action, className, ...props }) => {
  const [quantity, setQuantity] = useState(props.quantity);

  useEffect(() => {
    action({
      id: props.productId,
      quantity: quantity,
      price: props.price,
      name: props.name,
      images: props.images,
    });
  }, [quantity]);

  const handleChange = (value) => {
    if (!isNaN(value)) {
      return setQuantity(value);
    }
    if (isNaN(value)) {
      return setQuantity(0);
    }
  };

  const addCartProduct = () => {
    if (quantity >= 0) {
      setQuantity(quantity + 1);
    }
  };

  const removeCartProduct = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={`d-flex justify-content-center ${className}`}>
      <QuantityButton action={removeCartProduct} add={false} />
      <QuantityInput
        handleChange={handleChange}
        quantity={quantity.toString()}
      />
      <QuantityButton action={addCartProduct} add={true} />
    </div>
  );
};

export default QuantityController;

QuantityController.propTypes = {
  productId: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  images: PropTypes.array,
};
