import useStyles from './styles';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
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
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const history = useNavigate();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8000/signup", {
                fullName,
                email,
                phoneNumber,
                password,
                confirmPassword,
            });
            if (res.data === "exists") {
                setErrorMsg("User already exists");
            } else if (res.data === "notexists") {
                history("/signin");
            }
        } catch (e) {
            setErrorMsg("Something went wrong try again later");
            console.log(e);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.imagesigin}>
                <img src={imgSignin} />
            </div>
            <div className={classes.siginform}>
                <h1>Please register to have an account</h1>
                <form onSubmit={submit} className={classes.formhere}>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="fullName"
                            placeholder="Enter your full name"
                            value={fullName || errorMsg}
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                    </div>
                    {errorMsg && (
                        <div className="alert alert-danger" role="alert">
                            {errorMsg}
                        </div>
                    )}
                    <div className="form-group">
                        <label className={classes.label} htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            className={`${classes.formControl} form-control`}
                            id="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We’ll send a confirmation email to your inbox, make sure you have access to this email address.
                        </small>
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
                        <label className={classes.label} htmlFor="fullName">Address</label>
                        <input style={{ height: '100px'}}
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="fullName"
                            placeholder=""
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="fullName"
                            placeholder="City"
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="fullName"
                            placeholder="State"
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="fullName"
                            placeholder="Zip Code"
                            onChange={(e) => { setFullName(e.target.value) }}
                        />
                        <input
                            type="text"
                            className={`${classes.formControl} form-control`}
                            id="fullName"
                            placeholder="Referral Link"
                            onChange={(e) => { setFullName(e.target.value) }}
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
            </div>
        </div>
    )
}

export default SignUp