import { Link, Typography, Box } from '@mui/material';
import useStyles from './styles';
import Logo from '../Logo';
import { NavLink } from 'react-router-dom';

function Navbar(): JSX.Element {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Link href="/" className={classes.logoContainer}>
        <Logo />
      </Link>
      <NavLink to="/" className={classes.link} activeClassName="active" style={{ textDecoration: 'none' }}>
        <Typography variant="h6" >
          About Us
        </Typography>
      </NavLink>
      <NavLink to="/team" className={classes.link} activeClassName="active" style={{ textDecoration: 'none' }}>
        <Typography variant="h6" >
          Meet the Team
        </Typography>
      </NavLink>
      <NavLink to="/partners" className={classes.link} activeClassName="active" style={{ textDecoration: 'none' }}>
        <Typography variant="h6" >
          Strategic Partners
        </Typography>
      </NavLink>
      <NavLink to="/plan-options" className={classes.link} activeClassName="active" style={{ textDecoration: 'none' }}>
        <Typography variant="h6" >
          Plan Options
        </Typography>
      </NavLink>
      <NavLink to="/contact" className={classes.link} activeClassName="active" style={{ textDecoration: 'none' }}>
        <Typography variant="h6" >
          Contact Us
        </Typography>
      </NavLink>
    </Box>
  );
}

export default Navbar;
