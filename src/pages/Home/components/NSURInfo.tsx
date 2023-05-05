import { Grid, Typography } from "@mui/material"
import NSURCard from "../../../components/NSURCard";
import useWindowSize from "../../../hooks/useWindowSize";
import { makeStyles } from "../../../utils/makeStyles";
import { COLLAPSE_THRESHOLD } from "../Home.constants";

function NSURInfo(): JSX.Element {
	const { classes } = useStyles();
	const windowSize = useWindowSize()
	return (
		<div>
			<div style={{ display: windowSize.width > COLLAPSE_THRESHOLD ? 'none' : 'block', backgroundColor: '#FFFFFF' }}>
				<NSURCard />
			</div>
			<div className={classes.top}>
				<div className={classes.topInner}>
					<Typography className={classes.descriptionText}>
						NSUR Inc. has also build a discount{' '}
						<a href="https://nsurcoin.com/nsurx" style={{ color: "#64B5F6" }}>
							medication calculator
						</a>
						{' '}
						that allows users to check discounts on prescription medication and identify the biggest saving
						at the nearest pharmacies to them. This helps users save even more money on their
						prescription drugs at the closest pharmacies
					</Typography>
				</div>
			</div>
			<Grid container className={classes.bottom}>
				<div className={classes.nsurCard} style={{ display: windowSize.width <= COLLAPSE_THRESHOLD ? 'none' : 'block' }}>
					<NSURCard />
				</div>
			</Grid>
		</div>
	)
}

const useStyles = makeStyles()((theme) => ({
	top: {
		display: 'flex',
		padding: 24,
		justifyContent: 'center',
		[`@media screen and (min-width: ${COLLAPSE_THRESHOLD}px)`]: {
			backgroundColor: '#0556A7',
			padding: '5%',
			justifyContent: "flex-end"
		},
	},
	topInner: {
		width: '100%',
		[`@media screen and (min-width: ${COLLAPSE_THRESHOLD}px)`]: {
			width: "50%"
		},
	},
	bottom: {
		backgroundColor: '#FFFFFF',
		position: 'relative',
		[`@media screen and (min-width: ${COLLAPSE_THRESHOLD}px)`]: {
			paddingLeft: '5%',
			paddingRight: '5%',
			paddingTop: "7.5%",
			paddingBottom: '5%'
		},
		['@media screen and (min-width: 1600px)']: {
			paddingTop: "5%",
			paddingBottom: '10%'
		},
	},
	nsurCard: {
		position: 'absolute',
		top: -160,
		left: '6%',
		width: '40%',
		maxWidth: 800,
		['@media screen and (min-width: 1068px)']: {
			width: '40%',
			top: -200
		},
		['@media screen and (min-width: 1280px)']: {
			top: -220
		},
		['@media screen and (min-width: 1600px)']: {
			width: '40%',
			top: -240
		},

	},
	nsurCardInfoContainer: {
		[`@media screen and (min-width: ${COLLAPSE_THRESHOLD}px)`]: {
			paddingLeft: '2.5%',
			paddingRight: '2.5%'
		},
	},
	nsurShopInfoContainer: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '5%',
		},
	},
	descriptionText: {
		color: "#000000",
		[`@media screen and (min-width: ${COLLAPSE_THRESHOLD}px)`]: {
			color: "#FFFFFF"
		},
	}
}))

export default NSURInfo