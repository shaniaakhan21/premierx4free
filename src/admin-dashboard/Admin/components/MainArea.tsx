
import { makeStyles } from '../../../utils/makeStyles';
import FootBar from './FootBar';
import AgentDocuments from './mainArea_Components/agentDocuments/AgentDocuments';
import CalculationPage from './mainArea_Components/calculationPage/CalculationPage';
import AdminSettings from './mainArea_Components/adminSettings/AdminSettings';
import {useEffect, useState} from 'react';
import MarketingMaterials from './mainArea_Components/marketingMaterials/MarketingMaterials';
import AgentHeader from '../../../Dashboard/components/agent-header/AgentHeader';

interface event {
    eventNumber:number
}

function MainArea(props:event): JSX.Element{
  const {classes} = useStyles();
  const {eventNumber} = props;
  const [mainAreaContent, setMainAreaContent] = useState(<></>);
  console.log('event from main area',eventNumber);
  useEffect(() => {
    if(eventNumber == 1)
    {
      setMainAreaContent(<AgentDocuments />);
    }
    if (eventNumber == 2)
    {
      setMainAreaContent(<CalculationPage />);
    }
    if (eventNumber == 3)
    {
      setMainAreaContent(<MarketingMaterials />);
    }
    if (eventNumber == 4)
    {
      setMainAreaContent(<AdminSettings />);
    }
  },[eventNumber]);
  return(
    <div className={classes.mainArea_mainContainer}>
      <div className={classes.agentHeader}>
        <AgentHeader />
      </div>
      <div className={classes.mainContainer_mainContent}>
        {mainAreaContent}
      </div>
      <FootBar />
    </div>
  );
}

const useStyles = makeStyles() (() => ({
  mainArea_mainContainer:{
    display:'flex',
    flexDirection:'column',
    width:'100%'
  },
  mainContainer_mainContent:{
    margin:'30px 20px 0px 30px',
  },
  agentHeader:{
    '@media(max-width:768px)':{
      display:'none'
    }
  }
}));

export default MainArea;