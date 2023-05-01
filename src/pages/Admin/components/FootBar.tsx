import { makeStyles } from '../../../utils/makeStyles';

function FootBar() : JSX.Element{
    const {classes} = useStyles()
    return(
        <div className={classes.footbar}>
            <p className={classes.footbar_text}>Premierx4free | Copyright &copy; 2023 | All Rights Reserved</p>
        </div>
    )
}

const useStyles = makeStyles() (() => ({
    footbar:{
        textAlign:"center",
        borderTop:"1px solid #D6D9DB"
    },
    footbar_text:{
        fontFamily:"Nunito Sans",
        fontWeight:400,
        fontSize:"16px",
        lineHeight:"21.82px",
        color:"#AAB1B6"
    }
}))
export default FootBar