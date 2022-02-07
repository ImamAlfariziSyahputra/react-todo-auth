import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

export default function InputText({ name, label, control, sx, ...rest }) {
  sx = {
    mb: 2,
    ...sx,
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          label={label}
          value={value}
          error={!!error}
          helperText={error ? error.message : null}
          onChange={onChange}
          fullWidth
          inputRef={ref}
          sx={sx}
          {...rest}
        />
      )}
    />
  );
}
