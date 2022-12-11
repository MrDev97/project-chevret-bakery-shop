import axios from 'axios';
import { API_URL } from '../config';

// selectors
export const getRequest = ({ users }) => users.request;
export const getUser = ({ users }) => users.user;

// action name creator
const reducerName = 'users';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOGIN_USER = createActionName('LOGIN_USER');
const LOGOUT_USER = createActionName('LOGOUT_USER');

const ADD_USER_ADDRESS = createActionName('ADD_USER_ADDRESS');

// actions
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const loginUser = (payload) => ({ payload, type: LOGIN_USER });
export const logoutUser = (payload) => ({ payload, type: LOGOUT_USER });

export const addUserAddress = (payload) => ({
  payload,
  type: ADD_USER_ADDRESS,
});

// thunks

export const addRegistrationRequest = (user) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'REGISTER_USER' }));
    try {
      await axios.post(`${API_URL}/auth/register`, user);
      dispatch(endRequest({ name: 'REGISTER_USER' }));
    } catch (e) {
      dispatch(
        errorRequest({
          name: 'REGISTER_USER',
          error: e.message,
          status: e.response.status,
        }),
      );
    }
  };
};

export const addLoginRequest = (user) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOGIN_USER' }));
    try {
      let res = await axios.post(`${API_URL}/auth/login`, user, {
        withCredentials: true,
        headers: {
          Authorization: `user=${user.email}; SameSite=Lax`,
        },
      });
      dispatch(loginUser(res.data));
      sessionStorage.setItem('user', JSON.stringify(res.data));
      dispatch(endRequest({ name: 'LOGIN_USER' }));
    } catch (e) {
      dispatch(
        errorRequest({
          name: 'LOGIN_USER',
          error: e.message,
          status: e.response.status,
        }),
      );
    }
  };
};

export const checkLoginRequest = () => {
  return async (dispatch) => {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.id) {
      dispatch(startRequest({ name: 'CHECK_LOGIN' }));
      try {
        let res = await axios.get(`${API_URL}/users/${user.id}`, {
          withCredentials: true,
        });
        dispatch(loginUser(res.data));
        dispatch(endRequest({ name: 'CHECK_LOGIN' }));
      } catch (e) {
        dispatch(
          errorRequest({
            name: 'CHECK_LOGIN',
            error: e.message,
            status: e.response.status,
          }),
        );
      }
    }
  };
};

export const addLogoutRequest = () => {
  return async (dispatch) => {
    let user = JSON.parse(sessionStorage.getItem('user'));

    dispatch(startRequest({ name: 'LOGOUT_USER' }));
    try {
      await axios.post(`${API_URL}/auth/logout`, user, {
        withCredentials: true,
      });
      dispatch(logoutUser());
      dispatch(endRequest({ name: 'LOGOUT_USER' }));
      sessionStorage.removeItem('user');
    } catch (e) {
      dispatch(
        errorRequest({
          name: 'LOGOUT_USER',
          error: e.message,
          status: e.response.status,
        }),
      );
    }
  };
};

export const addUserAddressRequest = ({ id, address }) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'ADD_USER_ADDRESS' }));
    try {
      let res = await axios.put(`${API_URL}/users/${id}/addresses`, address, {
        withCredentials: true,
      });
      const { user, ...rest } = res.data;
      dispatch(addUserAddress(rest));
      dispatch(endRequest({ name: 'ADD_USER_ADDRESS' }));
    } catch (e) {
      dispatch(
        errorRequest({
          name: 'ADD_USER_ADDRESS',
          error: e.message,
          status: e.response.status,
        }),
      );
    }
  };
};

// initial state
const initialState = {
  data: [],
  request: {},
  user: null,
};

// action creators
const usersReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...statePart,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...statePart,
        user: null,
      };
    case ADD_USER_ADDRESS:
      return {
        ...statePart,
        address: [...statePart.user.address, action.payload],
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
        request: {
          pending: false,
          error: action.payload.error,
          success: false,
        },
      };
    default:
      return statePart;
  }
};

export default usersReducer;
