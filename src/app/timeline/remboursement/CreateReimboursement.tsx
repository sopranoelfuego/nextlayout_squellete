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
import Divider from "@mui/material/Divider";
import { useFormik, FormikHelpers } from "formik";
import { FormattedMessage, useIntl } from "react-intl";

import { IReimbourssementType } from "../../../../types";
import Autocomplete from "@mui/material/Autocomplete";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
import { AuthContext } from "@/components/contexts/authContext";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";

type CreateReimboursementProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reimboursement: IReimbourssementType;
};

interface IOptionValue {
  id: number;
  title: string;
}
export default function CreateContribution({
  open,
  setOpen,
  reimboursement,
}: CreateReimboursementProps) {
  const intl = useIntl();
  const { user } = useContext(AuthContext);

  const { handleOpenAlert } = useContext(SnackAlertContext);

  const [creating, setCreating] = useState(false);
  const [reimboursements, setReimboursements] = useState([]);
  const router = useRouter();
  const [errors, setErrors] = useState({
    montant: "",
    codeTransaction: "",
    membreId: "",
  });
  //   useEffect(() => {
  //     let isSubscriber: boolean = true;

  //     if (isSubscriber)
  //       fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/remboursements`)
  //         .then((res) => res.json())
  //         .then((res) => {
  //           setReimboursements(
  //             res.result?.content?.map((res: IReimbourssementType) => ({
  //               id: res.id,
  //               title: `${res.}` + " " + `${res.prenom}`,
  //             }))
  //           );
  //         })
  //         .catch(() =>
  //           handleOpenAlert("error", <FormattedMessage id="operation-failed" />)
  //         );

  //     return () => {
  //       isSubscriber = false;
  //     };
  //   }, [handleOpenAlert]);

  const validationSchema = () => {
    if (formik.values.codeTransaction.trim() === "") {
      setErrors((_) => ({
        ...errors,
        codeTransaction: intl.formatMessage({ id: "req-field" }),
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
    values: typeof reimboursement,
    resetForm: FormikHelpers<{
      id: number | string | undefined;
      montant: number;
      codeTransaction: string;
      getcreditId: number;
    }>
  ) => {
    let res: any = "";

    setCreating(true);
    try {
      if (reimboursement.id)
        res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_API}/cotisations/${reimboursement.id}`,
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
        res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/cotisations`, {
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
        resetForm.resetForm();

        reimboursement.id
          ? handleOpenAlert("success", <FormattedMessage id="edit-succ" />)
          : handleOpenAlert("success", <FormattedMessage id="create-succ" />);
        handleCloseDialog();
        router.push("/timeline/reimboursement?page=0&size=10");
      }
    } catch (error) {
      setCreating(false);
      handleOpenAlert("error", <FormattedMessage id="operation-failed" />);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: reimboursement?.id,
      montant: reimboursement?.montant!,
      codeTransaction: reimboursement.codeTransaction,
      getcreditId: reimboursement.getcreditId,
    },
    onSubmit: async (values, resetForm) => {
      if (validationSchema()) await handleSubmit(values, resetForm);
    },
  });

  const handleCloseDialog = () => {
    formik.resetForm();
    setErrors({
      montant: "",
      codeTransaction: "",
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
        <FormattedMessage id="create-contr" />
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{display:"flex",justifyContent:"space-between",backgroundColor:"#B9D2D2",padding:"10px",borderRadius:"5px"}}>
            <Stack>
              <Typography fontSize={13}>membre:</Typography>
              <Typography fontWeight="600">Eric MUGABEKAZI</Typography>
            </Stack>
              <Divider orientation="vertical" variant="middle" flexItem />
            <Stack>
              <Typography>credit:</Typography>
              <Typography fontWeight="600">3: reason ehyw</Typography>
            </Stack>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="single_credit" />
              </InputLabel>

              <Autocomplete
                disablePortal
                loading={creating}
                id="combo-box-demo"
                {...formik.getFieldProps("memberId")}
                options={reimboursements}
                getOptionLabel={(option) => option.title}
                sx={{
                  Maxwidth: 300,
                  minWidth: 200,
                  width: { xs: "100%", sm: "auto" },
                }}
                onChange={(e: any, newValue: IOptionValue) => {
                  formik.setFieldValue("membreId", newValue.id);
                }}
                disabled={Boolean(reimboursement.id) || creating}
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
                disabled={Boolean(reimboursement.id) || creating}
                helperText={formik.touched.montant && errors.montant}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="trans-code" />
              </InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("codeTransaction")}
                error={Boolean(errors.codeTransaction)}
                disabled={creating}
                helperText={errors.codeTransaction}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!formik.dirty || creating}>
            {reimboursement.id ? (
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
