import styles from './QuantityInput.module.scss';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const QuantityInput = ({ quantity, handleChange }) => {
  return (
    <Form.Control
      value={quantity}
      onChange={(e) => handleChange(parseInt(e.target.value))}
      type="number"
      className={`align-self-center ${styles.input}`}
    />
  );
};

export default QuantityInput;

QuantityInput.propTypes = {
  quantity: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
