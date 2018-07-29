import loginService from '../services/login';
import blogService from '../services/blogs';
import { notify } from './notificationReducer';

const loginReducer = (state = { user: null, resolved: false }, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      user: action.user,
      resolved: true
    };
  case 'LOGOUT':
    return {
      user: null,
      resolved: true
    };
  case 'SET_RESOLVED':
    return {
      user: state.user,
      resolved: true
    };
  default:
    return state;
  }
};

export const checkLocalStorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({ type: 'LOGIN', user });
    }
    dispatch({ type: 'SET_RESOLVED' });
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService
        .login({ username, password });
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: 'LOGIN', user });
    } catch (exception) {
      notify('invalid username or password', 'error', 5)(dispatch);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    dispatch({ type: 'LOGOUT' });
  };
};

export default loginReducer;
