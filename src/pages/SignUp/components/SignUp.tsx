import useStyles from './styles'
const imgSignin = '/assets/svg/SignIn/sigin-img.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import React, { useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SignUp(): JSX.Element {
    const { classes } = useStyles();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Full Name:", fullName);
      console.log("Email:", email);
      console.log("Phone Number:", phoneNumber);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
    };
  
	return (
		<div className={classes.container}>
			<div className={classes.imagesigin}>
                <img src={imgSignin} />
            </div>
            <div className={classes.siginform}>
                <h1>Please register to have an account</h1>
                <form onSubmit={handleSubmit} className={classes.formhere}>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="fullName">Full Name</label>
                        <input
                        type="text"
                        className={`${classes.formControl} form-control`}
                        id="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="email">Email Address</label>
                        <input
                        type="email"
                        className={`${classes.formControl} form-control`}
                        id="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                                <small id="emailHelp" className="form-text text-muted">
                                We’ll send a confirmation email to your inbox, make sure you have access to this email address.
                                </small>
                    </div>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="phoneNumber">Phone Number</label>
                        <input style={{ marginBottom: '7%' }} 
                        type="tel"
                        className={`${classes.formControl} form-control`}
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <div className={classes.linktosignindiv}>
                        <a className={classes.linktosignin}>Already have an Account? Log in</a>
                    </div>

                </form>
            </div>
		</div>
	)
}

export default SignUp