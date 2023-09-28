import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { TransitionProps } from "@mui/material/transitions";
import { FormattedMessage } from "react-intl";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface IProps {
  message: string;
  title: string;
  open: boolean;
  handleClose: () => void;
  handleOperation: () => void;
  loading: boolean;
}
export default function ValidateOrRejectDialog({
  message,
  title,
  open,
  handleClose,
  handleOperation,
  loading,
}: IProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      
      <Button
        onClick={() => handleClose()}
        size="small"
        disabled={loading}
        startIcon={<HiOutlineX size={18} />}
        variant="outlined"
      >
        <FormattedMessage id="cancel" />
      </Button>
      <Button
        variant="outlined"
        size="small"
        color="error"
        startIcon={
          loading ? (
            <CircularProgress size="1rem"  />
          ) : (
            <HiOutlineCheck size={18} />
          )
        }
        disabled={loading}
        onClick={handleOperation}
        // style={{ backgroundColor: "red" }}
      >
        <FormattedMessage id="agree" />
      </Button>
       
      </DialogActions>
    </Dialog>
  );
}
