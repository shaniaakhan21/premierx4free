import { MouseEventHandler } from "react";
import useStyles from "../agent-header/styles";
import AgentSubHeader from "./component/AgentSubHeader";
import { useNavigate } from 'react-router-dom';

function AgentHeader(): JSX.Element {
	const classes = useStyles();
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.removeItem("data")
		navigate('/')

	}
	return (
		<div>
			<div className={classes.classes.container} onClick={() => {
				handleLogout()
			}}>
				<img src={'/assets/svg/Dashboard/logout.svg'} />
				<a>Logout</a>
			</div>
		</div>
	)
}

export default AgentHeader