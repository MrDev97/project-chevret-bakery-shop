import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getOrder = ({ order }) => order;

export const getRequest = ({ order }) => order.request;

// action name creator
const reducerName = 'order';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const ADD_ORDER_PRODUCTS = createActionName('ADD_ORDER_PRODUCTS');
const ADD_ORDER_ADDRESS = createActionName('ADD_ORDER_ADDRESS');
const ADD_ORDER_PAYMENT_METHOD = createActionName('ADD_ORDER_PAYMENT_METHOD');
const ADD_ORDER_DESCRIPTION = createActionName('ADD_ORDER_DESCRIPTION');

// actions
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const addOrderProducts = (payload) => ({
  payload,
  type: ADD_ORDER_PRODUCTS,
});
export const addOrderAddress = (payload) => ({
  payload,
  type: ADD_ORDER_ADDRESS,
});
export const addOrderPaymentMethod = (payload) => ({
  payload,
  type: ADD_ORDER_PAYMENT_METHOD,
});
export const addOrderDescription = (payload) => ({
  payload,
  type: ADD_ORDER_DESCRIPTION,
});

// thunks
export const addOrderProductsRequest = (productsToAdd) => {
  return async (dispatch) => {
    const orderProducts = [];

    productsToAdd.map((product) => {
      const { id, quantity, ...rest } = product;

      let orderProduct = {
        id,
        quantity,
      };

      orderProducts.push(orderProduct);
    });
    dispatch(addOrderProducts(orderProducts));
  };
};

export const addOrderAddressRequest = (address) => {
  return async (dispatch) => {
    dispatch(addOrderAddress(address));
  };
};

export const addOrderPaymentMethodRequest = (paymentMethod) => {
  return async (dispatch) => {
    dispatch(addOrderPaymentMethod(paymentMethod));
  };
};

export const addOrderDescriptionRequest = (description) => {
  return async (dispatch) => {
    dispatch(addOrderDescription(description));
  };
};

// initial state
const initialState = {
  address: null,
  paymentMethod: null,
  products: [{ id: null, quantity: null }],
  description: null,
};

// action creators
const orderReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case ADD_ORDER_PRODUCTS:
      return {
        ...statePart,
        products: action.payload,
      };
    case ADD_ORDER_ADDRESS:
      return {
        ...statePart,
        address: action.payload,
      };
    case ADD_ORDER_PAYMENT_METHOD:
      return {
        ...statePart,
        paymentMethod: action.payload,
      };
    case ADD_ORDER_DESCRIPTION:
      return {
        ...statePart,
        description: action.payload,
      };
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

export default orderReducer;
