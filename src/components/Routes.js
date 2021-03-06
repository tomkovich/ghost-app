import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/Home.js";
import Post from "../pages/Post.js";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import AuthRoute from "./AuthRoute.js";
import SingleMovie from "../pages/SingleMovie.js";
import User from "../pages/User.js";

const Routes = () => {
  return (
    <>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/movie" render={() => <Post />} />
      <Route exact path="/movie/:id" render={() => <SingleMovie />} />
      <Route path="/user/:username" render={() => <User />} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </>
  );
};

export default Routes;
