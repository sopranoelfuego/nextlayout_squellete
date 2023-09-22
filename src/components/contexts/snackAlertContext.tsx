"use client";
import { SnackbarCloseReason } from "@mui/material";
import React, { useState,useMemo } from "react";


export const SnackAlertContext = React.createContext<{
  dialog: { open: boolean; message:string,severity: "error" | "info" | "warning" | "success" };
  handleOpenAlert: Function;
  handleCloseAlert: (event: React.SyntheticEvent | Event , reason?: SnackbarCloseReason ) => void;
  // (event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => void
}>({
  dialog: { open: false, message:"",severity: "info" },
  handleOpenAlert: (lng: string) => null,
  handleCloseAlert: () => null,
});

export default function SnackAlertContextProvider({children}:{children:React.ReactNode}) {
  const [dialog, setDialog] = useState<{ open: boolean ,message:string,severity: "error" | "info" | "warning" | "success" }>({
    open: false,
    message:"",
    severity: "info",
  });
  const handleOpenAlert = (severity: "error" | "info" | "warning" | "success",message:string) => {
    setDialog(dialog=>({...dialog, open: true,message, severity }));
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
