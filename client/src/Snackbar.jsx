import React, { useContext } from "react";

import { Close } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";

import { SnackbarContext } from "./SnackbarContext";

const Transition = props => <Slide {...props} direction="down" />;

const CustomSnackbar = () => {
  const snackbar = useContext(SnackbarContext);

  return (
    <Snackbar
      autoHideDuration={5000}
      onClose={snackbar.close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={Transition}
      open={snackbar.isOpen}
      message={snackbar.message}
      action={[
        <IconButton key="close" color="inherit" onClick={snackbar.close}>
          <Close />
        </IconButton>,
      ]}
    />
  );
};

export default CustomSnackbar;
