import styles from './ShoppingCart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const ShoppingCart = (props) => {
  return (
    <a href="/user/cart">
      <span
        data-count="10"
        className={`fa-stack fa-2x has-badge ${styles.background}`}
      >
        <FontAwesomeIcon
          icon={solid('circle')}
          className={`fa-stack-2x ${styles.background}`}
        />
        <FontAwesomeIcon
          icon={solid('cart-shopping')}
          className={`fa-stack-1x fa-inverse ${styles.cart}`}
        />
      </span>
    </a>
  );
};

export default ShoppingCart;
