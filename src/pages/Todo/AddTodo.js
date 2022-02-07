import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import InputText from '../../components/forms/InputText';
import { setSnackbar } from '../../redux/slices/snackbarSlice';
import { useAddTodoMutation } from '../../redux/apis/todoApi';
import { useEffect } from 'react';

const defaultValues = {
  name: '',
  isComplete: false,
  author: '',
  uid: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Todo is required'),
  isComplete: Yup.boolean(),
});

export default function AddTodo() {
  const dispatch = useDispatch();
  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const [addTodo] = useAddTodoMutation();

  const auth = useSelector((state) => state.auth);

  // console.log('auth => ', auth ? auth : null);

  const onSubmit = async (data) => {
    setValue('name', '');
    // console.log('data => ', data);
    try {
      await addTodo(data).unwrap();
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'success',
          msg: 'Add Todo Success!',
        })
      );
    } catch (err) {
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'error',
          msg: `Add Todo Failed: ${err.message}`,
        })
      );
    }
  };

  useEffect(() => {
    setValue('author', auth?.name);
    setValue('uid', auth?._id);
  }, [setValue, auth]);

  return (
    <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
      <Box sx={{ display: 'flex' }}>
        <InputText
          name="name"
          label="Enter todo..."
          control={control}
          sx={{ mr: 2 }}
        />
        <Box>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting}
            sx={{ px: 3, py: 2 }}
          >
            <SendIcon />
          </LoadingButton>
        </Box>
      </Box>
    </Paper>
  );
}
