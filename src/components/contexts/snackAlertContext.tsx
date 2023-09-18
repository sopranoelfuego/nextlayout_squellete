"use client";
import { SnackbarCloseReason } from "@mui/material";
import React, { useState,useMemo } from "react";
import { domainToASCII } from "url";

export const SnackAlertContext = React.createContext<{
  dialog: { open: boolean; severity: "error" | "info" | "warning" | "success" };
  handleOpenAlert: Function;
  handleCloseAlert: (event: React.SyntheticEvent | Event , reason?: SnackbarCloseReason ) => void;
  // (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => void
}>({
  dialog: { open: false, severity: "info" },
  handleOpenAlert: (lng: string) => null,
  handleCloseAlert: () => null,
});

export default function SnackAlertContextProvider({children}:{children:React.ReactNode}) {
  const [dialog, setDialog] = useState<{ open: boolean; severity: "error" | "info" | "warning" | "success" }>({
    open: false,
    severity: "info",
  });
  const handleOpenAlert = (severity: "error" | "info" | "warning" | "success") => {
    setDialog(dialog=>({...dialog, open: true, severity }));
  };
  const handleCloseAlert = (
    event?: React.SyntheticEvent<any> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setDialog(dialog=>({...dialog, open: false }));

  };
  const value=useMemo(() => ({dialog,handleCloseAlert,handleOpenAlert}), [dialog])

  return <SnackAlertContext.Provider value={value} >
    {children}
  </SnackAlertContext.Provider>
}
