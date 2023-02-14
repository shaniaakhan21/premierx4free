import { makeStyles } from "../../utils/makeStyles"

const useStyles = makeStyles()(() => ({
	container: {
		backgroundColor: "#006B92",
	},
	content: {
		paddingTop: '5%',
		paddingBottom: "5%",
		paddingLeft: '10%',
		paddingRight: '10%'
	},
	title: {
		color: "#FFFFFF",
		fontWeight: 700,
		fontSize: 24,
		['@media screen and (min-width: 768px)']: {
			fontSize: 26,
		},
		['@media screen and (min-width: 1024px)']: {
			fontSize: 28,
		},
		['@media screen and (min-width: 1280px)']: {
			fontSize: 30,
		},
		['@media screen and (min-width: 1600px)']: {
			fontSize: 32,
		},
		['@media screen and (min-width: 1930px)']: {
			fontSize: 34,
		}
	}
}))

export default useStyles