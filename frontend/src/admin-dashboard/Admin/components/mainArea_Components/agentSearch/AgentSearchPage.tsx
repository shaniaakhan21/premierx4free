import {makeStyles} from '../../../../../utils/makeStyles';
import { tableCellClasses } from '@mui/material/TableCell';
import React, {useState} from "react";
import { styled } from '@mui/material/styles';
import {Pagination} from "@mui/lab";
import {
  Button, Chip,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select, Skeleton,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow,
  TextField
} from "@mui/material";
import {useAuth} from "../../../../../contexts/auth.context";
import TablesComp from "../../../../../Dashboard/components/comission/component/TablesComp";
import moment from 'moment';
import useDebounceState from "../../../../../hooks/useDebounceState";
import EditAgent from './editAgent';
import Contract from '../../../../../models/contract.model';
import {
  AgentSearchBy,
  AgentSearchNormalResponse,
  AgentSearchResponse,
  useAgentSearch
} from "../../../../../services/agent";
import AgentProfile, {AgentStatus} from "../../../../../models/agentProfile.model";
import User from "../../../../../models/user.model";
import DoneIcon from '@mui/icons-material/Done'
import UpdateIcon from '@mui/icons-material/Update'
import KeyOffIcon from '@mui/icons-material/KeyOff'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const renderStatus = (status: AgentStatus) => {
  switch (status) {
    case AgentStatus.Active:
      return <Chip icon={<DoneIcon />} label="Active" color="success" />
    case AgentStatus.Pending:
      return <Chip icon={<UpdateIcon />} label="Pending" color="warning" />
    case AgentStatus.Suspended:
      return <Chip icon={<KeyOffIcon />} label="Suspended" color="error" />
  }
}

function AgentSearchPage(): JSX.Element {
    const { user } = useAuth()
    const [query, setQuery] = useDebounceState('', 200)
    const [by, setBy] = useState<AgentSearchBy>(AgentSearchBy.All)
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState<AgentSearchResponse<AgentSearchNormalResponse>['data'][0] | undefined>()

    const { data, isLoading, mutate } = useAgentSearch<AgentSearchNormalResponse>(user!, query, limit, skip, by)


    const { classes } = useStyles()
    return (
        <div className={classes.calculationPage_mainContainer}>
            {(showCreate || showEdit) && <EditAgent agent={showEdit} onClose={(shouldReload) => {
              setShowCreate(false)
              setShowEdit(undefined)
              if (shouldReload) {
                mutate()
              }
            }} />}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                style={{ minWidth: 400 }}
                id="query" label="Search" InputLabelProps={{ shrink: true }} variant="outlined" autoComplete='search' onChange={e => setQuery(e.target.value)} />
              <TextField
                style={{ minWidth: 200, marginLeft: 10 }}
                InputLabelProps={{ shrink: true }}
                select
                id="limit"
                label="Search By"
                onChange={e => setBy(e.target.value as AgentSearchBy)}
                value={by}
                variant="outlined"
              >
                {Object.entries(AgentSearchBy).map(([key, value], index) => (
                  <MenuItem value={value}>{key}</MenuItem>
                ))}
              </TextField>
            </div>
            <TableContainer component={Paper} style={{ marginTop: 20, marginBottom: 20 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Agent Name</StyledTableCell>
                    <StyledTableCell>Email address</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Companies</StyledTableCell>
                    <StyledTableCell align="center">Referral Code</StyledTableCell>
                    <StyledTableCell align="center">Contract / NDA Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading
                    ? [...Array(8).keys()].map((k) => <TableRow>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                      <StyledTableCell><Skeleton key={k} height={15} width='100%' /></StyledTableCell>
                    </TableRow>)
                    : data?.data?.data.map((row) => (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
                      key={row._id}
                      onClick={() => setShowEdit(row)}
                    >
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.user.email}</StyledTableCell>
                      <StyledTableCell align="center">{renderStatus(row.status)}</StyledTableCell>
                      <StyledTableCell>{row.companies?.map(c => <Chip style={{ margin: 2 }} key={c._id} label={c.name} variant="outlined" />)}</StyledTableCell>
                      <StyledTableCell align="center">{row.agentId}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.nda ? <Chip style={{ margin: 2 }} icon={<DoneIcon sx={{ fontSize: 24, color: 'white' }} />} label="NDA" color="success" /> : null}
                        {row.contract ? <Chip style={{ margin: 2 }} icon={<DoneIcon sx={{ fontSize: 24, color: 'white' }} />} label="Contract" color="success" /> : null}
                      </StyledTableCell>
                      {/*<StyledTableCell align="right">{row.contracts.employeeCount}</StyledTableCell>*/}
                      {/*<StyledTableCell align="right">${row.contracts.amountPerPerson}</StyledTableCell>*/}
                      {/*<StyledTableCell align="right">${row.contracts.amountPerPerson * row.contracts.employeeCount * row.contracts.commissionRate}</StyledTableCell>*/}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControl fullWidth style={{ maxWidth: 300 }}>
                <InputLabel id="limit-label">No of rows</InputLabel>
                <Select
                  labelId="limit-label"
                  id="limit"
                  label="No of rows"
                  onChange={e => setLimit(parseInt(e.target.value as string, 10))}
                  value={limit}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>50</MenuItem>
                </Select>
              </FormControl>
              <Pagination count={data?.data?.count ? Math.ceil(data?.data?.count / limit) : 0} page={(skip / limit) + 1} onChange={(_, p) => setSkip(limit * (p - 1))} />
            </div>
        </div>
    )
}

const useStyles = makeStyles()(() => ({
    calculationPage_mainContainer: {

    }
}))

export default AgentSearchPage
