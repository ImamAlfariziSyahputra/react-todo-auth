import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        my: 1,
      }}
    >
      <IconButton>
        <ReplayIcon
          color="primary"
          fontSize="large"
          sx={{ fontSize: '3.5rem' }}
        />
      </IconButton>
      <Typography variant="h6" color="error">
        Error! Something went wrong...
      </Typography>
    </Box>
  );
}
