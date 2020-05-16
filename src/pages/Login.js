import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../context/auth";

const useStyles = makeStyles({
  error: {
    fontSize: 14,
    marginBottom: 10,
    color: "red",
  },
  title: {
    textAlign: "center",
  },
  form: {
    width: 400,
    margin: "20px auto",
    textAlign: "center",
  },
  textField: {
    width: "100%",
    marginBottom: 25,
  },
});

const Login = (props) => {
  const context = useContext(AuthContext);

  const classes = useStyles();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  let [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: user } }) {
      context.login(user);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  if (loading) return null;

  let formSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  let onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2 className={classes.title}>Log In</h2>

      <form onSubmit={formSubmit} className={classes.form}>
        <TextField
          error={errors.username ? true : false}
          variant="outlined"
          label="Username"
          helperText={
            errors.username ? errors.username : "Enter your best username"
          }
          type="text"
          name="username"
          className={classes.textField}
          value={values.username}
          onChange={onChange}
        />
        <TextField
          error={errors.password ? true : false}
          variant="outlined"
          label="Password"
          helperText={errors.password ? errors.password : "Enter your password"}
          type="password"
          name="password"
          className={classes.textField}
          value={values.password}
          onChange={onChange}
        />
        {errors.general && (
          <div className={classes.error}>{errors.general}</div>
        )}
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

export default withRouter(Login);
