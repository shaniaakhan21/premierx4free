
import { padding } from '@mui/system'
import { makeStyles } from '../../../../utils/makeStyles'

interface props {
    sidebarToggle:boolean,
    setSidebarToggle:any
}

function TopBarMobile(props:props): JSX.Element{
    const {classes} = useStyles()
    const {setSidebarToggle,sidebarToggle} = props
    return(
        <div className={classes.topbar}>
            <div>
                <img src='/assets/svg/logo_bold.svg' className={classes.topLogo} />
            </div>
            <div className={classes.logoutButton} onClick={() => {setSidebarToggle(!sidebarToggle)}}>
                <img className={classes.burger_buttonIcon} src="/assets/svg/Dashboard/mobileView_icons/burger_button.svg" />
            </div>
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    topbar:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        boxShadow:"1px 0px 34px rgba(0, 0, 0, 0.15)",
        background:"#FFFFFF",
        padding:"15px 26px 15px 27px"
    },
    topLogo:{
        width:"148.55px",
        height:"35px",
    },
    logoutButton:{
        // didplay:"flex",
        // flexDirection:"row",
       // margin:"5px 26px 0px 0px",
        // fontFamily:"Nunito Sans",
        // fontWeight:600,
        // fontSize:"18px",
        // lineHeight:"24.55px",
        // color:"#0556A7"
    },
    burger_buttonIcon:{
        width:"30px",
        height:"19px",
        marginBottom:"5px"
    }
}))

export default TopBarMobile