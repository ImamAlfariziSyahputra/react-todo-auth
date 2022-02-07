import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputText from '../../components/forms/InputText';
import { setSnackbar } from '../../redux/slices/snackbarSlice';
import { login } from '../../redux/slices/authSlice';

const boxStyles = {
  display: 'flex',
  flexDirection: 'column',
};

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const auth = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    // console.log('data => ', data);
    dispatch(login(data))
      .then((res) => {
        if (res.error) throw Error(res.payload);
        dispatch(
          setSnackbar({
            isOpen: true,
            severity: 'success',
            msg: 'Login Success!',
          })
        );
        navigate('/');
      })
      .catch((err) => {
        // console.log('err => ', err.message);
        dispatch(
          setSnackbar({
            isOpen: true,
            severity: 'error',
            msg: `Login Failed: ${err.message}`,
          })
        );
      });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, my: 3, border: '1px solid black' }}>
      <Box sx={boxStyles}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {auth?.error && (
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ color: 'red' }}
          >
            {auth.error}
          </Typography>
        )}
        <InputText label="Enter email..." name="email" control={control} />
        <InputText
          type="password"
          label="Enter password..."
          name="password"
          control={control}
        />
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Box>
    </Paper>
  );
}
