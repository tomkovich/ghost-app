import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";
import AddPost from "../components/AddPost";

const Post = () => {
  const { user } = useContext(AuthContext);

  let postMarkup = !user ? (
    <Redirect to="/login" />
  ) : (
    <AddPost username={user.username} />
  );

  return postMarkup;
};

export default Post;
