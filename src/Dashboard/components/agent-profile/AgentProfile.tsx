import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import useStyles from '../agent-profile/styles';
function AgentProfile(): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <div className={`${classes.classes.profileBody} "card" `}>
        <div className={` ${classes.classes.cardCustBody} "card-body" `}>
          <img className="rounded-circle img-fluid" src={'/assets/svg/Dashboard/dummy.svg'} alt="Card image cap"/>
          <h3 className="card-title">John Smith</h3>
          <span style={{ color:'white!important'}} className="card-text">johnsmith@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default AgentProfile;