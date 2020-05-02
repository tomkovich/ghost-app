import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

/* Material */
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import FETCH_MOVIES from "../util/gql";
import {
  CardActions,
  Button,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";

import image from "../images/sh.jpg";

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
  buttons: {
    padding: 0,
  },
  button: {
    padding: "0 10px",
    justifyContent: "flex-end",
    margin: "0 10px 10px 10px",
    minWidth: 0,
  },
  media: {
    height: 220,
  },
});

const Movies = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(FETCH_MOVIES);

  if (loading)
    return <CircularProgress className={classes.progress} color="secondary" />;
  if (error) return <p>Error :(</p>;

  return (
    <Grid container justify="center" spacing={2}>
      {data.getMovies.map((movie, index) => (
        <Grid key={index} item xs={5}>
          <Movie movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

const Movie = (movie) => {
  const { title, date, username, id } = movie.movie;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title="Movie" />
      </CardActionArea>
      <CardContent>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttons}>
        <Button size="small" color="secondary" className={classes.button}>
          {username}
        </Button>
        <Button
          component={Link}
          to={id}
          size="small"
          color="primary"
          className={classes.button}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Movies;
