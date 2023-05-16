import useStyles from "../agent-header/styles";
import AgentSubHeader from "./component/AgentSubHeader";

function AgentHeader(): JSX.Element {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.classes.container}>
				<img src={'/assets/svg/Dashboard/logout.svg'} />
				<a>Logout</a>
			</div>
		</div>
	)
}

export default AgentHeader