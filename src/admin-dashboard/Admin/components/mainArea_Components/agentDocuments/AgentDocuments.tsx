import { makeStyles } from '../../../../../utils/makeStyles';
import {agentData} from '../customData'
import TableRow from './TableRow';
import TableRowMobile from './TableRowMobile'

function AgentDocuments():JSX.Element{
    const {classes} = useStyles()
    console.log("agentData is",agentData)
    return(
        <div >
            <p className={classes.agentdocuments_Headingtext}>Agent Documents</p>
            <div className={classes.tableContainer}>
                <p className={classes.agentdocuments_text}>Upload Documents</p>
                <div className={classes.agentTable}>
                    {agentData?.map((dt,i)=>(
                        <TableRow agentData={dt} index={i} dataLength={agentData.length} />
                    ))}
                </div>
                <div className={classes.agentTableMobile}>
                    {agentData?.map((dt,i)=>(
                        <TableRowMobile agentData={dt} index={i} dataLength={agentData.length} />
                    ))}
                </div>
            </div>
            

        </div>
    )
}

const useStyles = makeStyles() (() => ({
    agentdocuments_Headingtext:{
        fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"24px",
        lineHeight:"32.74px",
        color:"#000000",
        '@media (max-width:600px)':{
            fontSize:"19px",
            lineHeight:"25.92px",
        }
    },
    agentdocuments_text:{
        fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"20px",
        lineHeight:"27.28px",
        color:"#000000",
        '@media (max-width:600px)':{
            fontSize:"17px",
            lineHeight:"23.19px",
        }
    },
    tableContainer:{
        marginTop:"31px",
        
    },
    agentTable:{
        margin:"25px 59px 0 0",
        '@media(max-width: 768px)':{
            display:"none",
    }
        // backgroundColor:"yellow"
    },
    agentTableMobile:{
        display:"none",
        '@media(max-width: 600px)':{
            display:"block",
        }

    }
}))

export default AgentDocuments