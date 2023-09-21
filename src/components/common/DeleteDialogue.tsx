
import Button  from "@mui/material/Button"
import CircularProgress  from "@mui/material/CircularProgress"
import Dialog  from "@mui/material/Dialog"
import DialogActions  from "@mui/material/DialogActions"
import DialogContent  from "@mui/material/DialogContent"
import DialogTitle  from "@mui/material/DialogTitle"
import DialogContentText  from "@mui/material/DialogContentText"
import { FormattedMessage } from "react-intl"
<<<<<<< HEAD
import { HiOutlineArchive, HiOutlineX } from "react-icons/hi"
=======
>>>>>>> 5ac9b21f06147c28b6096e8a8b5a9038acb811cd

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
    <Dialog open={open} >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        <FormattedMessage id="delete-message"/>
      </DialogTitle>
      <DialogContent />
       <DialogContentText sx={{padding:" 0 3rem"}} id="alert-dialog-description">
            <FormattedMessage id="delete-message-desc"/>
          </DialogContentText>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
<<<<<<< HEAD
          startIcon={deleting ? <CircularProgress size="1rem" /> : <HiOutlineArchive size={23} />}
=======
          startIcon={deleting ? <CircularProgress size="1rem" /> : null}
>>>>>>> 5ac9b21f06147c28b6096e8a8b5a9038acb811cd
          disabled={deleting}
          onClick={handleDelete}
          // style={{ backgroundColor: "red" }}
        >

          <FormattedMessage id="delete-req"/>
        </Button>
        <Button
          onClick={() => handleClose()}
          disabled={deleting}
<<<<<<< HEAD
          startIcon={<HiOutlineX size={23} />}
=======
>>>>>>> 5ac9b21f06147c28b6096e8a8b5a9038acb811cd
          variant="outlined"
        >
          <FormattedMessage id="cancel"/>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
