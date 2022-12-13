import { Alert, Progress } from 'reactstrap';
import CartProduct from '../../common/CartProduct/CartProduct';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  loadCartProductsRequest,
  getAllCartProducts,
  getRequest,
} from '../../../redux/cartRedux';

const CartProducts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(getAllCartProducts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadCartProductsRequest());
  }, [dispatch]);

  if (request.pending) return <Progress animated color="primary" value={50} />;
  else if (request.error) return <Alert color="warning">{request.error}</Alert>;
  else if (!request.success || !cartProducts.length)
    return <Alert color="info">Cart is Empty!</Alert>;
  else if (request.success)
    return (
      <div className="mt-3">
        {cartProducts.map((product) => (
          <CartProduct key={product.id} {...product} />
        ))}
      </div>
    );
};

export default CartProducts;
