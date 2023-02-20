import { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import PartnerChart from '../../../components/PartnerChart';
import useWindowSize from '../../../hooks/useWindowSize';
import { COLLAPSE_THRESHOLD } from '../Home.constants';
import NSURInfo from './NSURInfo';
import { makeStyles } from '../../../utils/makeStyles';

const partellIcon = '/assets/svg/Home/icon-partell-colored.svg'
const bmaIcon = '/assets/svg/Home/icon-bma-colored.svg'
const nsurxIcon = '/assets/svg/Home/icon-nsurx-colored.svg'
const swiftMDIcon = '/assets/svg/Home/icon-swiftmd-colored.svg'

interface InfoProps {
	descriptionVisible: boolean
}

function PartellInfo(props: InfoProps): JSX.Element {
	const { descriptionVisible } = props
	const { classes } = useStyles();

	return (
		<>
			<Typography className={classes.infoTitle}>
				Partell Pharmacy
			</Typography>
			{
				descriptionVisible && (
					<div className={classes.partnerDescription}>
						<Typography className={classes.infoSubtitle}>
							We care about our community
						</Typography>
						<Typography className={classes.infoText}>
							At Partell Pharmacy, we've made it our mission to provide unique and high-quality solutions for physicians and patients with customized, compound medications. We're here to better your health, together.
						</Typography>
					</div>
				)
			}
		</>
	)
}

function BMAInfo(props: InfoProps): JSX.Element {
	const { descriptionVisible } = props
	const { classes } = useStyles();
	const windowSize = useWindowSize()

	return (
		<>

			<Typography className={classes.infoTitle}>
				BM Allies
			</Typography>
			{
				descriptionVisible && (
					<div className={classes.partnerDescription}>
						<Typography className={classes.infoTitle} style={{ textDecoration: 'none' }}>
							Who is BMA
						</Typography>
						<Typography className={classes.infoText}>
							We are a health-centric organization that prides itself on over 20 years of industry expertise and vast national relationships. As a result of this, we specialize in mass marketing and distribution of unparalleled unique product offerings. These offerings include one-of-a-kind non-insurance and scientifically advanced products, many of which were not previously available to our verticals of distribution. Our services do not stop here. Learn more about our Prescription Benefit Program that can help anyone and everyone {`(to save money and have better services)`}
						</Typography>
						{/* <Box style={{ justifyContent: windowSize.width >= COLLAPSE_THRESHOLD ? 'center' : 'left', display: 'flex', marginTop: windowSize.width < COLLAPSE_THRESHOLD ? 24 : 0 }}>
							<Typography className={classes.infoTitle} style={{ textDecoration: 'none' }}>
								What can we do for you
							</Typography>
						</Box>
						<Typography className={classes.infoText}>
							The power of healthcare cutting-edge advancements and mass distribution thereof, have always worked hand-in-hand toward the rapid delivery, impact, and enrichment of the  of American lives.
						</Typography>
						<Typography className={classes.infoText}>
							What we do is Bridge the Gap between our Partners innovative advancements, our National Distribution Marketers and everyday American’s.
						</Typography> */}
					</div>
				)
			}
		</>
	)
}

function NSURXInfo(props: InfoProps): JSX.Element {
	const { descriptionVisible } = props
	const { classes } = useStyles();

	return (
		<>
			<Typography className={classes.infoTitle}>
				NsurX Prescription Savings Card
			</Typography>
			{
				descriptionVisible && (
					<div className={classes.partnerDescription}>
						<Typography className={classes.infoSubtitle} style={{ color: "#136DA7" }}>
							The revolutionary prescription discount
						</Typography>
						<Typography className={classes.infoText}>
							Unlike traditional prescription discount cards that are only available in physical form, NSURx is a digital card that can be downloaded by installing the NSURx app on Google store or Apple Store. It’s free to download and use. With this digital card, users can get up to 80% off on their prescription drugs as well as earn NSUR tokens as a reward for each prescription filled.
						</Typography>
						{/* <Typography className={classes.infoText}>
							NSUR Inc. is dedicated to providing an innovative and convenient solution for prescription drug savings. By utilizing blockchain technology and offering unique rewards, NSURx sets itself apart from traditional prescription discount cards. Not only does it provide discounts, but it also rewards users with NSUR tokens which can be used to purchase products on the NSUR marketplace
						</Typography> */}
					</div>
				)
			}
		</>
	)
}

function SwiftMDInfo(props: InfoProps): JSX.Element {
	const { descriptionVisible } = props
	const { classes } = useStyles();

	return (
		<>
			<Typography className={classes.infoTitle}>
				SwiftMD
			</Typography>
			{
				descriptionVisible && (
					<div className={classes.partnerDescription}>
						<Typography className={classes.infoSubtitle}>
							What difference it from other tele-health services?
						</Typography>
						<Typography className={classes.infoText}>
							We are leading the modernisation of routine medical care for patients and reducing costs for our clients.Here are four ways SwiftMD is different from other platforms.
						</Typography>
						{/* <Typography className={classes.infoText} style={{ marginTop: 32 }}>
							People love our online doctor services.
						</Typography>
						<Typography className={classes.infoText}>
							We have the highest utilisation rate in the telemedicine industry.
						</Typography>
						<Typography className={classes.infoText}>
							Great doctors who work exclusively for SwiftMD.
						</Typography> */}
						<Typography className={classes.infoText}>
							We select the best doctors who are passionate about online healthcare services. They work exclusively with us in telemedicine, and they develop relationships with our members through repeat virtual doctor visits.
						</Typography>
					</div>
				)
			}
		</>
	)
}

function Partners(): JSX.Element {
	const { classes } = useStyles();
	const windowSize = useWindowSize()
	const [hoveredIdx, setHoveredIdx] = useState(-1);
	const isCollapsed = windowSize.width < COLLAPSE_THRESHOLD

	return (
		<div className={classes.container}>
			<div className={classes.titleContainer}>
				<Typography className={classes.title}>
					STRATEGIC PARTNERS FOR PREMIERx4FREE
				</Typography>
			</div>
			<Grid container className={classes.content} style={{ display: isCollapsed ? 'none' : 'flex' }}>
				<Grid item xs={12} lg={5}>
					<Box className={classes.column} style={{ paddingTop: isCollapsed ? 0 : '5%', minHeight: '100%' }}>
						<PartellInfo descriptionVisible={hoveredIdx === 0} />
						<BMAInfo descriptionVisible={hoveredIdx === 1} />
						<SwiftMDInfo descriptionVisible={hoveredIdx === 2} />
						<NSURXInfo descriptionVisible={hoveredIdx === 3} />
					</Box>
				</Grid>
				<Grid item xs={12} lg={7}>
					<Box className={classes.column}>
						<PartnerChart onHover={setHoveredIdx} onHoverEnd={() => setHoveredIdx(-1)} />
					</Box>
				</Grid>
			</Grid>
			<Grid container className={classes.content} style={{ display: isCollapsed ? 'flex' : 'none' }}>
				<Grid item className={classes.row}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={partellIcon} />
					</div>
					<PartellInfo descriptionVisible />
				</Grid>
				<Grid item className={classes.row}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={bmaIcon} />
					</div>
					<BMAInfo descriptionVisible />
				</Grid>
				<Grid item className={classes.row}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={swiftMDIcon} />
					</div>
					<SwiftMDInfo descriptionVisible />
				</Grid>
				<Grid item className={classes.row}>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<img src={nsurxIcon} />
					</div>
					<NSURXInfo descriptionVisible />
				</Grid>
			</Grid>
		</div >
	)
}

const useStyles = makeStyles()(() => ({
	container: {
		backgroundColor: "#FFFFFF",
		background: 'url(/assets/images/partners-bg.png)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		zIndex: 1,
		padding: '3%',
		margin: '2% 4%',
		['@media screen and (min-width: 768px)']: {
			paddingTop: '2.5%',
			paddingBottom: '2.5%',
		},
	},
	titleContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
	},
	title: {
		fontWeight: 800,
		fontSize: 24,
		textAlign: 'center',
		['@media screen and (min-width: 768px)']: {
			fontSize: 32
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 36
		},
	},
	content: {
		marginTop: 24,
		['@media screen and (min-width: 768px)']: {
			marginTop: '2.5%'
		},
	},
	row: {
		marginBottom: 24,
		paddingLeft: 24,
		paddingRight: 24,
	},
	column: {
		paddingLeft: 24,
		paddingRight: 24
	},
	infoTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		['@media screen and (min-width: 768px)']: {
			fontSize: 24
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 28
		},
		color: "#006B92",
		textDecoration: 'underline'
	},
	infoSubtitle: {
		marginTop: 12,
		fontWeight: 800,
		fontSize: 16,
		['@media screen and (min-width: 768px)']: {
			fontSize: 18
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 20
		},
		color: "#136DA7",
	},
	infoText: {
		fontWeight: 400,
		marginTop: 10,
		fontSize: 16,
		['@media screen and (min-width: 768px)']: {
			fontSize: 18
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 20
		},
	},
	partnerDescription: {
		animation: '$fade 1s linear',
	},
	'@keyframes fade': {
		'0%': {
			opacity: 0
		},
		'100%': {
			opacity: 1
		}
	},
}))

export default Partners