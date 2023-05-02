import AgentHeader from '../Dashboard/components/agent-header/AgentHeader';
import AgentProfile from './components/agent-profile/AgentProfile';
import './styles.css';
import AgentTabs from './components/agent-tabs/AgentTabs';

function AgentDashboard(): JSX.Element {
  return (
    <div>
      <div className='row'>
        <div className='col-2' style={{ padding: '0' }}>
          <AgentProfile />
        </div>
        <div className='col-10' style={{ padding: '0' }}>
          <AgentHeader />
        </div>
      </div>
      <AgentTabs />
    </div>
  );
}

export default AgentDashboard;
