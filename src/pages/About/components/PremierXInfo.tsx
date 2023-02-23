import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '../../../utils/makeStyles';

function PremierXInfo(): JSX.Element {
	const { classes } = useStyles()
	return (
		<div className={classes.container}>
			<img src="/assets/svg/Home/landing.svg" />
			<Box style={{ marginTop: '2.5%' }}>
				<Typography variant='h6' className={classes.title}>
					Who is PremierX4Free?
				</Typography>
				<Box className={classes.columns}>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>
								Premierx4Free is a Health and Wellness business sector that allows for Corporations, Unions, Governments, Sole
								Proprietors and just plan ordinary people to realize significant savings in their prescription and healthcare costs. With our vision and experience in the Health and Wellness area, we are confident that we will be able to provide you with better services than you currently have at a significant saving over what you are currently paying.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>
								Everything from daily maintenance meds delivered right to your doorstep for free, to calling US based doctors dedicated to helping YOU and having access to a one-of-a-kind prescription benefits that saves you money on your prescriptions (even pet prescriptions) is made available to you through Premierx4Free’s Prescription Benefits Management Program.
							</Typography>
						</Grid>
					</Grid>
				</Box>

			</Box>
		</div>
	)
}

const useStyles = makeStyles()(() => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'white',
		padding: '6%',
		paddingTop: '1%',
		paddingBottom: '12%',
		'@media screen and (min-width: 768px)': {
		  paddingBottom: '12%',
		},
	  },
	  title: {
		color: '#136DA7',
		fontSize: 50,
		'@media screen and (max-width: 600px)': {
		  fontSize: 30,
		  paddingLeft: '2%',
		},
	  },
	  columns: {
		marginTop: '1%',
		display: 'flex',
		flexWrap: 'wrap',
		'@media screen and (max-width: 600px)': {
		  flexDirection: 'column',
		},
	  },
	  text: {
		color: '#136DA7',
		fontSize: 18,
		textAlign: 'justify',
	  },
}))

export default PremierXInfo