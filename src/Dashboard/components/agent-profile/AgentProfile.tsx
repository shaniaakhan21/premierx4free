import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import useStyles from "../agent-profile/styles"
function AgentProfile(): JSX.Element {
    const classes = useStyles();
	return (
		<div>
			<div className={`${classes.classes.profileBody} "card" `}>
                <img className="card-img-top" src={"/assets/svg/Dashboard/logo-dash.svg"} alt="Card image cap"/>
                <div className={` ${classes.classes.cardCustBody} "card-body" `}>
                    <img className="rounded-circle img-fluid" src={"/assets/svg/Dashboard/dummy.svg"} alt="Card image cap"/>
                    <h3 className="card-title">John Smith</h3>
                    <p className="card-text">johnsmith@gmail.com</p>
                </div>
            </div>
		</div>
	);
};

export default AgentProfile;