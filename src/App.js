import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import Navbar from './components/Navbar';
import './App.css';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Todo from './pages/Todo/Todo';
import { Container } from '@mui/material';
import Snackbar from './components/Snackbar';
import { loadUser } from './redux/slices/authSlice';
import RequiredLogin from './components/RequiredLogin';
import AlreadyLogin from './components/AlreadyLogin';
import { baseUrl } from './redux/apiConfig';

Axios.defaults.baseURL = baseUrl;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Snackbar />
      <Navbar />
      <Container maxWidth="sm">
        <Routes>
          <Route
            path="/"
            element={
              <RequiredLogin>
                <Todo />
              </RequiredLogin>
            }
          />
          <Route
            path="login"
            element={
              <AlreadyLogin>
                <Login />
              </AlreadyLogin>
            }
          />
          <Route
            path="register"
            element={
              <AlreadyLogin>
                <Register />
              </AlreadyLogin>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
