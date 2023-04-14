import useStyles from './styles'
const imgSignin = '/assets/svg/SignIn/sigin-img.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import React, { useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function SignIn(): JSX.Element {
    const { classes } = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);

  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password);
    };
  
	return (
		<div className={classes.container}>
			<div className={classes.imagesigin}>
                <img src={imgSignin} />
            </div>
            <div className={classes.siginform}>
                <h1>Welcome back! <br></br>Please, log in to continue</h1>
                <form onSubmit={handleSubmit} className={classes.formhere}>
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
                    </div>
                    <div className="form-group">
                        <label className={classes.label} htmlFor="password">Password</label>
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

                    <button type="submit" className={`${classes.buttonstyle} btn btn-primary`}>
                        Log In
                    </button>
                    <div className={classes.linktosignindiv}>
                        <a className={classes.linktosignin}>I can’t remember my password</a>
                    </div>
                    <div className={`${classes.linktosignindiv} ${classes.extrapadding}`}>
                        <a className={classes.linktosignin}>Don’t have an account yet? Register here</a>
                    </div>

                </form>
            </div>
		</div>
	)
}

export default SignIn