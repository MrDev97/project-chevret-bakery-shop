import styles from './ShoppingCart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { getAllCartProductsCount } from '../../../redux/cartRedux';
import { useSelector } from 'react-redux';

const ShoppingCart = () => {
  const cartProductCount = useSelector((state) =>
    getAllCartProductsCount(state),
  );

  return (
    <a href="/users/cart">
      <span
        data-count={cartProductCount}
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
