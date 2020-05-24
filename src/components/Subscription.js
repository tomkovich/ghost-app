import React, { useState, useEffect } from "react";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Subscription = () => {
  const [open, setOpen] = useState(false);
  const { loading, data } = useSubscription(POST_SUBSCRIPTION);

  useEffect(() => {
    if (!loading && data) setOpen(true);
  }, [loading, data]);

  return (
    !loading && (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MuiAlert onClose={() => setOpen(false)} severity="info">
            <div>
              Movie added: <strong>{data.newMovie.title}</strong>
            </div>
          </MuiAlert>
        </Snackbar>
      </div>
    )
  );
};

const POST_SUBSCRIPTION = gql`
  subscription {
    newMovie {
      title
    }
  }
`;

export default Subscription;
