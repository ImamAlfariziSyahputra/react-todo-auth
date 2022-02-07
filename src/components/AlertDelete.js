import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { setSnackbar } from '../redux/slices/snackbarSlice';
import { useDeleteTodoMutation } from '../redux/apis/todoApi';

export default function AlertDialog({ id, name }) {
  const dispatch = useDispatch();
  const methods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [deleteTodo] = useDeleteTodoMutation();

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTodo(id).unwrap();
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'success',
          msg: 'Delete Todo Success!',
        })
      );
      setOpen(false);
    } catch (err) {
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'error',
          msg: `Failed to Delete a Todo: ${err.data}`,
        })
      );
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        <DeleteIcon color="error" />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          Are u sure want to remove {name}?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(false)}
            sx={{ mr: 1 }}
          >
            Disagree
          </Button>
          <LoadingButton
            variant="contained"
            autoFocus
            onClick={handleSubmit(handleDelete)}
            loading={isSubmitting}
          >
            Agree
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
