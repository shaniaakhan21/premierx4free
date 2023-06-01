import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Partners from './components/Partners'
import PremierXInfo from './components/PremierXInfo'

function HomePage(): JSX.Element {
  return (
    <div>
      <Navbar />
      <PremierXInfo />
      <Partners />
      {/* <NSURInfo /> */}
      <Footer />
    </div>
  )
}

export default HomePage
