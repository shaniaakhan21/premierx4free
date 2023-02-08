import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
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
}))

export default useStyles