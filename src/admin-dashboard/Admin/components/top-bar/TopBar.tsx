
import { makeStyles } from '../../../../utils/makeStyles'
function TopBar(): JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.topbar}>
            <div className={classes.logoutButton}>
                <div></div>
                <p><img className={classes.buttonIcon} src="/assets/svg/logout.svg" /> Logout</p>
            </div>
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    topbar:{
        display:"flex",
        flexDirection:"row-reverse",
        boxShadow:"1px 0px 34px rgba(0, 0, 0, 0.15)",
        background:"#FFFFFF",
        '@media(max-width: 768px)':{
                display:"none",
        }
    },
    logoutButton:{
        didplay:"flex",
        flexDirection:"row",
        margin:"5px 50px 0px 0px",
        fontFamily:"Nunito Sans",
        fontWeight:600,
        fontSize:"18px",
        lineHeight:"24.55px",
        color:"#0556A7"
    },
    buttonIcon:{
        width:"15px",
        height:"17.14px",
        marginBottom:"5px"
    },
    
}))

export default TopBar