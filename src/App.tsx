import { BrowserRouter, BrowserRouter as Router, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import AppRouter from './routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
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
