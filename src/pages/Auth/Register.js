import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputText from '../../components/forms/InputText';
import { setSnackbar } from '../../redux/slices/snackbarSlice';
import { register } from '../../redux/slices/authSlice';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Password Confirmation does not match!')
    .required('Password Confirmation is required'),
});

export default function Register() {
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
    dispatch(register(data))
      .then((res) => {
        if (res.error) throw Error(res.payload);
        dispatch(
          setSnackbar({
            isOpen: true,
            severity: 'success',
            msg: 'Register Success!',
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
            msg: `Register Failed: ${err.message}`,
          })
        );
      });
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, my: 3, border: '1px solid black' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
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
        <InputText label="Enter name..." name="name" control={control} />
        <InputText label="Enter email..." name="email" control={control} />
        <InputText
          type="password"
          label="Enter password..."
          name="password"
          control={control}
        />
        <InputText
          type="password"
          label="Enter password..."
          name="passwordConfirmation"
          control={control}
        />
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Box>
    </Paper>
  );
}
