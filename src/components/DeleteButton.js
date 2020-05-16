import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import gql from "graphql-tag";
import FETCH_MOVIES from "../util/gql";
import { useMutation } from "@apollo/react-hooks";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";

const DeleteButton = ({ id }) => {
  const [open, setOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      id,
    },
    update(cache) {
      if (cache.data.data.ROOT_QUERY) {
        const data = cache.readQuery({
          query: FETCH_MOVIES,
        });

        data.getMovies = data.getMovies.filter((movie) => movie.id !== id);

        cache.writeQuery({
          query: FETCH_MOVIES,
          data,
        });
      }
    },
  });

  let onDelete = () => {
    deletePost();
  };

  return (
    <>
      {open && (
        <Dialog open={open} aria-labelledby="draggable-dialog-title">
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Removing...
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete this movie?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={onDelete} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <IconButton onClick={() => setOpen(true)} style={{ marginLeft: "auto" }}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  );
};

const DELETE_POST = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      title
    }
  }
`;

export default DeleteButton;
