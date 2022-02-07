import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await Axios.post('signup', data);
      //! <JWT token>
      return res?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await Axios.post('signin', data);
      //! <JWT token>
      return res?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: null,
    email: null,
    _id: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
  },
  reducers: {
    loadUser: (state, action) => {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        state.name = user.name;
        state.email = user.email;
        state._id = user._id;
      }
    },
    logout: (state, action) => {
      localStorage.removeItem('token');
      state.token = null;
      state.name = null;
      state.email = null;
      state._id = null;
    },
  },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.isLoading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);

      const user = jwtDecode(action.payload);
      state.name = user.name;
      state.email = user.email;
      state._id = user._id;
    },
    [register.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // throw Error(action.payload);
    },
    [login.pending]: (state, action) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);

      const user = jwtDecode(action.payload);
      state.name = user.name;
      state.email = user.email;
      state._id = user._id;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // throw Error(action.payload);
    },
  },
});

export const { loadUser, logout } = authSlice.actions;

export default authSlice.reducer;
