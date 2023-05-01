import { makeStyles } from '../../utils/makeStyles';
import Sidebar from './components/Sidebar'
import MainArea from './components/MainArea';
function AdminDashboard(): JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.mainContainer}>
            <Sidebar />
            <MainArea />
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    mainContainer:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        height:"100%",
    }
}))

export default AdminDashboard