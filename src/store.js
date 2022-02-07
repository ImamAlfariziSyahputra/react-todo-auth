import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './redux/slices/snackbarSlice';
import authReducer from './redux/slices/authSlice';
import { todoApi } from './redux/apis/todoApi';

const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export default store;
