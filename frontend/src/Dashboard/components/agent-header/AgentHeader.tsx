import useStyles from "../agent-header/styles";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../contexts/auth.context";

function AgentHeader(): JSX.Element {
  const { setUser } = useAuth()
  const classes = useStyles();
  const navigate = useNavigate()
  const handleLogout = () => {
    setUser(undefined)
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
