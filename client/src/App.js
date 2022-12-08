import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import MainView from './components/views/MainView/MainView';
import Product from './components/pages/Product/Product.js';

const App = () => {
  return (
    <MainView>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/products/:id" element={<Product />} />
        {/* <Route path="/auth/login" element={<LogIn />} />
        <Route path="/auth/logout" element={<LogOut />} />
        <Route path="/auth/register" element={<SignUp />} />
        <Route path="/products/:search" element={<Search />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </MainView>
  );
};

export default App;
