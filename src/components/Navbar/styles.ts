import { makeStyles } from "../../utils/makeStyles"

const useStyles = makeStyles()(() => ({

	  container: {
		padding:'1%!important',
		maxWidth: '100%!important',
		margin: '0 15%!important',
		'@media (max-width:600px)': {
			padding:'4%!important',
		},
	  },
	  logoContainer: {
		alignSelf: 'flex-start',
		marginTop: '10px',
		marginRight: 'auto',
	  },
	  logo: {
		backgroundColor: '#0556A7',
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
		padding: '10px!important',
		margin: '5px!important',
		'&:hover': {
		  color: 'white!important',
		  backgroundColor: '#64B5F6',
		},
		'&.active': {
		  color: 'white!important',
		  backgroundColor: '#64B5F6',
		},
	  },
	}));
	
	export default useStyles;
	