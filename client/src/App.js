import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import MainView from './components/views/MainView/MainView';
import Product from './components/pages/Product/Product.js';
import { useDispatch } from 'react-redux';
import { loadCartProductsRequest } from './redux/cartRedux.js';
import UserArea from './components/pages/UserArea/UserArea.js';
import Login from './components/pages/Login/Login.js';
import { checkLoginRequest, getUser } from './redux/usersRedux';
import Logout from './components/features/Logout/Logout.js';
import AddUserAddress from './components/features/AddUserAddress/AddUserAddress.js';
import SignUpForm from './components/pages/SignUpForm/SignUpForm.js';
import NotFound from './components/pages/NotFound/NotFound.js';
import Cart from './components/pages/Cart/Cart.js';
import ProtectedRoute from './components/features/ProtectedRoute/ProtectedRoute.js';
import { useSelector } from 'react-redux';
import CheckoutAddress from './components/pages/ChekoutAddress/CheckoutAddress.js';
import CheckoutPayment from './components/pages/ChekoutPayment/CheckoutPayment.js';
import CheckoutSummary from './components/pages/ChekoutSummary/CheckoutSummary.js';
import OrderNumber from './components/pages/OrderNumber/OrderNumber.js';

const App = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartProductsRequest());
    dispatch(checkLoginRequest());
  }, [dispatch]);

  return (
    <MainView>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<Product />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<SignUpForm />} />
        <Route path="/auth" element={<ProtectedRoute user={user} />}>
          <Route path="/auth/logout" element={<Logout />} />
        </Route>
        <Route path="/users" element={<ProtectedRoute user={user} />}>
          <Route exact path=":id/addresses" element={<AddUserAddress />} />
          <Route exact path=":id" element={<UserArea />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute user={user} />}>
          <Route exact path="address" element={<CheckoutAddress />} />
          <Route exact path="payment" element={<CheckoutPayment />} />
          <Route exact path="summary" element={<CheckoutSummary />} />
          <Route exact path="order" element={<OrderNumber />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainView>
  );
};

export default App;
