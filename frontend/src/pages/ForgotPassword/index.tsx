import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { useState } from "react";
import Navbar from '../../components/Navbar';
import { Col, Row } from 'react-bootstrap';
import Footer from '../../components/Footer';

const imgSignin = '/assets/svg/SignIn/sigin-img.svg';

function ForgotPassword(): JSX.Element {
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSent(true);

  }

  return (
    <>
      <Navbar />
      <Row className={classes.container}>
        <Col className={classes.imagesigin} lg="8" md="6">
          <img src={imgSignin} />
        </Col>
        <Col className={classes.siginform} lg="4" md="6">
          <h1>Did you forgot your password?</h1>
          {isSent ? (
            <div>
              <div className="alert alert-success" role="alert">
                Please check your email to reset your password.
              </div>
              <button type="submit" className={`${classes.buttonstyle} btn btn-primary`}>
                Resend
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className={classes.formhere}>
              <div className="form-group">
                <label className={classes.label} htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className={`${classes.formControl} form-control`}
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  disabled={isSent} // disable input field when email is sent
                />
              </div>
              <button type="submit" className={`${classes.buttonstyle} btn btn-primary`} disabled={isSent}>
                Send
              </button>
              <div className={`${classes.linktosignindiv} ${classes.extrapadding}`}>
                <span className={classes.notalink}>Don’t have an account yet? </span>
                <a className={classes.linktosignin}>Register</a>
              </div>
            </form>
          )}
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default ForgotPassword;
