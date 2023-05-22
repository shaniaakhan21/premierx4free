import AgentHeader from '../Dashboard/components/agent-header/AgentHeader';
import {Row, Col } from 'react-bootstrap';
import './styles.css';
import AgentTabs from './components/agent-tabs/AgentTabs';
import { useState,useEffect } from 'react';
import { getLocalStorage } from './helperFunctions';

function AgentDashboard(): JSX.Element {
  const [data,setData] = useState<object | null>()

console.log("data from lcstrage is",data)
  useEffect(()=> {
    // let jsonObj:object|null =  JSON.parse(getLocalStorage('data') ?? '{}')
     setData(getLocalStorage('data'))
  },[])

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
      <AgentTabs agentData={data} />
    </div>
  );
}

export default AgentDashboard;
