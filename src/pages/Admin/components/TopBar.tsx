
import { makeStyles } from '../../../utils/makeStyles'
function TopBar(): JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.topbar}>
            <div className={classes.logoutButton}>
                <p>Logout</p>
            </div>
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    topbar:{
        display:"flex",
        flexDirection:"row-reverse",
        boxShadow:"1px 0px 34px rgba(0, 0, 0, 0.15)",
        background:"#FFFFFF"
    },
    logoutButton:{
        margin:"5px 50px 0px 0px",
        fontFamily:"Nunito Sans",
        fontWeight:600,
        fontSize:"18px",
        lineHeight:"24.55px",
        color:"#0556A7"
    }
}))

export default TopBar