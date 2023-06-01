import { makeStyles } from "../../utils/makeStyles";

const useStyles = makeStyles()((theme) => ({
  container: {
    width: '100%',
    backgroundColor: 'rgb(14, 89, 136)',
    boxShadow: "0px 4px 91px rgba(0, 0, 0, 0.25)",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    [theme.breakpoints.down('md')]: {
      paddingTop: 36,
      paddingBottom: 36,
      paddingLeft: 36,
      paddingRight: 36
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 56,
      paddingBottom: 56,
      paddingLeft: 56,
      paddingRight: 56
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: 72,
      paddingBottom: 72,
      paddingLeft: 72,
      paddingRight: 72
    },
  },
  items: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 24,
      marginRight: 24
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 36,
      marginRight: 36
    },
  },
  columnTitle: {
    color: "#FFFFFF",
  },
  link: {
    color: "#8BE1FF"
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
    ['@media screen and (min-width: 1768px)']: {
      width: 200
    },
    ['@media screen and (min-width: 1930px)']: {
      width: 215
    }
  },
}));
export default useStyles
