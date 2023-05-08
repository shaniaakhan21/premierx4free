import useStyles from "./styles";

function AgentSubHeader(): JSX.Element {
	const classes = useStyles();
	return (
		<div className={`{ ${classes.classes.mainConatiner } "row" `}>
            <div className="col-6">
                <div className={classes.classes.subcontainer }>
                    <span >Documents</span>
                    <div className={classes.classes.subsubcontainer }>
                        <a>NDA</a>
                        <div className={classes.classes.line }></div>
                        <a>Commission Agreement</a>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className={` ${classes.classes.subcontainer } ${classes.classes.customit} `} >
                    <span>Referral Link</span>
                    <div className={classes.classes.refercontainer }>
                        <img src={'/assets/svg/Dashboard/referrals.svg'} />
                        <div className={classes.classes.agentbox }>
                            <span>Refer Agent</span>
                            <div className={classes.classes.copylinkit }>
                                <img src={'/assets/svg/Dashboard/copy-link.svg'} />
                                <a href="#">Copy Referral Link </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	)
}

export default AgentSubHeader