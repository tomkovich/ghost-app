import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import FETCH_MOVIES from "../util/gql";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px auto",
    width: "750px",
  },
  textField: {
    marginBottom: 30,
  },
  select: {
    width: 200,
  },
  button: {
    backgroundColor: "#ff7043",
    color: "#fff",
    margin: "20px auto",
    width: "100%",
  },
  success: {
    fontSize: 14,
    margin: "20px auto 10px auto",
    width: "100%",
  },
  error: {
    fontSize: 14,
    marginBottom: 10,
    color: "red",
    width: "100%",
    marginTop: 10,
  },
  title: {
    textAlign: "center",
  },
}));

const AddPost = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    title: "",
    date: new Date().getFullYear(),
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { addMovie } }) {
      if (cache.data.data.ROOT_QUERY) {
        const movies = cache.readQuery({
          query: FETCH_MOVIES,
        });

        cache.writeQuery({
          query: FETCH_MOVIES,
          data: {
            getMovies: [addMovie, ...movies.getMovies],
          },
        });
      }
      setValues({
        title: "",
        date: new Date().getFullYear(),
      });
      setError("");
      setOpen(true);
    },
    onError(e) {
      setError(e.graphQLErrors[0].message);
    },
    variables: values,
  });

  let handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  let years = [];
  for (let i = 2000; i <= values.date; i++) {
    years.push(i);
  }

  let formSubmit = (e) => {
    e.preventDefault();
    addPost();
  };

  let handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h2 className={classes.title}>Add Post</h2>
      <form className={classes.root} onSubmit={formSubmit}>
        <TextField
          variant="outlined"
          label="Title"
          type="text"
          name="title"
          fullWidth
          error={error ? true : false}
          helperText={error && error}
          className={classes.textField}
          value={values.title}
          onChange={handleChange}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Year</InputLabel>
          <Select
            className={classes.select}
            value={values.date}
            onChange={handleChange}
            name="date"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" className={classes.button}>
          Okay
        </Button>
        {open && (
          <Alert onClose={handleClose} severity="success">
            <AlertTitle>Success</AlertTitle>A Movie added{" "}
            <strong>successful!</strong>
          </Alert>
        )}
      </form>
    </>
  );
};

const ADD_POST = gql`
  mutation addMovie($title: String!, $date: Int) {
    addMovie(title: $title, date: $date) {
      title
      date
      username
    }
  }
`;

export default AddPost;
