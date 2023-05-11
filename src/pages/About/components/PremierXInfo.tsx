import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '../../../utils/makeStyles';

function PremierXInfo(): JSX.Element {
	const { classes } = useStyles()
	return (
		<div className={classes.container}>
			<div className={classes.imgContainer}>
				<div className={classes.mission}>
					<h3>OUR MISSION</h3>
					<p>To change the PBM landscape by offering an
						alternative <span className={classes.boldTxt}><b>membership-based program</b></span> with
						transparency, savings and personalized
						solutions.</p>
				</div>
			</div>
			<Box className={classes.columns}>
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

	imgContainer: {
		backgroundImage: "url('/assets/svg/Home/landing.svg')",
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		display: 'flex',
		justifyContent: 'flex-end',
		borderRadius: '25px'
	},

	subtitle: {
		color: '#136DA7!important',
		fontSize: '33px',
		fontWeight: '700',
		lineHeight: 1.2,
		'@media screen and (max-width: 768px)': {
			fontSize: 27,
		},
	},
	columns: {
		margin: '2.5% 16% 0',
		display: 'flex',
		flexWrap: 'wrap',
		'@media screen and (max-width: 768px)': {
			flexDirection: 'column',
			margin: '5%',
		},
	},
	text: {
		color: '#136DA7!important',
		fontSize: 18,
		textAlign: 'justify',
		fontFamily: 'Nunito Sans',
		fontWeight: 400
	},

	mission: {
		width: '32%',
		color: 'white',
		display: 'flex',
		padding: '2% 3%',
		margin: '9%',
		background: 'linear-gradient(210deg, #64B5F6 1.82%, #0556A7 100%)',
		flexDirection: 'column',
		flexWrap: 'nowrap',
		'@media screen and (max-width: 768px)': {
			padding: '5% 3%!important',
			margin: '13%!important',
			width: '100%!important'
		},
		p: {
			fontSize: '22px',
			fontWeight: '100',
			color: '#ffffffd2',
			'@media screen and (max-width: 768px)': {
				fontSize: '17px'
			}

		},
		h3: {
			fontWeight: '900',
		},
	},

	boldTxt: {
		fontWeight: '900!important',
		color: 'white!important'
	}

}))

export default PremierXInfo