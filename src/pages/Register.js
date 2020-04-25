import React, { useState, useContext } from "react";
import cat from "../images/cat.gif";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../context/auth";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 100,
    margin: "20px auto",
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
}));

const Register = (props) => {
  const context = useContext(AuthContext)
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: user } }) {
      context.login(user)
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  let onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  let formSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <>
      <div className={classes.image}>
        <img src={cat} />
      </div>
      <h2 className={classes.title}>Register</h2>

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
          error={errors.email ? true : false}
          variant="outlined"
          label="Email"
          helperText={errors.email ? errors.email : "Enter your best email"}
          type="text"
          name="email"
          className={classes.textField}
          value={values.email}
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
        <TextField
          error={errors.confirmPassword ? true : false}
          variant="outlined"
          label="Confirm Password"
          helperText={
            errors.confirmPassword
              ? errors.confirmPassword
              : "Please confrim password"
          }
          type="password"
          name="confirmPassword"
          className={classes.textField}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      inputData: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

export default withRouter(Register);
