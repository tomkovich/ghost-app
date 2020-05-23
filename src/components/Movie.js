import React from "react";
import {
  CardActions,
  Button,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import image from "../images/sh.jpg";
import DeleteButton from "./DeleteButton";

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

const Movie = ({ movie, user, setPosts }) => {
  const { title, date, username, id } = movie;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia image={image} title={title} className={classes.media} />
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
        <Button
          component={Link}
          to={`/user/${username}`}
          size="small"
          color="secondary"
          className={classes.button}
        >
          {username}
        </Button>
        <Button
          component={Link}
          to={`/movie/${id}`}
          size="small"
          color="primary"
          className={classes.button}
        >
          Learn more
        </Button>
        {user && user.username === username && (
          <DeleteButton setPosts={setPosts} id={id} />
        )}
      </CardActions>
    </Card>
  );
};

export default Movie;
