import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MovieIcon from "@material-ui/icons/Movie";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import logo from "../images/ghost.svg";
import { AuthContext } from "../context/auth";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#ff7043",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
    maxWidth: 80,
    padding: 0,
  },
  login: {
    marginLeft: "auto",
    height: 45,
    color: "#fff",
    borderRadius: 5,
    maxWidth: 100,
  },
  register: {
    marginRight: 25,
    height: 45,
    backgroundColor: "#7DB3D3",
    color: "#fff",
    borderRadius: 5,
    maxWidth: 100,
  },
  logo: {
    minWidth: 65,
    maxWidth: 35,
    marginLeft: 25,
    marginRight: 40,
  },
  username: {
    backgroundColor: "#7DB3D3",
    color: "#fff",
    borderRadius: 5,
    maxWidth: 100,
    marginLeft: "auto",
  },
});

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const classes = useStyles();

  const navbarLayout = !user ? (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction
        showLabel={true}
        label={<img src={logo} alt="GHOST" />}
        className={classes.logo}
      />
      <BottomNavigationAction
        label="Movies"
        icon={<MovieIcon />}
        className={classes.icon}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        icon={<PersonIcon />}
        className={classes.login}
        component={Link}
        to="/login"
        label={<span>Login</span>}
        showLabel={true}
      />
      <BottomNavigationAction
        icon={<PersonAddIcon />}
        className={classes.register}
        component={Link}
        to="/register"
        label={<span>Register</span>}
        showLabel={true}
      />
    </BottomNavigation>
  ) : (
    <BottomNavigation className={classes.root}>
      <BottomNavigationAction
        showLabel={true}
        label={<img src={logo} alt="GHOST" />}
        className={classes.logo}
      />
      <BottomNavigationAction
        label="Movies"
        icon={<MovieIcon />}
        className={classes.icon}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Add Movie"
        icon={<AddIcon />}
        className={classes.icon}
        component={Link}
        to="/movie"
      />
      <BottomNavigationAction
        className={classes.username}
        label={<span>{user.username}</span>}
        showLabel={true}
      />
      <BottomNavigationAction
        icon={<ExitToAppIcon />}
        className={classes.icon}
        label={<span>Logout</span>}
        showLabel={true}
        onClick={logout}
      />
    </BottomNavigation>
  )

  return navbarLayout;
};

export default Navbar;
