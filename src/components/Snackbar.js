import { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { setSnackbar } from '../redux/slices/snackbarSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarBox() {
  const dispatch = useDispatch();
  const { isOpen, severity, msg } = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setSnackbar({ isOpen: false }));
  };

  return (
    <MuiSnackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </MuiSnackbar>
  );
}
