import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/Home.js";
import Post from "../pages/Post.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import AuthRoute from "./AuthRoute.js";

const Routes = () => {
  return (
    <>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/movie" render={() => <Post />} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </>
  );
};

export default Routes;
