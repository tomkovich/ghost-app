import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

/* Material */
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles({
  root: {
    marginTop: 50,
    position: "relative"
  },
  progress: {
    position: "absolute",
    top: 85,
    left: "50%",
    transform: "translateX(-50%)"
  }
});

const Movies = () => {
  
  const classes = useStyles();
  const { loading, error, data } = useQuery(FETCH_MOVIES);

  if (loading) return <CircularProgress className={classes.progress} color="secondary" />;
  if (error) return <p>Error :(</p>;

  return (
    <Grid container  justify="center"  spacing={2}>
      {data.getMovies.map(movie => (
        <Grid key={movie.id} item xs={5} >
          <Movie movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

const Movie = movie => {
  const { title, date } = movie.movie;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const FETCH_MOVIES = gql`
  {
    getMovies {
      title
      date
      id
    }
  }
`;

export default Movies;
