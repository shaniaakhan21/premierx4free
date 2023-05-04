
import { makeStyles } from '../../../utils/makeStyles';
import TopBar from './TopBar';
import FootBar from './FootBar';
import AgentDocuments from './mainArea_Components/AgentDocuments';
import CalculationPage from './mainArea_Components/CalculationPage';

function MainArea(): JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.mainArea_mainContainer}>
            <TopBar />
            <div className={classes.mainContainer_mainContent}>
                {/* <AgentDocuments /> */}
                <CalculationPage />
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
        height:"90%",
        margin:"30px 20px 0px 61px"
    }
}))

export default MainArea