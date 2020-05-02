import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Redirect } from "react-router-dom";
import AddPost from "../components/AddPost";

const Post = () => {
  const { user } = useContext(AuthContext);

  return !user ? <Redirect to="/login" /> : <AddPost />;
};

export default Post;
