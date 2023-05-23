import AgentHeader from '../Dashboard/components/agent-header/AgentHeader';
import {Row, Col } from 'react-bootstrap';
import './styles.css';
import AgentTabs from './components/agent-tabs/AgentTabs';
import {useAuth} from "../contexts/auth.context";

function AgentDashboard(): JSX.Element {

  return (
    <div className='main-div'>
      <Row >
        <Col className='box-img-bg' lg="2" sm="6">
          <a href='/'>
            <img className="card-img-top" src={"/assets/svg/Dashboard/logo-dash.svg"} alt="Card image cap" />
          </a>
        </Col>

        <Col  style={{ padding: '0' }} lg="10" sm="6">
          <AgentHeader  />
        </Col>
      </Row>
      <AgentTabs />
    </div>
  );
}

export default AgentDashboard;
