import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from './theme';
import AppRouter from './routes';
import TaggingService from './utils/TaggingService';
import './components/FontawesomeIcons';
import '@fontsource/nunito-sans';
import CookieBanner from './components/cookie';
import axios from "axios";
import { AuthProvider } from "./contexts/auth.context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from 'notistack';

export const muiCache = createCache({
  key: 'premierx-theme',
  prepend: true,
});


function App() {

  useEffect(() => {
    TaggingService.init()
    axios.defaults.baseURL = '/api/v1/'
  }, [])

  return (
    <div className='App'>
      <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'top' }} >
        <AuthProvider>
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={theme}>
              <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  {/*<CookieBanner />*/}
                  <AppRouter />
                </LocalizationProvider>
              </BrowserRouter>
            </ThemeProvider>
          </CacheProvider>
        </AuthProvider>
      </SnackbarProvider>
    </div>
  )
}

export default App
