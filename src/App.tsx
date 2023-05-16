import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from './theme';
import AppRouter from './routes';
import TaggingService from './utils/TaggingService';
import './components/FontawesomeIcons';
import '@fontsource/nunito-sans';
import CookieBanner from './components/cookie';

export const muiCache = createCache({
  key: 'premierx-theme',
  prepend: true,
});

function App() {

  useEffect(() => {
    TaggingService.init();
  }, []);

  return (
    <div className='App'>
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CookieBanner />
            <AppRouter />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;
