<<<<<<< HEAD
;
import Button  from "@mui/material/Button"
import CircularProgress  from "@mui/material/CircularProgress"
import Dialog  from "@mui/material/Dialog"
import DialogActions  from "@mui/material/DialogActions"
import DialogContent  from "@mui/material/DialogContent"
import DialogTitle  from "@mui/material/DialogTitle"
=======
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
>>>>>>> bec97b11628c2faddebb1d98d28b2f219618e956

interface DeleteProps {
  open: boolean;
  deleting: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}
const DeleteDialog = ({
  handleClose,
  open,
  handleDelete,
  deleting,
}: DeleteProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Voulez-vous vraiment le supprimer ?
      </DialogTitle>
      <DialogContent />
      <DialogActions>
        <Button
          variant="contained"
          startIcon={deleting ? <CircularProgress size="1rem" /> : null}
          disabled={deleting}
          onClick={handleDelete}
          style={{ backgroundColor: "red" }}
        >
          Supprimer
        </Button>
        <Button
          onClick={() => handleClose()}
          disabled={deleting}
          variant="contained"
        >
          Abandoner
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
