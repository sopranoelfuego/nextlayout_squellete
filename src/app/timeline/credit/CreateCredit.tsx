"use client";
import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik, FormikHelpers } from "formik";
import { FormattedMessage, useIntl } from "react-intl";

import { ICreditType, MemberType } from "../../../../types";

import Autocomplete from "@mui/material/Autocomplete";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
import { AuthContext } from "@/components/contexts/authContext";
import { useRouter } from "next/navigation";

type CreateCreditProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  credit: ICreditType;
};

interface IOptionValue {
  id: number;
  title: string;
}
export default function CreateCredit({
  open,
  setOpen,
  credit,
}: CreateCreditProps) {
  const intl = useIntl();
  const { user } = useContext(AuthContext);

  const { handleOpenAlert } = useContext(SnackAlertContext);

  const [creating, setCreating] = useState(false);
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const [errors, setErrors] = useState({
    montant: "",
    motif: "",
    membreId: "",
  });
  useEffect(() => {
    let isSubscriber: boolean = true;

    if (isSubscriber)
      fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/membres`)
        .then((res) => res.json())
        .then((res) => {
          setMembers(
            res.result?.content?.map((res: MemberType) => ({
              id: res.id,
              title: `${res.nom}` + " " + `${res.prenom}`,
            }))
          );
        })
        .catch(() =>
          handleOpenAlert("error", <FormattedMessage id="operation-failed" />)
        );

    return () => {
      isSubscriber = false;
    };
  }, [handleOpenAlert]);

  const validationSchema = () => {
    if (formik.values.motif.trim() === "") {
      setErrors((_) => ({
        ...errors,
        motif: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.montant === 0) {
      setErrors((_) => ({
        ...errors,
        montant: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }

    return true;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (
    values: typeof credit,
    resetForm: FormikHelpers<{
      id: number | string | undefined;
      montant: number;
      motif: string;
      membreId: number;
    }>
  ) => {
    let res: any = "";

    setCreating(true);
    try {
      if (credit.id)
        res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_API}/credits/${credit.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(values),
          }
        );
      else
        res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/credits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(values),
        });
      // cb()
      const data = await res.json();
      setCreating(false);
      if (!data?.success) {
          handleOpenAlert("info", data?.message);
      } else {
          credit.id
          ? handleOpenAlert("success", <FormattedMessage id="edit-succ" />)
          : handleOpenAlert("success", <FormattedMessage id="create-succ" />);
          handleCloseDialog();
          resetForm.resetForm();
        router.push("/timeline/credit?page=0&size=10");
      }
    } catch (error) {
      setCreating(false);
      handleOpenAlert("error", <FormattedMessage id="operation-failed" />);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: credit?.id,
      montant: credit.montant,
      motif: credit.motif,
      membreId: credit.membreId,
    },

    onSubmit: async (values, resetForm) => {
      console.log("Values:", values);
      if (validationSchema()) await handleSubmit(values, resetForm);
    },
  });

  const handleCloseDialog = () => {
    formik.resetForm();
    setErrors({
      montant: "",
      motif: "",
      membreId: "",
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
      <DialogTitle id="alert-dialog-title">
        <FormattedMessage id="create-credit" />
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="single_member" />
              </InputLabel>

              <Autocomplete
                disablePortal
                loading={creating}
                id="combo-box-demo"
                {...formik.getFieldProps("memberId")}
                options={members}
                getOptionLabel={(option) => option.title}
                sx={{
                  Maxwidth: 300,
                  minWidth: 200,
                  width: { xs: "100%", sm: "auto" },
                }}
                onChange={(e: any, newValue: IOptionValue) => {
                  formik.setFieldValue("membreId", newValue.id);
                }}
                aria-required
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="montant" />
              </InputLabel>
              <TextField
                fullWidth
                type="number"
                id="nom"
                {...formik.getFieldProps("montant")}
                error={Boolean(errors.montant)}
                helperText={formik.touched.montant && errors.montant}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              {/* 
                 montant: 0;
  motif: string;
  dateCredit?:  Date;
  etat?: number;
  membreId: number;
  status?: string;
                 */}
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="motif" />
              </InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("motif")}
                error={Boolean(errors.motif)}
                helperText={errors.motif}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!formik.dirty || creating}>
            {credit.id ? (
              <FormattedMessage id="edit" />
            ) : (
              <FormattedMessage id="create" />
            )}
          </Button>
          <Button
            onClick={handleCloseDialog}
            disabled={creating}
            autoFocus
            color="error"
          >
            <FormattedMessage id="cancel" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
