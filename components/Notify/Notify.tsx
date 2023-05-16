import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { unsetNotify } from "../../redux/notifySlice";

type NotifyProps = {};

const Notify = () => {
  const dispatch = useDispatch();
  const { isOpen, message, type } = useSelector((state: any) => state.notify);

  const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    dispatch(unsetNotify());
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        elevation={3}
        severity={type}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notify;
