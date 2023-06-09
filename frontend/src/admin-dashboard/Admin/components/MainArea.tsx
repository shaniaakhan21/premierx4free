import { makeStyles } from '../../../utils/makeStyles';
import FootBar from './FootBar';
import AgentDocuments from './mainArea_Components/agentDocuments/AgentDocuments';
import CalculationPage from './mainArea_Components/calculationPage/CalculationPage';
import AdminSettings from './mainArea_Components/adminSettings/AdminSettings';
import * as React from 'react';
import MarketingMaterials from './mainArea_Components/marketingMaterials/MarketingMaterials';
import AgentHeader from '../../../Dashboard/components/agent-header/AgentHeader';
import AgentSearchPage from './mainArea_Components/agentSearch/AgentSearchPage';
import { Route, Routes } from "react-router-dom";

import './mainArea.scss'

function MainArea(): JSX.Element {
  const { classes } = useStyles()

  return (
    <div className={classes.mainArea_mainContainer}>
      <div className={classes.agentHeader}>
        <AgentHeader />
      </div>
      <div className={classes.mainContainer_mainContent}>
        <Routes>
          <Route path="/calculation" element={<CalculationPage />} />
          <Route path="/marketingMaterials" element={<MarketingMaterials />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/agents" element={<AgentSearchPage />} />
          <Route path="/" element={<AgentDocuments />} />
        </Routes>
      </div>
      <FootBar />
    </div>
  )
}

const useStyles = makeStyles()(() => ({
  mainArea_mainContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  mainContainer_mainContent: {
    //height:"90%",
    margin: "30px 20px 0px 30px",
    // width:"100%"
  },
  agentHeader: {
    '@media(max-width:768px)': {
      display: "none"
    }
  }
}))

export default MainArea
