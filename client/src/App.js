import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import MainView from './components/views/MainView/MainView';
import Product from './components/pages/Product/Product.js';
import { useDispatch } from 'react-redux';
import { loadCartProductsRequest } from './redux/cartRedux.js';
import UserArea from './components/pages/UserArea/UserArea.js';
import Login from './components/pages/Login/Login.js';
import { checkLoginRequest } from './redux/usersRedux';
import Logout from './components/features/Logout/Logout.js';
import AddUserAddress from './components/features/AddUserAddress/AddUserAddress.js';
import SignUpForm from './components/pages/SignUpForm/SignUpForm.js';

const App = () => {
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
        <Route path="/auth/logout" element={<Logout />} />
        <Route exact path="/users/:id/addresses" element={<AddUserAddress />} />
        <Route exact path="/users/:id" element={<UserArea />} />
        <Route path="/auth/register" element={<SignUpForm />} />
        {/* <Route path="/products/:search" element={<Search />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </MainView>
  );
};

export default App;
