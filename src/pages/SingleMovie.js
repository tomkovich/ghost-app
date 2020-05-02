import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import image from "../images/sh.jpg";

const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    color: "#444",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  date: {
    width: "100%",
    fontSize: 13,
    color: "#666",
  },
  imgWrap: {
    width: 300,
    height: 150,
    margin: "20px auto",
    overflow: "hidden",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  username: {
    width: "100%",
    fontSize: 18,
    color: "#7DB3D3",
  },
});

const SingleMovie = (props) => {
  const classes = useStyles();
  const id = props.match.params.id;

  const { error, loading, data } = useQuery(FETCH_MOVIE, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const { username, date, title } = data.getMovie;

  return (
    <div className={classes.wrapper}>
      <h1>{title}</h1>
      <div className={classes.date}>{date}</div>
      <div className={classes.imgWrap}>
        <img src={image} alt={title} className={classes.image} />
      </div>
      <Link to={`user/${username}`} className={classes.username}>
        {username}
      </Link>
    </div>
  );
};

const FETCH_MOVIE = gql`
  query getMovie($id: ID!) {
    getMovie(id: $id) {
      username
      title
      date
    }
  }
`;

export default withRouter(SingleMovie);
