import { makeStyles } from '../../utils/makeStyles';
import Sidebar from './components/Sidebar'
import MainArea from './components/MainArea';
import { useState } from 'react';
function AdminDashboard(): JSX.Element{
    const {classes} = useStyles()
    const [eventNumber,setEventNumber] = useState(1)
    console.log("event from index is",eventNumber)
    return(
        <div className={classes.mainContainer}>
            <Sidebar eventNumber={eventNumber} setEventNumber={setEventNumber} />
            <MainArea eventNumber={eventNumber} />
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    mainContainer:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        //height:"100%",
    }
}))

export default AdminDashboard