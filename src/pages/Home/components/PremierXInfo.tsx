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
								Premierx4Free is a Health and Wellness bussiness sector that allows for Corporations, Unions, Governments, Sole
								Proprietors and just plan ordinary people to realize significant savings in their prescription and healthcare costs. With our vision and experience in the Health and Wellness area, we are confident that we will be able to provide you with better services than you currently have at a significant saving over what you are currently paying.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography className={classes.text}>
								Everything from daily maintenance meds delivered right to your doorstep for free, to calling US based doctors dedicated to helping YOU and having access to a one-of-a-kind prescription benefits that saves you money on your prescriptions (even pet prescriptions) is made available to you through PremierxFree’s Prescription Benefits Management Program.
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
		backgroundColor: "#006B92",
		paddingLeft: '2%',
		paddingRight: '2%',
		paddingBottom: 32,
		['@media screen and (min-width: 768px)']: {
			paddingBottom: '2.5%',
		},
	},
	title: {
		color: "#FFFFFF",
		fontSize: 24,
		['@media screen and (max-width: 600px)']: {
			paddingLeft: '2%',
		},
	},
	columns: {
		marginTop: '1%',
		paddingLeft: '2%',
		paddingRight: '2%',
	},
	text: {
		color: "#FFFFFF",
		fontSize: 18,
	}
}))

export default PremierXInfo