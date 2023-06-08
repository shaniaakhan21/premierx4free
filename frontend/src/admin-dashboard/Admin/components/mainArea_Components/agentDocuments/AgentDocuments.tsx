import { makeStyles } from '../../../../../utils/makeStyles';
import TableRow from './TableRow';
import { getAllAgents } from '../../../../../services/agent';
import { useAuth } from '../../../../../contexts/auth.context';
import { useEffect, useState } from 'react';
import { Pagination } from "@mui/lab";
import AgentProfile from "../../../../../models/agentProfile.model";

function AgentDocuments() {
  useEffect(() => {
    getAllAgentsFunc()
  }, [])
  const { classes } = useStyles()
  const [data, setData] = useState<AgentProfile[]>()
  const { user } = useAuth()
  const [limit, setLimit] = useState(10)
  const [skip, setSkip] = useState(0)

  const [thisUser, setThisUser] = useState(JSON.parse(localStorage.getItem('user') ?? ""))
  const getAllAgentsFunc = async () => {
    const resp = await getAllAgents(thisUser?.jwtToken ?? "")

    let filteredData = resp.data.data.filter((data: typeof resp.data.data[0]) => {
      return data.status === "Pending"
    })

    setData(filteredData)
  }

  return (
    <div>
      <p className={classes.agentdocuments_Headingtext}>Agent Documents</p>
      <div className={classes.tableContainer}>
        <p className={classes.agentdocuments_text}>Upload Documents</p>
        <div className={classes.agentTable}>
          {data?.slice(skip, limit + skip).map((dt, i) => (
            <TableRow reqReload={() => getAllAgentsFunc()} data={dt} index={i} dataLength={data.length} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", margin: "25px 59px 0 0" }}>
        <Pagination count={data?.length ? Math.ceil(data?.length / limit) : 0} page={(skip / limit) + 1}
                    onChange={(_, p) => setSkip(limit * (p - 1))} />
      </div>

    </div>
  )
}

const useStyles = makeStyles()(() => ({
  agentdocuments_Headingtext: {
    fontFamily: "Nunito Sans",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "32.74px",
    color: "#000000"
  },
  agentdocuments_text: {
    fontFamily: "Nunito Sans",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "27.28px",
    color: "#000000"
  },
  tableContainer: {
    marginTop: "31px",

  },
  agentTable: {
    margin: "25px 59px 0 0",
    '@media(max-width: 768px)': {
      margin: "0px"
    }
    // backgroundColor:"yellow"
  },
  agentTableMobile: {
    display: "none",
    // margin:"25px 59px 0 0",
    '@media(max-width: 768px)': {
      display: "block",
    }
    // backgroundColor:"yellow"
  },
}))

export default AgentDocuments
