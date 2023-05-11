import { makeStyles } from '../../utils/makeStyles';
import Sidebar from './components/sidebar/Sidebar'
import MainArea from './components/MainArea';
import TopBarMobile from './components/top-bar/TopBarMobile';
import SidebarMobile from './components/sidebar/SidebarMobile';
import { useState } from 'react';
import './index.css'

function AdminDashboard(): JSX.Element{
    const {classes} = useStyles()
    const [eventNumber,setEventNumber] = useState(1)
    const [sidebarToggle,setSidebarToggle] = useState(false)
    console.log("event from index is",eventNumber)
    return(
        <div>
            <div className='topBarMobile'>
            <TopBarMobile sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}  />
            </div>
        <div className={classes.mainContainer}>
            {
            sidebarToggle ?
            <div className='sidebarMobile'>
                <SidebarMobile eventNumber={eventNumber} setEventNumber={setEventNumber} sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
            </div>
            :<></>
            }
            <div className='sidebar'>
            <Sidebar eventNumber={eventNumber} setEventNumber={setEventNumber} />
            </div>
            <div style={{width:"100%"}}>
            <MainArea eventNumber={eventNumber} />
            </div>
        </div>
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    mainContainer:{
        display:"flex",
        flexDirection:"row",
        width:"100%",
        //height:"100%",
        // overflow:"hidden",
        '@media (max-width:600px)':{
            display:"flex",
            flexDirection:"column"
        },
        
    }
}))

export default AdminDashboard