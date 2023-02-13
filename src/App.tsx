import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import AppRouter from './routes'
import Navbar from './components/Navbar'
import TaggingService from './utils/TaggingService'

function App() {

  useEffect(() => {
    TaggingService.init()
  }, [])

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <AppRouter />
          {/* <Footer /> */}
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
