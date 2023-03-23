import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import useStyles from "./styles"
import { useLocation } from 'react-router-dom';

function AppNavbar(): JSX.Element {
  const { classes } = useStyles();
  const location = useLocation();
  return (
    <Navbar bg="white" expand="lg">
      <Container style={{ padding:'1%'}}>
        <Link to="/" className="navbar-brand">
          <Logo/>
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className={`${classes.link} nav-link ${location.pathname === "/" ? "active" : ""}`} >About Us</Link>
            <Link to="/team" className={`${classes.link} nav-link ${location.pathname === "/team" ? "active" : ""}`}>Meet the Team</Link>
            <Link to="/partners" className={`${classes.link} nav-link ${location.pathname ==="/partners"  ? "active" : ""}`}>Strategic Partners</Link>
            <Link to="/plans" className={`${classes.link} nav-link ${location.pathname ===  "/plans" ? "active" : ""}`}>Plan Options</Link>
            <Link to="/contact" className={`${classes.link} nav-link ${location.pathname === "/contact" ? "active" : ""}`}>Contact Us</Link>
            <Link to="/faq" className={`${classes.link} nav-link ${location.pathname === "/faq" ? "active" : ""}`}>FAQ</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;