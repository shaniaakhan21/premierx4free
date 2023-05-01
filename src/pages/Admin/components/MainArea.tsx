
import { makeStyles } from '../../../utils/makeStyles';
import TopBar from './TopBar';
import FootBar from './FootBar';

function MainArea(): JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.mainArea_mainContainer}>
            <TopBar />
            <div className={classes.mainContainer_mainContent}>
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
        height:"90%"
    }
}))

export default MainArea