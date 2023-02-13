import { useTheme } from '@material-ui/core';
import Footer from '../../components/Footer';
import NSURInfo from './components/NSURInfo';
import Partners from './components/Partners';
import PremierXInfo from './components/PremierXInfo';
import useStyles from './styles';

function HomePage(): JSX.Element {
	const theme = useTheme();
	const classes = useStyles(theme)
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