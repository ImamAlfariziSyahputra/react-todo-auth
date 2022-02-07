import { createSlice } from '@reduxjs/toolkit';

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    isOpen: false,
    severity: 'success',
    msg: '',
  },
  reducers: {
    setSnackbar: (state, action) => {
      state.isOpen = action.payload.isOpen;
      state.severity = action.payload.severity;
      state.msg = action.payload.msg;
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
