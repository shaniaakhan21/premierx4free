import { Link, Typography, Box } from '@mui/material';
import useStyles from './styles';
import Logo from '../Logo';

function Navbar(): JSX.Element {

	const { classes } = useStyles()
	return (
		<Box className={classes.container}>
			<Link href='/' className={classes.logoContainer}>
				<Logo />
			</Link>
			<Link href='/contact' style={{ textDecoration: 'none' }}>
				<Typography variant='h6' className={classes.link}>
					Contact Us
				</Typography>
			</Link>
		</Box >
	)
}

export default Navbar