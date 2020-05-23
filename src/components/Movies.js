import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

/* Material */
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Movie from "./Movie";
import FETCH_MOVIES from "../util/gql";

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
  const [posts, setPosts] = useState([]);
  const { loading, error, data } = useQuery(FETCH_MOVIES);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (data && !error) {
      setPosts(data.getMovies);
    }
  }, [data, error]);

  if (error) return "Error :(";

  return (
    <Grid container justify="center" spacing={2}>
      {loading ? (
        <CircularProgress className={classes.progress} color="secondary" />
      ) : (
        posts.length > 0 &&
        posts.map((movie, index) => (
          <Grid key={index} item xs={5}>
            <Movie setPosts={setPosts} user={user} movie={movie} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Movies;
