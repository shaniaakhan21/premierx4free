import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import useWindowSize from '../../../hooks/useWindowSize';
const BORDER_RADIUS = 16;

function BMAInfo(): JSX.Element {
	const classes = useStyles();
	const window = useWindowSize()

	return (
		<Grid container className={classes.container}>
			<Box style={{ position: 'absolute', height: 20, backgroundColor: '#006B92', width: '100%', zIndex: 1 }} />
			<Grid item xs={12} sm={6} style={{
				zIndex: 2,
			}}>
				<Box className={classes.bmaContainer}>
					<Typography className={classes.bmaTitle}>
						Who is BMA
					</Typography>
					<div className={classes.textSeparator}>
						<Typography className={classes.bmaText}>
							We are a health-centric organization that prides itself on over 20 years of industry expertise and vast national relationships. As a result of this, we specialize in mass marketing and distribution of unparalleled unique product offerings. These offerings include one-of-a-kind non-insurance and scientifically advanced products, many of which were not previously available to our verticals of distribution. Our services do not stop here. Learn more about our Prescription Benefit Program that can help anyone and everyone {'(to save money and have better services)'}
						</Typography>
					</div>
				</Box>
			</Grid>
			<Grid item xs={12} sm={6} style={{
				zIndex: 2, backgroundColor: '#FFFFFF',
				boxShadow: "0px 4px 91px rgba(0,0,0,0.25)",
				borderTopRightRadius: BORDER_RADIUS,
				borderBottomRightRadius: BORDER_RADIUS,
				borderBottomLeftRadius: window.width < 600 ? BORDER_RADIUS : 0
			}}>
				<Box className={classes.infoContainer}>
					<Typography className={classes.infoTitle}>
						What can we do for you
					</Typography>
					<div className={classes.textSeparator}>
						<Typography className={classes.infoText}>
							The power of healthcare cutting-edge advancements and mass distribution thereof, have always worked hand-in-hand toward the rapid delivery, impact, and enrichment of the  of American lives.
						</Typography>
						<Typography className={classes.infoText}>
							What we do is Bridge the Gap between our Partners innovative advancements, our National Distribution Marketers and everyday American’s.
						</Typography>
					</div>
				</Box>
			</Grid>
		</Grid>
	)
}

const useStyles = makeStyles(() => ({
	container: {
		borderBottomRightRadius: BORDER_RADIUS,
		borderTopRightRadius: BORDER_RADIUS,
	},
	bmaContainer: {
		borderTopLeftRadius: BORDER_RADIUS,
		borderBottomLeftRadius: BORDER_RADIUS,
		backgroundColor: "#0E5988",
		boxShadow: "0px 4px 91px rgba(0,0,0,0.25)",
		paddingTop: "5%",
		paddingLeft: 32,
		paddingRight: 32,
		paddingBottom: 32,
		['@media screen and (min-width: 768px)']: {
			paddingBottom: '10%',
			paddingLeft: '10%',
			paddingRight: '10%'
		},
		['@media screen and (max-width: 600px)']: {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
		},
	},
	bmaTitle: {
		color: "#FFFFFF",
		fontWeight: 800,
		fontSize: 24,
		['@media screen and (min-width: 768px)']: {
			fontSize: 28
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 32
		},
	},
	bmaText: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	infoContainer: {
		backgroundColor: "#FFFFFF",
		borderTopRightRadius: BORDER_RADIUS,
		borderBottomRightRadius: BORDER_RADIUS,
		paddingTop: "5%",
		paddingLeft: 32,
		paddingRight: 32,
		paddingBottom: 64,
		['@media screen and (min-width: 768px)']: {
			paddingBottom: '10%',
			paddingLeft: '10%',
			paddingRight: '10%'
		},
		['@media screen and (max-width: 600px)']: {
			borderTopRightRadius: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
		},
	},
	infoTitle: {
		color: "#81CEFF",
		fontWeight: 800,
		fontSize: 24,
		['@media screen and (min-width: 768px)']: {
			fontSize: 28
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 32
		},
	},
	infoText: {
		color: "#136DA7",
		fontSize: 20,
	},
	textSeparator: {
		marginTop: 24,
		['@media screen and (min-width: 1024px)']: {
			fontSize: '5%'
		},
	}
}))

export default BMAInfo