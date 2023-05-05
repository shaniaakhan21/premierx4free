import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { useState } from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const imgSignin = '/assets/svg/SignIn/sigin-img.svg';

function SignIn(): JSX.Element {
    const { classes } = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const history = useNavigate();

    async function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/signin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
            const result = await response.json();

            if (result === "exists") {
                // login successful, redirect to home page
                history("/");
            } else {
                // login failed, show error message
                setErrorMsg("Invalid email or password");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMsg("An error occurred, please try again later.");
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.imagesigin}>
                <img src={imgSignin} />
            </div>
            <div className={classes.siginform}>
                <h1>Welcome back! <br></br>Please, log in to continue</h1>
                <form action='POST' className={classes.formhere}>
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
                            value={email || errorMsg}
                            onChange={(e) => { setEmail(e.target.value) }}
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

                    <button type="submit" onClick={submit} className={`${classes.buttonstyle} btn btn-primary`}>
                        Log In
                    </button>
                    <div className={classes.linktosignindiv}>
                        <a href='/resetpassword' className={classes.linktosignin}>I can’t remember my password</a>
                    </div>
                    <div className={`${classes.linktosignindiv} ${classes.extrapadding}`}>
                        <span className={classes.notalink}>Don’t have an account yet? </span>
                        <a href='/signup' className={classes.linktosignin}>Register</a>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SignIn