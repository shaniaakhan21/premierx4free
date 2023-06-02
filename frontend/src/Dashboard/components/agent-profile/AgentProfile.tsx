import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import useStyles from "../agent-profile/styles"
import { useAuth } from "../../../contexts/auth.context";
import { Avatar } from "@mui/material";
import * as React from "react";

interface Props {

}

function AgentProfile(props: Props): JSX.Element {

  const { user } = useAuth()

  const classes = useStyles();

  return (
    <div className={`${classes.classes.profileBody}`}>
      <div className={`${classes.classes.cardCustBody}`}>
        <Avatar sx={{ width: 150, height: 150, marginBottom: 2 }} alt={user?.agentProfile?.name?.toUpperCase() ?? ''}
                variant='circular'
                src={user?.agentProfile?.profileImage && `/api/uploads/profileImage/${user?.agentProfile?.profileImage}`} />
        <h3 className="card-title">{user?.agentProfile?.name}</h3>
        <span style={{ color: 'white!important' }} className="card-text">{user?.email}</span>
      </div>
    </div>
  );
}

export default AgentProfile;
