import { makeStyles } from "../../utils/makeStyles";

const HOVER_OFFSET = 30;

const useStyles = makeStyles()(() => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
	},
	innerContainer: {
		position: 'absolute',
		alignSelf: 'center',
		width: 300,
		height: 300
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
	},
	ellipseImg: {
		width: 150,
		['@media screen and (min-width: 768px)']: {
			width: 180
		},
		['@media screen and (min-width: 1024px)']: {
			width: 210
		},
		['@media screen and (min-width: 1280px)']: {
			width: 240
		},
		['@media screen and (min-width: 1600px)']: {
			width: 270,
		},
		['@media screen and (min-width: 1930px)']: {
			width: 300
		},
	},
	quarter1: {
		position: "relative",
		display: 'inline-block',
		zIndex: 4,
		top: 7,
		left: 0,
		transition: "ease 0.5s",
		cursor: 'pointer',
		"&:hover": {
			marginTop: -HOVER_OFFSET,
			marginLeft: -HOVER_OFFSET,
			paddingRight: HOVER_OFFSET,
			"& .icon": {
				transform: 'scale(2)',
				backgroundColor: "#49859A",
				top: '25%'
			}
		},
	},
	quarter2: {
		position: "relative",
		zIndex: 3,
		top: 7,
		right: 0,
		transition: "ease 0.5s",
		cursor: 'pointer',
		"&:hover": {
			marginTop: -HOVER_OFFSET,
			paddingLeft: HOVER_OFFSET,
			marginRight: -HOVER_OFFSET,
			"& .icon": {
				transform: 'scale(2)',
				backgroundColor: "#5BADC9",
				top: '25%'
			}
		},
	},
	quarter3: {
		position: "relative",
		bottom: 0,
		left: 0,
		zIndex: 2,
		paddingBottom: HOVER_OFFSET,
		transition: "  ease 0.5s",
		cursor: 'pointer',
		"&:hover": {
			paddingBottom: 0,
			paddingTop: HOVER_OFFSET,
			paddingRight: HOVER_OFFSET,
			marginLeft: -HOVER_OFFSET,
			"& .icon": {
				transform: 'scale(2)',
				backgroundColor: "#00AFEF",
				bottom: '25%'
			}
		},
	},
	quarter4: {
		position: "relative",
		bottom: 0,
		right: 0,
		zIndex: 1,
		paddingBottom: HOVER_OFFSET,
		transition: "  ease 0.5s",
		cursor: 'pointer',
		"&:hover": {
			paddingBottom: 0,
			paddingTop: HOVER_OFFSET,
			paddingLeft: HOVER_OFFSET,
			marginRight: -HOVER_OFFSET,
			"& .icon": {
				transform: 'scale(2)',
				backgroundColor: "#136DA7",
				bottom: '25%'
			}
		},
	},
	icon1: {
		backgroundColor: "transparent",
		transition: "ease 0.5s",
		position: 'absolute',
		top: '30%',
		left: '30%',
		zIndex: 2,
		width: '30%',
		borderRadius: 64,
		// padding: 12,/
	},
	icon2: {
		backgroundColor: "transparent",
		transition: "ease 0.5s",
		position: 'absolute',
		top: '30%',
		right: '30%',
		zIndex: 2,
		width: '30%',
		borderRadius: 64,
		padding: 12,
	},
	icon3: {
		backgroundColor: "transparent",
		transition: "ease 0.5s",
		position: 'absolute',
		bottom: '35%',
		left: '30%',
		zIndex: 2,
		width: '30%',
		borderRadius: 64,
		padding: 12,
	},
	icon4: {
		backgroundColor: "transparent",
		transition: "ease 0.5s",
		position: 'absolute',
		bottom: '35%',
		right: '30%',
		zIndex: 2,
		width: '30%',
		borderRadius: 64,
		padding: 12,
	},
	logoContainer: {
		zIndex: 10,
		position: 'absolute',
		alignSelf: 'center',
		top: '42.5%',
		backgroundColor: '#FFFFFF',
		borderRadius: 48,
		display: 'flex',
		alignItems: 'center',
		padding: 4
	},
	logo: {
		width: 200,
		['@media screen and (min-width: 768px)']: {
			width: 260
		},
		['@media screen and (min-width: 1024px)']: {
			width: 320
		},
		['@media screen and (min-width: 1280px)']: {
			width: 360
		},
		['@media screen and (min-width: 1600px)']: {
			width: 400
		},
		['@media screen and (min-width: 1930px)']: {
			width: 420
		}
	}
}))

export default useStyles