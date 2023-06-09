import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { FormEventHandler, useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { login } from "../../../services/auth";
import { useAuth } from "../../../contexts/auth.context";
import { Roles } from "../../../models/user.model";
import { useTranslation } from "react-i18next";

const imgSignin = '/assets/svg/SignIn/sigin-img.svg';

function SignIn(): JSX.Element {
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useNavigate();
  const { setUser } = useAuth()
  const [tr] = useTranslation();

  const t = (key: string) => tr(`signin.${key}`);

  const onSubmit: FormEventHandler<any> = async (e) => {
    e.preventDefault()
    try {
      const response = await login({
        email,
        password
      })
      if (response.data.success) {
        setUser(response.data.data)
        if (response.data.data.roles.includes(Roles.Admin)) {
          history("/admin")
          return
        } else {
          history("/agent-dashboard")
        }
      } else {
        setErrorMsg(t('invalid-credentials'));
      }
    } catch (error) {
      setErrorMsg(t('error-other'));
    }
  }

  return (
    <Row className={classes.container}>
      <Col className={classes.imagesigin} lg="8" md="6">
        <img src={imgSignin} />
      </Col>
      <Col className={classes.siginform} lg="4" md="6">
        <h1>{t('welcome-back')}<br></br>{t('title')}</h1>
        <form action='POST' className={classes.formhere} onSubmit={onSubmit}>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          <div className="form-group">
            <label className={classes.label} htmlFor="email">{t('email')}</label>
            <input
              type="email"
              className={`${classes.formControl} form-control`}
              id="email"
              placeholder={t('email-placeholder')}
              value={email || errorMsg}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="form-group">
            <label className={classes.label} htmlFor="password">{t('password')}</label>
            <div className={` ${classes.cstmpsdbox} "input-group" `}>
              <input
                type={showPassword1 ? "text" : "password"}
                className={`${classes.formControl} ${classes.custompsd} form-control`}
                id="password"
                placeholder={t('password-placeholder')}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <div className="input-group-append">
                <button
                  className={`${classes.eyebtn} btn btn-outline-secondary`}
                  type="button"
                  onClick={() => setShowPassword1(!showPassword1)}
                >
                  <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className={`${classes.buttonstyle} btn btn-primary`}>
            {t('login')}
          </button>
          <div className={classes.linktosignindiv}>
            <a href='/resetpassword' className={classes.linktosignin}>{t('reset-password')}</a>
          </div>
          <div className={`${classes.linktosignindiv} ${classes.extrapadding}`}>
            <span className={classes.notalink}>{t('dont-have-account')}</span>{' '}
            <a href='/signup' className={classes.linktosignin}>{t('register')}</a>
          </div>

        </form>
      </Col>
    </Row>
  )
}

export default SignIn
