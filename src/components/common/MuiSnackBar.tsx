"use client";

import {useContext} from "react"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SnackAlertContext } from "../contexts/snackAlertContext";

export default function MuiSnackBar() {
    const {dialog,handleCloseAlert} = useContext(SnackAlertContext)

  return (
    <Snackbar  anchorOrigin={{ vertical:"top", horizontal:"right" }} open={dialog.open} autoHideDuration={6000} onClose={handleCloseAlert}>
      <Alert onClose={handleCloseAlert} severity={dialog.severity} sx={{ width: "100%" }}>
        {dialog.message}
      </Alert>
    </Snackbar>
  );
}
