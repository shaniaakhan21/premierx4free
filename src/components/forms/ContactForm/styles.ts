import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	title: {
		color: "#FFFFFF",
		marginBottom: '5%'
	},
	input: {
		marginBottom: '4%'
	},
	cssOutlinedInput: {
		color: "#FFFFFF",
		'&$cssFocused $notchedOutline': {
			borderColor: '#FFFFFF',
		},
	},
	cssFocused: {
		color: "#FFFFFF",
	},
	notchedOutline: {
		color: "#FFFFFF",
		borderRadius: 0,
		borderWidth: 0,
		borderBottomWidth: 1,
		borderColor: '#FFFFFF',
	},
	submitBtn: {
		marginTop: '15%',
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: "#00B0F0",
		color: "#FFFFFF"
	},
	contactInfo: {
		[theme.breakpoints.down('sm')]: {
			marginTop: 24
		},
		[theme.breakpoints.up('sm')]: {
			paddingLeft: '10%',
		},
	},
	contactInfoTitle: {
		color: "#FFFFFF",
		fontWeight: 700,
		fontSize: 16,
		marginBottom: '5%',
		['@media screen and (min-width: 768px)']: {
			fontSize: 18
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 20
		},
		['@media screen and (min-width: 1280px)']: {
			fontSize: 22
		},
		['@media screen and (min-width: 1600px)']: {
			fontSize: 24
		},
		['@media screen and (min-width: 1930px)']: {
			fontSize: 26
		}
	},
	contactInfoText: {
		color: "#FFFFFF",
		fontWeight: 400,
		fontSize: 14,
		marginBottom: '5%',
		['@media screen and (min-width: 768px)']: {
			fontSize: 16
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 18
		},
		['@media screen and (min-width: 1280px)']: {
			fontSize: 20
		},
		['@media screen and (min-width: 1600px)']: {
			fontSize: 22
		},
		['@media screen and (min-width: 1930px)']: {
			fontSize: 24
		}
	},
	submitEmailContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	submitEmailBtn: {
		backgroundColor: "#00B0F0",
	}
}))

export default useStyles