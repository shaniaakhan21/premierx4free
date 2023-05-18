import useStyles from './styles';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import React, { useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const imgSignin = '/assets/svg/SignIn/sigin-img.svg';

function SignUp(): JSX.Element {
    const { classes } = useStyles();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [referral, setReferral] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const history = useNavigate();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/user/signup", {
                fullName,
                email,
                phoneNumber,
                password,
                confirmPassword,
                address,
                city,
                state,
                zipcode,
                referral,
            });

            console.log('Response data:', res.data);

            if (res.status === 201) {
                console.log('User registered successfully');
                history('/signin');
            }
        } catch (error: any){
            if (error.response && error.response.status === 400) {
                // User already exists
                setErrorMsg(error.response.data.message);
            } else {
                console.error('Error during registration:', error);
                setErrorMsg('Something went wrong, please try again later');
            }
        }
    }

    return (
        <Row className={classes.container}>
            <Col className={classes.imagesigin} lg="8" md="7" sm="8" xs="12">
                <img src={imgSignin} />
            </Col>
            <Col className={classes.siginform} lg="4" md="5" sm="4" xs="12">
                <h1>Please register to have an account</h1>
                <form onSubmit={submit} className={classes.formhere}>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className={`${classes.formControl} form-control`}
                            id="email"
                            placeholder="Enter your email address"
                            value={email || errorMsg}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We’ll send a confirmation email to your inbox, make sure you have access to this email address.
                        </small>
                        {errorMsg && (
                            <div className="alert alert-danger" role="alert">
                                {errorMsg}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            className={`${classes.formControl} form-control`}
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="address">Address</label>
                        <input style={{ height: '100px' }}
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="address"
                            placeholder=""
                            value={address}
                            onChange={(e) => { setAddress(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => { setCity(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="state"
                            placeholder="State"
                            value={state}
                            onChange={(e) => { setState(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="zipcode"
                            placeholder="Zip Code"
                            value={zipcode}
                            onChange={(e) => { setZipCode(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="link-ref"
                            placeholder="Referral Link"
                            value={referral}
                            onChange={(e) => { setReferral(e.target.value) }}
                        />
                    </div>

                    <div className="form-group">
                        <div className={` ${classes.cstmpsdbox} "input-group" `}>
                            <input
                                type={showPassword1 ? "text" : "password"}
                                className={`${classes.formControl} ${classes.custompsd} form-control`}
                                id="password"
                                placeholder="Input Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
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
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
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
                        <span className={classes.notalink}>Already have an account? </span>
                        <a href='/signin' className={classes.linktosignin}>Log in</a>
                    </div>

                </form>
            </Col>
        </Row>
    )
}

export default SignUp
