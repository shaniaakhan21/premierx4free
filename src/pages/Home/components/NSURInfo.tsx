import { Grid, Link, makeStyles, Typography } from "@material-ui/core"
import NSURCard from "../../../components/NSURCard";
import useWindowSize from "../../../hooks/useWindowSize";
import { COLLAPSE_THRESHOLD } from "../Home.constants";

function NSURInfo(): JSX.Element {
	const classes = useStyles();
	const windowSize = useWindowSize()
	return (
		<div>
			<div style={{ display: windowSize.width > COLLAPSE_THRESHOLD ? 'none' : 'block' }}>
				<NSURCard />
			</div>
			<div className={classes.top}>
				<div className={classes.topInner}>
					<Typography style={{ color: "#FFFFFF" }}>
						Unlike traditional prescription discount cards that are only available in physical form, NSURx is a digital card that can be downloaded by installing the NSURx app on Google store or Apple Store. It’s free to download and use. With this digital card, users can get up to 80% off on their prescription drugs as well as earn NSUR tokens as a reward for each prescription filled.
					</Typography>
				</div>
			</div>
			<Grid container className={classes.bottom}>
				<div className={classes.nsurCard} style={{ display: windowSize.width <= COLLAPSE_THRESHOLD ? 'none' : 'block' }}>
					<NSURCard />
				</div>
				<Grid item xs={12} md={6} className={classes.nsurCardInfoContainer}>
					<br />
					<Typography align='justify'>
						NSUR Inc. has also build a discount{' '}
						<a href="https://nsurcoin.com/nsurx" style={{ color: "#00B0F0" }}>
							medication calculator
						</a>
						{' '}
						that allows users to check discounts on prescription medication and identify the biggest saving
						at the nearest pharmacies to them. This helps users save even more money on their
						prescription drugs at the closest pharmacies
					</Typography>
				</Grid>
				<Grid item xs={12} md={6} className={classes.nsurShopInfoContainer}>
					<Typography align="justify">
						NSUR Inc. is dedicated to providing an innovative and convenient solution
						for prescription drug savings. By utilizing blockchain technlogy and offering unique rewards,
						NSURx sets itself apart from traditional prescription discount cards. Not only does it provide discounts,
						but it also rewards users with NSUR tokens which can be used to purchase products on{' '}
						<a href="https://nsurcoin.com/shop" style={{ color: "#00B0F0", display: 'inline' }}>
							the NSUR Marketplace
						</a>
					</Typography>
				</Grid>
			</Grid>
		</div >
	)
}

const useStyles = makeStyles((theme) => ({
	top: {
		display: 'flex',
		backgroundColor: '#006B92',
		padding: 24,
		justifyContent: 'center',
		[theme.breakpoints.up('md')]: {
			padding: '5%',
			justifyContent: "flex-end"
		},
	},
	topInner: {
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: "50%"
		},
	},
	bottom: {
		backgroundColor: '#FFFFFF',
		position: 'relative',
		padding: 24,
		paddingTop: 36,
		paddingBottom: 36,
		[theme.breakpoints.up('md')]: {
			paddingLeft: '5%',
			paddingRight: '5%',
			paddingTop: "7.5%",
			paddingBottom: '7.5%'
		},
		['@media screen and (min-width: 1600px)']: {
			paddingTop: "10%",
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
		[theme.breakpoints.up('md')]: {
			paddingLeft: '2.5%',
			paddingRight: '2.5%'
		},
	},
	nsurShopInfoContainer: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '5%',
		},
	}
}))

export default NSURInfo