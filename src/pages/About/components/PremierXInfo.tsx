import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '../../../utils/makeStyles';

function PremierXInfo(): JSX.Element {
	const { classes } = useStyles()
	return (
		<div className={classes.container}>
			<img src="/assets/svg/Home/landing.svg" />
			<Box style={{ marginTop: '2.5%' }}>
				<Box className={classes.columns}>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<Typography variant='h6' className={classes.subtitle} >
							How Can PremieRx4Free Work for You?
							</Typography>
							<Typography className={classes.text}>
							PremieRx4Free saves corporations, unions, governments, sole proprietors and individuals more than 50% on their prescription and healthcare costs. PR4F is confident that we will provide you better services at a significant savings over what you are currently paying.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
						<Typography variant='h6' className={classes.subtitle} >
							PremieRx4Free's Health Management Program:
							</Typography>
							<Typography className={classes.text}>
								<ul>
									<li>90-day supply of maintenance medications delivered directly to your doorstep. </li>
									<li>Unlimited access to US based telehealth services with no copays or additional cost.</li>
									<li>Prescription discount card for all brick and mortar pharmacies.</li>
								</ul>
							</Typography>
						</Grid>
					</Grid>
				</Box>

			</Box>
			<Box style={{ marginTop: '2.5%' }}>
				<Box className={classes.columns}>
					<Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<Typography variant='h6' className={classes.subtitle} >
							Why Choose PremieRx4Free?
							</Typography>
							<Typography className={classes.text}>
							PremieRx4Free can save you and your company more than 50% on your Prescription Benefit Management Program (“PBMP”). The average employer cost for their PBMP is $130- $180 per month per employee (bundled into total employee health insurance premium).

							These costs can increase annually regardless of employee/employer specific utilization. PremieRx4Free can offer a better PBMP to employees for less than half the cost of a bundled insurance program.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='h6' className={classes.subtitle} >
							What are the Cost and Benefits for Employees/ Members?
							</Typography>
							<Typography className={classes.text}>
							Monthly Membership Fee - $59.95 <br></br>
							Our membership fee includes access to the following:<br></br>
								<ul>
									<li>Free prescription delivery to your doorstep every 90 days (Choose from the top 1088 most prescribed generic medications) </li>
									<li>No other hidden costs or expenses.</li>
									<li>Every member receives an NSURx prescription benefit card for additional savings on your prescriptions in person.</li>
									<li>24/7 access to US based telehealth services with 100% dedicated doctors on call for your consultation needs.</li>
								</ul>
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
		padding: '3%',
		paddingTop: '1%',
		paddingBottom: '4%',
		'@media screen and (min-width: 768px)': {
		  paddingBottom: '4%',
		},
	  },
	  subtitle: {
		color: '#136DA7',
		fontSize: 33,
		lineHeight:1.4,
		'@media screen and (max-width: 600px)': {
		  fontSize:27,
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