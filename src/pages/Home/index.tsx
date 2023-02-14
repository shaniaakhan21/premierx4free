import Footer from '../../components/Footer';
import Partners from './components/Partners';
import PremierXInfo from './components/PremierXInfo';

function HomePage(): JSX.Element {
	return (
		<div>
			<PremierXInfo />
			<Partners />
			{/* <NSURInfo /> */}
			<Footer />
		</div>
	)
}

export default HomePage