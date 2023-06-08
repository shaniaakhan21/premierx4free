import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { register } from "../../../services/register";
import { useTranslation } from "react-i18next";

const imgSignin = '/assets/svg/SignIn/sigin-img.svg';

function SignUp(): JSX.Element {
  const { id } = useParams()
  const { classes } = useStyles();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [referral, setReferral] = useState("");
  const [disableReferral, setDisableReferral] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useNavigate();
  const [tr] = useTranslation();

  const t = (key: string) => tr(`signup.${key}`);
  const tf = (key: string) => tr(`signup.form.${key}`);

  useEffect(() => {
    const agentId = id?.split('-')[0]
    if (agentId) {
      setReferral(agentId ?? '')
      setDisableReferral(true)
    }
    return () => {
      setDisableReferral(false)
    }
  }, [id])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setErrorMsg(t('error-passwords-dont-match'))
        return
      }
      const res = await register({
        name: fullName,
        email,
        contactNo: phoneNumber,
        password,
        location: {
          address,
          city,
          state,
          zip: zipcode,
        },
        referralCode: referral,
      });

      console.log('Response data:', res);

      if (res.status === 200) {
        console.log(t('success-registration'));
        history('/signin');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(t('error-registration'));
      }
    }
  }

  return (
    <Row className={classes.container}>
      <Col className={classes.imagesigin} lg="8" md="7" sm="8" xs="12">
        <img src={imgSignin} />
      </Col>
      <Col className={classes.siginform} lg="4" md="5" sm="4" xs="12">
        <h1>{tf('title')}</h1>
        <form onSubmit={submit} className={classes.formhere}>
          <div className="form-group">
            <label className={classes.label} htmlFor="fullName">{tf('full-name')}</label>
            <input
              type="text"
              className={`${classes.formControl} form-control`}
              id="fullName"
              placeholder={tf('full-name-placeholder')}
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value)
              }}
            />
          </div>
          <div className="form-group">
            <label className={classes.label} htmlFor="email">{tf('email')}</label>
            <input
              type="email"
              className={`${classes.formControl} form-control`}
              id="email"
              placeholder={tf('email-placeholder')}
              value={email || errorMsg}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <small id="emailHelp" className="form-text text-muted">
              {t('email-help')}
            </small>
            {errorMsg && (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className={classes.label} htmlFor="phoneNumber">{tf('phone')}</label>
            <input
              type="tel"
              className={`${classes.formControl} form-control`}
              id="phoneNumber"
              placeholder={tf('phone-placeholder')}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            />
          </div>
          <div className="form-group">
            <label className={classes.label} htmlFor="address">{tf('address')}</label>
            <input style={{ height: '100px' }}
                   type="text"
                   className={`${classes.formControl} form-control`}
                   id="address"
                   placeholder={tf('address-placeholder')}
                   value={address}
                   onChange={(e) => {
                     setAddress(e.target.value)
                   }}
            />
            <input
              type="text"
              className={`${classes.formControl} form-control`}
              id="city"
              placeholder={tf('city')}
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
              }}
            />
            <input
              type="text"
              className={`${classes.formControl} form-control`}
              id="state"
              placeholder={tf('state')}
              value={state}
              onChange={(e) => {
                setState(e.target.value)
              }}
            />
            <input
              type="text"
              className={`${classes.formControl} form-control`}
              id="zipcode"
              placeholder={tf('zipcode')}
              value={zipcode}
              onChange={(e) => {
                setZipCode(e.target.value)
              }}
            />
            {/*<input*/}
            {/*  type="hidden"*/}
            {/*  className={`${classes.formControl} form-control`}*/}
            {/*  id="link-ref"*/}
            {/*  placeholder={tf('referral-code')}*/}
            {/*  value={referral}*/}
            {/*  disabled={disableReferral}*/}
            {/*  onChange={(e) => {*/}
            {/*    setReferral(e.target.value)*/}
            {/*  }}*/}
            {/*/>*/}
          </div>

          <div className="form-group">
            <div className={` ${classes.cstmpsdbox} "input-group" `}>
              <input
                type={showPassword1 ? "text" : "password"}
                className={`${classes.formControl} ${classes.custompsd} form-control`}
                id="password"
                placeholder={tf('password')}
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

          <div className="form-group">
            <div className={` ${classes.cstmpsdbox} "input-group" `}>
              <input
                type={showPassword2 ? "text" : "password"}
                className={`${classes.formControl} ${classes.custompsd} form-control`}
                id="confirmPassword"
                placeholder={tf('confirm-password')}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
              <div className="input-group-append">
                <button
                  className={`${classes.eyebtn} btn btn-outline-secondary`}
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  <FontAwesomeIcon icon={showPassword2 ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className={`${classes.buttonstyle} btn btn-primary`}>
            Register
          </button>
          <div className={`${classes.linktosignindiv} ${classes.extrapadding}`}>
            <span className={classes.notalink}>{t('already-have-account')}</span>
            <a href='/signin' className={classes.linktosignin}>{t('log-in')}</a>
          </div>

        </form>
      </Col>
    </Row>
  )
}

export default SignUp
