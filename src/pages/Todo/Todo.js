import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import AddTodo from './AddTodo';
import TodoCard from './TodoCard';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useTodosQuery } from '../../redux/apis/todoApi';

export default function Todo() {
  const { data: todos, error, isLoading, isSuccess, refetch } = useTodosQuery();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    refetch();
  }, [auth?._id, refetch]);

  return (
    <>
      <AddTodo />
      <Paper elevation={3} sx={{ mt: 3, p: 4 }}>
        {todos?.length === 0 ? (
          <Typography variant="h4" align="center" sx={{ mb: 2.5 }}>
            No Todos
          </Typography>
        ) : (
          <Typography variant="h4" align="center" sx={{ mb: 2.5 }}>
            Todo List
          </Typography>
        )}
        {isLoading && <Loading />}
        {isSuccess &&
          todos.map((todo) => <TodoCard key={todo._id} {...todo} />)}
        {error && <Error />}
      </Paper>
    </>
  );
}
