import React, { createContext, useReducer } from "react";
import { LOGIN, LOGOUT } from "./types";
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

if(localStorage.getItem('token')) {
  const decodedToken = jwtDecode(localStorage.getItem('token'))

  if(decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token')
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  function login(data) {
    localStorage.setItem('token', data.token)
    dispatch({
      type: LOGIN,
      payload: data,
    });
  }

  function logout() {
    localStorage.removeItem('token')
    dispatch({
      type: LOGOUT,
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, logout, login }}
      {...props}
    />
  );
};

export { AuthProvider, AuthContext }