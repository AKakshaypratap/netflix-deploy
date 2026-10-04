import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useSelector, useDispatch } from "react-redux";
import { setOpenDialog } from "../../redux/movieSlice.js";
import VideoBackground from "./VideoBackground.jsx";

export default function MovieDialog() {
  const {openDialog, id} = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpenDialog(false));
  };

  return (
    <React.Fragment>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogContent>
          <VideoBackground movieId={id} bool={true} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
