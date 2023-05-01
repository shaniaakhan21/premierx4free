import { makeStyles } from '../../../utils/makeStyles';
import Logo from '../../../components/Logo';
import { Height } from '@material-ui/icons';
import { BorderRight } from '@mui/icons-material';
import { color, fontFamily } from '@mui/system';

function Sidebar():JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.sidebar_mainContainer}>
            <div className={classes.sidebar_topRectangle}>
                <div className={classes.topRectangle_logo}>
                    <Logo className={classes.logo} />
                </div>
                <div className={classes.topRectangle_displayImage}>
                    <img src='/assets/svg/Team/randy.svg' className={classes.displayImage} />
                </div>
                <div className={classes.topRectangle_text}>
                    <p className={classes.nameText}>Edwin Zam</p>
                    <span className={classes.emailText}>edwinzam@gmail.com</span>
                </div>  
            </div>
            
            <div className={classes.sidebar_navigation}>
                        <div className={classes.navigation_li}>Agent Documents</div>
                        <div className={classes.navigation_li}>Calculation Page</div>
                        <div className={classes.navigation_li}>Marketing Materials</div>
                        <div className={classes.navigation_li}>Settings</div>
            </div>
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    sidebar_mainContainer:{
        width:"275px",
        borderRight:"1px solid #D6D9DB"
    },
    sidebar_topRectangle:{
        width:"100%",
        height:"345px",
        background:"linear-gradient(205.19deg, #64B5F6 1.82%, #0556A7 100%)"
    },
    topRectangle_displayImage:{
        textAlign:"center"
    },
    topRectangle_logo:{
        textAlign:"center"
    },
    displayImage:{
        width:"145px",
        Height:"145px",
        marginTop:"40px"
    },
    logo:{
        width:"217.34px",
        height:"51px",
        marginTop:"22px"
    },
    topRectangle_text:{
        textAlign:"center",
        marginTop:"4px"
    },
    nameText:{
        fontFamily:"Nunito Sans",
        fontWeight:700,
        fontSize:"27px",
        lineHeight:"36.83px",
        color:"#FFFFFF"
    },
    emailText:{
        fontFamily:"Nunito Sans",
        fontWeight:400,
        fontSize:"18px",
        lineHeight:"24.55px",
        color:"#FFFFFF"
    },
    sidebar_navigation:{

    },
    navigation_ul:{
        listStyleType:"none"
    },
    navigation_li:{
        width:"100%",
        fontFamily:"Nunito Sans",
        fontWeight:400,
        fontSize:"17px",
        lineHeight:"23.19px",
        color:"#667B8B",
        padding:"10px",
        "&:hover":{
            backgroundColor:"#F4F6F8",
            cursor:"pointer",
            color:"#000000"
        }
    }
}))

export default Sidebar