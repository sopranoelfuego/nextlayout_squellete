import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type CreateMemberProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CreateMember({ open, setOpen }: CreateMemberProps) {
  //   const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Creér un membre"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ fontWeight: "bold" }}>Nom</InputLabel>
            <TextField fullWidth id="nom" name="firstName" size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ fontWeight: "bold" }}>Prenom</InputLabel>
            <TextField fullWidth id="nom" name="firstName" size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ fontWeight: "bold" }}>Contact</InputLabel>
            <TextField
              fullWidth
              id="nom"
              name="firstName"
              size="small"
              type="tel"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ fontWeight: "bold" }}>Email</InputLabel>
            <TextField
              fullWidth
              id="nom"
              name="firstName"
              type="email"
              size="small"
            />
          </Grid>
          <Grid item xs={12} >
            <InputLabel sx={{ fontWeight: "bold" }}>Password</InputLabel>
            <TextField
              fullWidth
              id="nom"
              name="password"
              type="text"
              size="small"
            />
          </Grid>
          <Grid item xs={12} >
            <InputLabel sx={{ fontWeight: "bold" }}>confirm password</InputLabel>
            <TextField
              fullWidth
              id="nom"
              name="password_confirm"
              type="text"
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Creér</Button>
        <Button onClick={handleClose} autoFocus color="error">
          Anuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}
