
import { makeStyles } from '../../../utils/makeStyles';
import TopBar from './TopBar';
import FootBar from './FootBar';
import AgentDocuments from './mainArea_Components/AgentDocuments';
import CalculationPage from './mainArea_Components/CalculationPage';
import AdminSettings from './mainArea_Components/AdminSettings';
import {useEffect, useState} from 'react';
import MarketingMaterials from './mainArea_Components/MarketingMaterials';
import * as React from 'react';
interface event {
    eventNumber:number
    // setEventNumber:any
}

function MainArea(props:event): JSX.Element{
    const {classes} = useStyles()
    const {eventNumber} = props
    const [mainAreaContent, setMainAreaContent] = useState(<></>)
    console.log("event from main area",eventNumber)
    useEffect(() => {
        if(eventNumber == 1)
        {
            setMainAreaContent(<AgentDocuments />)
        }
        if (eventNumber == 2)
        {
            setMainAreaContent(<CalculationPage />)
        }
        if (eventNumber == 3)
        {
            setMainAreaContent(<MarketingMaterials />)
        }
        if (eventNumber == 4)
        {
            setMainAreaContent(<AdminSettings />)
        }
    },[eventNumber])
    return(
        <div className={classes.mainArea_mainContainer}>
            <TopBar />
            <div className={classes.mainContainer_mainContent}>
                {/* <AgentDocuments /> */}
                {/* <CalculationPage /> */}
                
                
                {mainAreaContent}

                {/* <AdminSettings /> */}
            </div>
            <FootBar />
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    mainArea_mainContainer:{
        display:"flex",
        flexDirection:"column",
        width:"100%"
    },
    mainContainer_mainContent:{
        //height:"90%",
        margin:"30px 20px 0px 30px"
    }
}))

export default MainArea