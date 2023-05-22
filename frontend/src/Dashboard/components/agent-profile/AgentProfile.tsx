import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import useStyles from "../agent-profile/styles"

interface data {
    agentData : any
}

function AgentProfile(props:data): JSX.Element {

    let {agentData} = props
    console.log("data from agent profile",agentData.data.agentProfile.name)
    const classes = useStyles();
	return (
		<div>
			<div className={`${classes.classes.profileBody} "card" `}>
                <div className={` ${classes.classes.cardCustBody} "card-body" `}>
                    <img className="rounded-circle img-fluid" src={"/assets/svg/Dashboard/dummy.svg"} alt="Card image cap"/>
                    <h3 className="card-title">{agentData.data.agentProfile.name}</h3>
                    <span style={{ color:'white!important'}} className="card-text">{agentData.data.email}</span>
                </div>
            </div>
		</div>
	);
};

export default AgentProfile;