import useStyles from './styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import {FormEventHandler, useState} from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const imgSignin = '/assets/svg/SignIn/sigin-img.svg';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {login} from "../../../services/auth";
import {useAuth} from "../../../contexts/auth.context";

function SignIn(): JSX.Element {
    const { classes } = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const history = useNavigate();
    const { setUser } = useAuth()

    const onSubmit: FormEventHandler<any> = async (e) => {
        e.preventDefault()
        try {
             const response = await login({
                 email,
                 password
             })
            if (response.data.success) {
                setUser(response.data.data)
                history("/agent-dashboard")
            } else {
                setErrorMsg("Invalid email or password");
            }
        } catch (error) {
            setErrorMsg("An error occurred, please try again later.");
        }
    }

    return (
        <Row className={classes.container}>
            <Col className={classes.imagesigin} lg="8" md="6">
                <img src={imgSignin} />
            </Col>
            <Col className={classes.siginform} lg="4" md="6">
                <h1>Welcome back! <br></br>Please, log in to continue</h1>
                <form action='POST' className={classes.formhere} onSubmit={onSubmit}>
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

                    <button type="submit" className={`${classes.buttonstyle} btn btn-primary`}>
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
            </Col>
        </Row>
    )
}

export default SignIn
