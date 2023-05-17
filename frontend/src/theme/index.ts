import { createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E5988',
      light: '#0556A7',
    },
    secondary: {
      main: '#4aa9c7',
      light: '#80dbfa',
      dark: '#007a96',
    },
    text: {
      primary: '#000',
      secondary: 'rgba(0,0,0,0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)'
    },
  },
  typography: {
    fontFamily: 'Nunito Sans'
  }
})

export default theme
