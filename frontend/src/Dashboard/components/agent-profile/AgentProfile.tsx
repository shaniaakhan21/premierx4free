import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import useStyles from "../agent-profile/styles"
import User from "../../../models/user.model";

interface Props {
    agentData : User
}

function AgentProfile(props: Props): JSX.Element {

    let { agentData } = props

    const classes = useStyles();
	return (
		<div>
			<div className={`${classes.classes.profileBody} "card" `}>
                <div className={`${classes.classes.cardCustBody} "card-body"`}>
                    <img className="rounded-circle img-fluid" src="/assets/svg/Dashboard/dummy.svg" />
                    <h3 className="card-title">{agentData?.agentProfile?.name}</h3>
                    <span style={{ color:'white!important' }} className="card-text">{agentData?.email}</span>
                </div>
            </div>
		</div>
	);
};

export default AgentProfile;
