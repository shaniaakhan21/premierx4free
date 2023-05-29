import {makeStyles} from '../../../../../utils/makeStyles';
import { tableCellClasses } from '@mui/material/TableCell';
import React, {useState} from "react";
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {ContactSearchBy, ContractSearchResponse, useContractSearch} from "../../../../../services/admin";
import {Pagination} from "@mui/lab";
import {
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
import CreateContract from './createContract';
import Contract from '../../../../../models/contract.model';

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

function CalculationPage(): JSX.Element {
    const { user } = useAuth()
    const [query, setQuery] = useDebounceState('', 200)
    const [by, setBy] = useState<ContactSearchBy>(ContactSearchBy.All)
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)
    const [showCreateContract, setShowCreateContract] = useState(false)
    const [showEditContract, setShowEditContract] = useState<ContractSearchResponse['data'][0] | undefined>()

    const { data, isLoading, mutate } = useContractSearch(user!, query, limit, skip, by)


    const { classes } = useStyles()
    return (
        <div className={classes.calculationPage_mainContainer}>
            <Fab onClick={() => setShowCreateContract(true)} color="primary" aria-label="add" style={{ position: 'fixed', bottom: 50, right: 70 }}>
              <AddIcon />
            </Fab>
            {(showCreateContract || showEditContract) && <CreateContract contract={showEditContract} onClose={(shouldReload) => {
              setShowCreateContract(false)
              setShowEditContract(undefined)
              if (shouldReload) {
                mutate()
              }
            }} />}
            <div style={{ display: 'flex' }}>
              <TextField
                style={{ minWidth: 400 }}
                id="query" label="Search" variant="outlined" autoComplete='search' onChange={e => setQuery(e.target.value)} />
              <TextField
                style={{ minWidth: 200, marginLeft: 10 }}
                select
                id="limit"
                label="Search By"
                onChange={e => setBy(e.target.value as ContactSearchBy)}
                value={by}
              >
                {Object.entries(ContactSearchBy).map(([key, value], index) => (
                  <MenuItem value={value}>{key}</MenuItem>
                ))}
              </TextField>
            </div>
            <TableContainer component={Paper} style={{ marginTop: 20, marginBottom: 20 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Agent Name</StyledTableCell>
                    <StyledTableCell>Company Name</StyledTableCell>
                    <StyledTableCell align="right">Commission Rate</StyledTableCell>
                    <StyledTableCell align="right">Contract Start Date</StyledTableCell>
                    <StyledTableCell align="right">Contract End Date</StyledTableCell>
                    <StyledTableCell align="right">Monthly Membership Paid (No. of People)</StyledTableCell>
                    <StyledTableCell align="right">Amount Paid Per Person</StyledTableCell>
                    <StyledTableCell align="right">Total Pay</StyledTableCell>
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
                      key={row.contracts._id}
                      onClick={() => setShowEditContract(row)}
                    >
                      <StyledTableCell>{row.name}</StyledTableCell>
                      <StyledTableCell>{row.companies.name}</StyledTableCell>
                      <StyledTableCell align="right">{row.contracts.commissionRate}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.contracts.start).format('YYYY-MM-DD')}</StyledTableCell>
                      <StyledTableCell align="center">{moment(row.contracts.end).format('YYYY-MM-DD')}</StyledTableCell>
                      <StyledTableCell align="right">{row.contracts.employeeCount}</StyledTableCell>
                      <StyledTableCell align="right">${row.contracts.amountPerPerson}</StyledTableCell>
                      <StyledTableCell align="right">${row.contracts.amountPerPerson * row.contracts.employeeCount * row.contracts.commissionRate}</StyledTableCell>
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

export default CalculationPage
