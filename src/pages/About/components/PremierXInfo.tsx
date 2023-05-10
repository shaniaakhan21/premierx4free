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
							</Typography><br></br>
							<Typography variant='h6' className={classes.subtitle} >
								PremieRx4Free's Health Management Program:
							</Typography>
							<div className={classes.text}>
								<ul>
									<li>90-day supply of maintenance medications delivered directly to your doorstep. </li>
									<li>Unlimited access to US based telehealth services with no copays or additional cost.</li>
									<li>Prescription discount card for all brick and mortar pharmacies.</li>
								</ul>
							</div><br></br>
							<Typography variant='h6' className={classes.subtitle} >
								Why Choose PremieRx4Free?
							</Typography>
							<Typography className={classes.text}>
								PremieRx4Free can save you and your company more than 50% on your Prescription Benefit Management Program (“PBMP”). The average employer cost for their PBMP is $130- $180 per month per employee (bundled into total employee health insurance premium).

								These costs can increase annually regardless of employee/employer specific utilization. PremieRx4Free can offer a better PBMP to employees for less than half the cost of a bundled insurance program.
							</Typography><br></br>
							<Typography variant='h6' className={classes.subtitle} >
								What are the Cost and Benefits for Employees/ Members?
							</Typography>
							<div className={classes.text}>
								Monthly Membership Fee - $59.95 <br></br>
								Our membership fee includes access to the following:<br></br>
								<ul>
									<li>Free prescription delivery to your doorstep every 90 days (Choose from the top 1088 most prescribed generic medications) </li>
									<li>No other hidden costs or expenses.</li>
									<li>Every member receives an NSURx prescription benefit card for additional savings on your prescriptions in person.</li>
									<li>24/7 access to US based telehealth services with 100% dedicated doctors on call for your consultation needs.</li>
								</ul>
							</div>

						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='h6' className={classes.subtitle} >
								Premier-Rx Prescription Benefit Management Program:
							</Typography><br></br>
							<Typography className={classes.text}>
								Premier-Rx is a less-expensive, more effective alternative to your current PBM program. We offer substantial savings to companies,
								unions and member groups’ on their prescription and health-care costs by providing a membership-based program that offers a 100%
								seamless transition, complete transparency and personalized solutions for your complete prescription benefit needs.
							</Typography><br></br>
							<Typography variant='h6' className={classes.subtitle} >
								How We Do It?
							</Typography>
							<div className={classes.text}>
								<ul>
									<li>Your current PBM is charging you between $130-180 per person per month for your PBM benefits package. Premier-Rx has a monthly membership-based fee of just $59.95 per person per month with more benefits, comparable Brand pricing, and no additional hidden fees or costs as compared to your current PBM.</li>
									<li>Premier-Rx has developed a formulary of 1100 generic drugs that are free and will be delivered to your employee/members doorstep at NO cost to them in 90-day supplies (NO co-pay and NO shipping costs). </li>
									<li>Drug brand prices through Premier-Rx partners have been secured at prices that are comparable to your current PBM.</li>
									<li>Premier-Rx will maximize your Branded drug rebates and make sure the process for those rebates is transparent and in full disclosure passing along 100% of the savings to you. </li>
									<li>Premier-Rx will save you substantially on your current out-of-pocket drug spend. (Premier-Rx has completed several drug spend analysis for various companies/groups and all are showing an approximate 20% savings on their out-of-pocket drug spends).</li>
									<li>Premier-Rx exclusive tele-medicine partner offers 24/7 unlimited access to 100% dedicated doctors trained in the US. We will save your members both time and money on acquiring their prescriptions. Additionally, significant savings will be realized in fewer doctors, urgent care and emergency room visits. </li>
									<li>Every member of Premier-Rx receives a NSURx prescription benefit card powered by Single Care that allows for additional savings on their prescriptions that are picked-up at their local pharmacy. </li>
								</ul>
							</div>
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
		color: '#136DA7!important',
		fontSize: 33,
		fontWeight:'700',
		lineHeight: 1.2,
		'@media screen and (max-width: 600px)': {
			fontSize: 27,
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
		color: '#136DA7!important',
		fontSize: 18,
		textAlign: 'justify',
		fontFamily: 'Nunito Sans',
    	fontWeight: 400
	},

}))

export default PremierXInfo