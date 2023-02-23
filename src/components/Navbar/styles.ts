import { makeStyles } from "../../utils/makeStyles"

const useStyles = makeStyles()(() => ({

	  container: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding:'2%',
	  },
	  logoContainer: {
		alignSelf: 'flex-start',
		marginTop: '10px',
		marginRight: 'auto',
	  },
	  logo: {
		backgroundColor: '#006B92',
		width: 140,
		['@media screen and (min-width: 768px)']: {
		  width: 150,
		},
		['@media screen and (min-width: 1024px)']: {
		  width: 160,
		},
		['@media screen and (min-width: 1280px)']: {
		  width: 170,
		},
		['@media screen and (min-width: 1600px)']: {
		  width: 200,
		},
		['@media screen and (min-width: 1930px)']: {
		  width: 215,
		},
	  },
	  linkContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
	  },
	  link: {
		color: '#136DA7!important',
		fontWeight: '400!important',
		fontSize: '25!important',
		padding: '10px!important',
		margin: '5px!important',
		'&:hover': {
		  color: 'white!important',
		  backgroundColor: '#00B0F0',
		},
		'&.active': {
		  color: 'white!important',
		  backgroundColor: '#00B0F0',
		},
		marginLeft: '10px',
	  },
	}));
	
	export default useStyles;
	