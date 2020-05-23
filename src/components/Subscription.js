import React, { useState, useEffect } from "react";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Subscription = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { loading, data } = useSubscription(POSTS_SUB);

  useEffect(() => {
    if (data) setOpen(true);
  }, [data]);

  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={() => setOpen(true)}>
        Open success snackbar
      </Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MuiAlert onClose={() => setOpen(false)} severity="info">
          {!loading && (
            <div>
              New movie added: <strong>{data.newMovie.title}</strong>
            </div>
          )}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

const POSTS_SUB = gql`
  subscription {
    newMovie {
      title
    }
  }
`;

export default Subscription;
