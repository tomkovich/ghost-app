import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...args }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...args}
      render={(props) =>
        !user ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthRoute;
