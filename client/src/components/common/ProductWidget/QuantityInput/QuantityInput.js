import styles from './QuantityInput.module.scss';
import { Form } from 'react-bootstrap';

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
