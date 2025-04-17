import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 2000,  // Changed from default 1536px to 2000px
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (min-width: 2000px)': {  // Changed from 1200px to 2000px
            maxWidth: '100%',
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  },
});

export default theme; 