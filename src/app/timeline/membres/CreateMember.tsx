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
import { MemberType } from "@/types";

type CreateMemberProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  member:MemberType
};
export default function CreateMember({ open, setOpen,member }: CreateMemberProps) {
  //   const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    contact: "",
    email: "",
    password: "",
  });
  const validationSchema = () => {
    if (formik.values.nom.trim() === "") {
      setErrors((_) => ({
        ...errors,
        nom: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.prenom.trim() === "") {
      setErrors((_) => ({
        ...errors,
        prenom: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.contact.trim() === "") {
      setErrors((_) => ({
        ...errors,
        contact: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.email.trim() === "") {
      setErrors((_) => ({
        ...errors,
        email: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.password.trim() === "") {
      setErrors((_) => ({
        ...errors,
        password: intl.formatMessage({ id: "req-field" }),
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
      id:member.id,
      nom: member.nom,
      prenom: member.prenom,
      contact: member.contact,
      email: member.email,
      password: member.password,
    },
    onSubmit: async (values) => {
      if (validationSchema()) {
        setErrors({
          nom: "",
          prenom: "",
          contact: "",
          email: "",
          password: "",
        });

        try {
          await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/membres`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
        } catch (error) {
          alert(`error:${error}`);
        }

        console.log(formik.values);
      }
    },
  });

  const handleCloseDialog = () => {
    formik.resetForm();
    setErrors({
      nom: "",
      prenom: "",
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
              <InputLabel sx={{ fontWeight: "bold" }}><FormattedMessage id="nom"/></InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("nom")}
                error={Boolean(errors.nom)}
                helperText={errors.nom}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}><FormattedMessage id="prenom"/></InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("prenom")}
                error={Boolean(errors.prenom)}
                helperText={formik.touched.prenom && errors.prenom}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}><FormattedMessage id="contact"/></InputLabel>
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
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>Email</InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("email")}
                error={Boolean(errors.email)}
                helperText={errors.email}
                type="email"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>Password</InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("password")}
                error={Boolean(errors.password)}
                helperText={errors.password}
                type="text"
                size="small"
              />
            </Grid>
            {/* <Grid item xs={12} >
            <InputLabel sx={{ fontWeight: "bold" }}>confirm password</InputLabel>
            <TextField
              fullWidth
              id="nom"
              name="password_confirm"
              type="text"
              size="small"
            />
          </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!formik.dirty}>
            {member.id?<FormattedMessage id="edit" />:<FormattedMessage id="create" />}
            
          </Button>
          <Button onClick={handleCloseDialog} autoFocus color="error">
            <FormattedMessage id="cancel" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
