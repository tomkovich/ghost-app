import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import FETCH_MOVIES from "../util/gql";
import gql from "graphql-tag";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "20px auto",
    width: "750px",
  },
  textField: {
    marginBottom: 30
  },
  button: {
    backgroundColor: "#ff7043",
    color: "#fff",
    margin: "20px auto",
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
    marginTop: 10
  }
}));

const AddPost = () => {
  const classes = useStyles();

  const [values, setValues] = useState({
    date: new Date().getFullYear(),
    title: "",
  });
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  let currentData = new Date().getFullYear();
  let years = [];
  for (let i = 2000; i <= currentData; i++) {
    years.push(i);
  }

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
      setError('');
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

  let formSubmit = (e) => {
    e.preventDefault();
    addPost();
  };

  let handleClose = () => {
    setOpen(false);
  };

  return (
    <form className={classes.root} onSubmit={formSubmit}>
      <TextField
        label="Title"
        placeholder="How is it?"
        helperText="It should be movie or tv show"
        fullWidth
        name="title"
        value={values.title}
        margin="normal"
        onChange={handleChange}
        helperText={error && error}
        error={error ? true : false}
        InputLabelProps={{
          shrink: true,
        }}
        className={classes.textField}
      />
      <FormControl className={classes.formControl}>
        <InputLabel>Year</InputLabel>
        <Select value={values.date} name="date" onChange={handleChange}>
          {years.map((val, index) => (
            <MenuItem key={val + index} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Year of movie or tv show</FormHelperText>
      </FormControl>
      {open && (
        <Alert
          onClose={handleClose}
          severity="success"
          className={classes.success}
        >
          <AlertTitle>A Movie added successful!</AlertTitle>
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        className={classes.button}
        fullWidth
      >
        Okay
      </Button>
    </form>
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
