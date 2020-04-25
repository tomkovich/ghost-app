import React from "react";
import "./App.css";

import Container from "@material-ui/core/Container";
import Navbar from "./components/Navbar";

import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import { AuthProvider } from "./context/auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container disableGutters={true} maxWidth={false}>
          <Navbar />
          <Routes />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
