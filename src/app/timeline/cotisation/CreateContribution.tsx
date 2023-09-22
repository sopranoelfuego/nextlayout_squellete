"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";

import { HiUser,HiUserAdd,HiCash } from "react-icons/hi";

import onHandleSubmit from "@/app/actions/serverActionMember"
import { CotisationType } from "../../../../types";
import  Stack  from "@mui/material/Stack";
import  Typography  from "@mui/material/Typography";
import  Autocomplete  from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers";
type CreateMemberProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cotisation:CotisationType
};
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];
export default function CreateContribution({ open, setOpen,cotisation }: CreateMemberProps) {
  //   const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const [errors, setErrors] = useState({
    cotisation: "",
    montant: "",
    contact: "",
    email: "",
    password: "",
  });
  const validationSchema = () => {
    if (formik.values.codeTransaction.trim() === "") {
      setErrors((_) => ({
        ...errors,
        cotisation: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.codeTransaction.trim() === "") {
      setErrors((_) => ({
        ...errors,
        cotisation: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
 
    
    return true;
  };
  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      id:cotisation.id,
      montant:cotisation.montant,
  codeTransaction: cotisation.codeTransaction,
  membreId: cotisation.membreId
     
    },
    onSubmit:async(values,resetForm)=>{
      if(validationSchema())
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_API}/membres/${cotisation.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        // cb()
        // revalidateTag('members')
      } catch (error) {
        alert(`error:${error}`);
      }
      //  await onHandleSubmit({values,cotisation,cb:resetForm})
    }
    
  });


  const handleCloseDialog = () => {
    formik.resetForm();
    setErrors({
      cotisation: "",
      montant: "",
      contact: "",
      email: "",
      password: "",
      
    });
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Creér un membre"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight="600" color="#252528">
            <FormattedMessage id="single_member" />
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{
              Maxwidth: 300,
              minWidth: 200,
              width: { xs: "100%", sm: "auto" },
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" />
            )}
          />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}><FormattedMessage id="montant"/></InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("montant")}
                error={Boolean(errors.montant)}
                helperText={formik.touched.montant && errors.montant}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}><FormattedMessage id="trans-code"/></InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("contact")}
                error={Boolean(errors.contact)}
                helperText={errors.contact}
                size="small"
                type="tel"
              />
            </Grid>
          
           </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!formik.dirty}>
            {cotisation.id?<FormattedMessage id="edit" />:<FormattedMessage id="create" />}
            
          </Button>
          <Button onClick={handleCloseDialog} autoFocus color="error">
            <FormattedMessage id="cancel" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
