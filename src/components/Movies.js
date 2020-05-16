import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

/* Material */
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Movie from "./Movie";

const useStyles = makeStyles({
  root: {
    marginTop: 50,
    position: "relative",
  },
  progress: {
    position: "absolute",
    top: 85,
    left: "50%",
    transform: "translateX(-50%)",
  },
});

const Movies = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(FETCH_MOVIES);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setPosts(data.getMovies);
    }
  }, [data]);

  if (error) return `Error :(`;

  return (
    <Grid container justify="center" spacing={2}>
      {loading ? (
        <CircularProgress className={classes.progress} color="secondary" />
      ) : (
        posts.length > 0 &&
        posts.map((movie, index) => (
          <Grid key={index} item xs={5}>
            <Movie user={user} movie={movie} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

const FETCH_MOVIES = gql`
  {
    getMovies {
      title
      date
      username
      id
    }
  }
`;

export default Movies;
