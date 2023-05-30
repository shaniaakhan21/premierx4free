import { makeStyles } from '../../../../../utils/makeStyles';
import {agentData} from '../customData'
import TableRow from './TableRow';
import { getAllAgents } from '../../../../../services/agent';
import { useAuth } from '../../../../../contexts/auth.context';
import { useEffect, useState } from 'react';
import {Pagination} from "@mui/lab";
function AgentDocuments():JSX.Element{
    useEffect(() => {
        getAllAgentsFunc()
    },[])
    const {classes} = useStyles()
    const [data,setData] = useState<[]>()
    const {user} = useAuth()
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    console.log("agentData is",skip,limit)
    const [thisUser,setThisUser] = useState(JSON.parse(localStorage.getItem('user') ?? ""))
    const getAllAgentsFunc = async() => {
        console.log("auth token is",thisUser?.jwtToken)
        const resp= await getAllAgents(thisUser?.jwtToken ?? "")
        console.log("response from agent docs",resp.data.data)
        let filteredData=resp.data.data.filter((data:typeof resp.data.data[0]) => {return data.status==="Pending"})
        console.log("filteredData",filteredData)
        setData(filteredData)
    } 
   // console.log("splice data is",splicedata)
    return(
        <div >
            <p className={classes.agentdocuments_Headingtext}>Agent Documents</p>
            <div className={classes.tableContainer}>
                <p className={classes.agentdocuments_text}>Upload Documents</p>
                <div className={classes.agentTable}>
                    {data?.slice(skip,limit+skip).map((dt,i)=>(
                        <TableRow data={dt} index={i} dataLength={data.length} />
                    ))}
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",margin:"25px 59px 0 0"}}>
            <Pagination count={data?.length ? Math.ceil(data?.length / limit) : 0} page={(skip / limit) + 1} onChange={(_, p) => setSkip(limit * (p - 1))} />
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
        color:"#000000"
    },
    agentdocuments_text:{
        fontFamily:"Nunito Sans",
        fontWeight:"600",
        fontSize:"20px",
        lineHeight:"27.28px",
        color:"#000000"
    },
    tableContainer:{
        marginTop:"31px",
        
    },
    agentTable:{
        margin:"25px 59px 0 0",
        '@media(max-width: 768px)':{
            margin:"0px"
    }
        // backgroundColor:"yellow"
    },
    agentTableMobile:{
        display:"none",
       // margin:"25px 59px 0 0",
        '@media(max-width: 768px)':{
            display:"block",
    }
        // backgroundColor:"yellow"
    },
}))

export default AgentDocuments