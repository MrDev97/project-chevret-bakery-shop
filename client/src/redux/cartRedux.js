import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getAllCartProducts = ({ cart }) => cart.products;
export const getAllCartProductsCount = ({ cart }) =>
  cart.products.reduce((n, { quantity }) => n + quantity, 0);

export const getAllCartProductsSum = ({ cart }) =>
  cart.products.reduce(
    (n, { price, quantity }) => Math.round((n + price * quantity) * 100) / 100,
    0,
  );

export const getCartProductById = ({ cart }, cartProductId) =>
  cart.products.find((product) => product.id === cartProductId);
export const getRequest = ({ cart }) => cart.request;

// action name creator
const reducerName = 'cart';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const ADD_CART_PRODUCT = createActionName('ADD_CART_PRODUCT');
const UPDATE_CART_PRODUCT = createActionName('UPDATE_CART_PRODUCT');
const REMOVE_CART_PRODUCT = createActionName('REMOVE_CART_PRODUCT');
const LOAD_CART_PRODUCTS = createActionName('LOAD_CART_PRODUCTS');

const RESET_CART_PRODUCT = createActionName('RESET_CART_PRODUCT');

// actions
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const addCartProduct = (payload) => ({
  payload,
  type: ADD_CART_PRODUCT,
});
export const loadCartProducts = (payload) => ({
  payload,
  type: LOAD_CART_PRODUCTS,
});
export const removeCartProduct = (payload) => ({
  payload,
  type: REMOVE_CART_PRODUCT,
});
export const updateCartProduct = (payload) => ({
  payload,
  type: UPDATE_CART_PRODUCT,
});
export const resetCartProduct = (payload) => ({
  payload,
  type: RESET_CART_PRODUCT,
});

// thunks
export const loadCartProductsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_CART_PRODUCTS' }));
    try {
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (cart && cart.products) {
        dispatch(loadCartProducts(cart.products));
      }
      dispatch(endRequest({ name: 'LOAD_CART_PRODUCTS' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_CART_PRODUCTS', error: e.message }));
    }
  };
};

const createCartInLocalStorage = () => {
  const cart = {
    products: [],
  };
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartProductsRequest = (productToAdd) => {
  return async (dispatch) => {
    if (localStorage.getItem('cart') === null) {
      createCartInLocalStorage();
    }

    let cart = JSON.parse(localStorage.getItem('cart'));

    const findProduct = cart.products.find(
      (product) => product.id === productToAdd.id,
    );

    if (!findProduct) {
      cart = {
        ...cart,
        products:
          productToAdd.quantity !== 0
            ? [...cart.products, productToAdd]
            : [...cart.products],
      };
      dispatch(addCartProduct(productToAdd));
    }

    if (findProduct && productToAdd.quantity !== 0) {
      cart = {
        ...cart,
        products: cart.products.map((product) =>
          product.id === productToAdd.id && productToAdd.quantity !== 0
            ? { ...product, ...productToAdd }
            : product,
        ),
      };
      dispatch(updateCartProduct(productToAdd));
    }

    if (findProduct && productToAdd.quantity === 0) {
      cart = {
        ...cart,
        products: cart.products.filter((product) =>
          product.id === productToAdd.id ? false : true,
        ),
      };
      dispatch(removeCartProduct(productToAdd));
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };
};

// initial state
const initialState = {
  products: [],
  request: {},
};

// action creators
const cartReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CART_PRODUCTS:
      return {
        ...statePart,
        products: [...action.payload],
      };
    case ADD_CART_PRODUCT:
      return {
        ...statePart,
        products:
          action.payload.quantity !== 0
            ? [...statePart.products, action.payload]
            : [...statePart.products],
      };
    case REMOVE_CART_PRODUCT:
      return {
        ...statePart,
        products: statePart.products.filter((product) =>
          product.id === action.payload.id ? false : true,
        ),
      };
    case UPDATE_CART_PRODUCT:
      return {
        ...statePart,
        products: statePart.products.map((product) =>
          product.id === action.payload.id && action.payload.quantity !== 0
            ? { ...product, ...action.payload }
            : product,
        ),
      };
    case RESET_CART_PRODUCT:
      return initialState;
    case START_REQUEST:
      return {
        ...statePart,
        request: { pending: true, error: null, success: false },
      };
    case END_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: null, success: true },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        request: { pending: false, error: action.error, success: false },
      };
    default:
      return statePart;
  }
};

export default cartReducer;
