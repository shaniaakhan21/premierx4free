import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import useStyles from "./styles"
import { useTranslation } from "react-i18next";

function AppNavbar() {
  const { classes } = useStyles();
  const location = useLocation();
  const [tr] = useTranslation();

  const t = (key: string) => tr(`nav.${key}`);

  return (
    <Navbar bg="white" expand="lg">
      <div className={`${classes.container} container`}>
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {[
              [t('about-us'), "/"],
              [t('meet-the-team'), "/team"],
              [t('strategic-partners'), "/partners"],
              [t('plan-options'), "/plans"],
              [t('contact-us'), "/contact"],
              // [t('faq'), "/faq"],
              // [t('register'), "/signup"],
              [t('log-in'), "/signin"]
            ].map((item) => <Link to={item[1]} className={`${classes.link} nav-link ${location.pathname === item[1] ? "active" : ""}`}>{item[0]}</Link>)}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default AppNavbar;
