import { makeStyles } from "../../utils/makeStyles"

const useStyles = makeStyles()(() => ({
	container: {
		backgroundColor: '#006B92',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		['@media screen and (max-width: 768px)']: {
			paddingTop: 24,
			paddingBottom: 24,
		},
		['@media screen and (min-width: 768px)']: {
			paddingTop: 32,
			paddingBottom: 32,
		},
		['@media screen and (min-width: 1280px)']: {
			paddingTop: 36,
			paddingBottom: 36,
		},
		['@media screen and (min-width: 1930px)']: {
			paddingTop: 48,
			paddingBottom: 48,
		},
		paddingLeft: '2%',
		paddingRight: '2%'
	},
	logoContainer: {
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex'
	},
	logo: {
		width: 140,
		['@media screen and (min-width: 768px)']: {
			width: 150
		},
		['@media screen and (min-width: 1024px)']: {
			width: 160
		},
		['@media screen and (min-width: 1280px)']: {
			width: 170
		},
		['@media screen and (min-width: 1600px)']: {
			width: 200
		},
		['@media screen and (min-width: 1930px)']: {
			width: 215
		}
	},
	link: {
		color: "#FFFFFF"
	}
}))

export default useStyles