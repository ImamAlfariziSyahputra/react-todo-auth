import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';
import { Paper, Typography, Box, ButtonGroup } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingButton } from '@mui/lab';
import InputText from '../../components/forms/InputText';
import { setSnackbar } from '../../redux/slices/snackbarSlice';
import {
  useEditTodoMutation,
  useEditTodoIsCompleteMutation,
} from '../../redux/apis/todoApi';
import AlertDialog from '../../components/AlertDelete';

const defaultValues = {
  name: '',
  author: '',
  isComplete: false,
  uid: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Todo is required'),
  author: Yup.string(),
  isComplete: Yup.boolean(),
});

export default function Todo({ _id, name, author, isComplete, date }) {
  const dispatch = useDispatch();
  const methods = useForm({
    mode: 'all',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [editTodo] = useEditTodoMutation();
  const [editTodoIsComplete] = useEditTodoIsCompleteMutation();

  const [editMode, setEditMode] = useState(false);
  const auth = useSelector((state) => state.auth);

  const onSaveUpdate = async (data) => {
    // console.log('data => ', data);
    setEditMode(false);
    try {
      await editTodo({ data, id: _id }).unwrap();
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'success',
          msg: 'Update Todo Success!',
        })
      );
    } catch (err) {
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'error',
          msg: `Update Todo Failed: ${err.data}`,
        })
      );
    }
  };

  const handleEditIsComplete = async () => {
    setEditMode(false);
    try {
      await editTodoIsComplete({
        data: { isComplete: !isComplete },
        id: _id,
      }).unwrap();
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'success',
          msg: 'Complete a todo Success!',
        })
      );
    } catch (err) {
      dispatch(
        setSnackbar({
          isOpen: true,
          severity: 'error',
          msg: `Error to Complete a todo: ${err.data}`,
        })
      );
    }
  };

  useEffect(() => {
    setValue('name', name);
    setValue('author', author);
    setValue('isComplete', isComplete);
    setValue('uid', auth?._id);
  }, [setValue, name, author, isComplete, auth]);

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 2, border: '1px solid black' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {editMode ? (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <InputText
                label="Enter name..."
                name="name"
                control={control}
                sx={{ mb: 0.5 }}
              />
              <Box sx={{ alignSelf: 'self-end' }}>
                <LoadingButton
                  variant="contained"
                  loading={isSubmitting}
                  onClick={handleSubmit(onSaveUpdate)}
                >
                  Save
                </LoadingButton>
              </Box>
            </Box>
          ) : (
            <Typography
              variant="h6"
              sx={{ textDecoration: isComplete ? 'line-through' : null }}
            >
              {name}
            </Typography>
          )}
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Author: {author}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Added: {moment(date).fromNow()}
          </Typography>
        </Box>
        <Box>
          <ButtonGroup variant="outlined" size="small">
            <LoadingButton variant="outlined" onClick={handleEditIsComplete}>
              <CheckCircleIcon
                sx={{ color: isComplete ? 'primary.main' : 'text.secondary' }}
              />
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              onClick={() => setEditMode(!editMode)}
            >
              <EditIcon sx={{ color: 'success.light' }} />
            </LoadingButton>
            <AlertDialog id={_id} name={name} />
          </ButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
}
