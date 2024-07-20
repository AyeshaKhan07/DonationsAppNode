import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
      light: '#28A745'
    },
    secondary: {
      main: '#FD7E14',
      light: '#FFC107'
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

export default theme