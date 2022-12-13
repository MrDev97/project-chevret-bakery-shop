import styles from './ShoppingCartButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { getAllCartProductsCount } from '../../../redux/cartRedux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ShoppingCartButton = () => {
  const cartProductCount = useSelector((state) =>
    getAllCartProductsCount(state),
  );

  return (
    <Link to={`/cart`}>
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
    </Link>
  );
};

export default ShoppingCartButton;
