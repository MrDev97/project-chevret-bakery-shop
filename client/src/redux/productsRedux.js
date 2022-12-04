import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getAllProducts = ({ products }) => products.data;
export const getProductById = ({ products }, productId) =>
  products.data.find((product) => product.id === productId);
export const getRequest = ({ products }) => products.request;

// action name creator
const reducerName = 'products';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_PRODUCTS = createActionName('LOAD_PRODUCTS');

// actions
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loadProducts = (payload) => ({ payload, type: LOAD_PRODUCTS });

// thunks
export const loadProductsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_PRODUCTS' }));
    try {
      let res = await axios.get(`${API_URL}/products`);
      dispatch(loadProducts(res.data));
      dispatch(endRequest({ name: 'LOAD_PRODUCTS' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_PRODUCTS', error: e.message }));
    }
  };
};

// initial state
const initialState = {
  data: [],
  request: {},
};

// action creators
const productsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...statePart, data: [...action.payload] };
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

export default productsReducer;
