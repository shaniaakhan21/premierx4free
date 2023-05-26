import {makeStyles} from '../../../../../utils/makeStyles';
import CalculationPageSecondTable from './CalculationPageSecondTable';
import {agentCalculationData} from '../customData';
import React, {useState} from "react";
import useDebounceState from "../../../../../hooks/useDebounceState";
import {ContactSearchBy, useContractSearch} from "../../../../../services/admin";
import {Pagination} from "@mui/lab";
import {
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

function CalculationPage(): JSX.Element {
    const { user } = useAuth()
    const [query, setQuery] = useDebounceState('', 200)
    const [by, setBy] = useState<ContactSearchBy>(ContactSearchBy.All)
    const [limit, setLimit] = useState(10)
    const [skip, setSkip] = useState(0)

    const { data, isLoading } = useContractSearch(user!, query, limit, skip, by)

    const { classes } = useStyles()
    return (
        <div className={classes.calculationPage_mainContainer} >
            <div style={{ display: 'flex' }}>
              <TextField
                style={{ minWidth: 400, marginLeft: 10 }}
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
                    <TableCell>Agent Name</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell align="right">Commission Rate</TableCell>
                    <TableCell align="right">Contract Start Date</TableCell>
                    <TableCell align="right">Contract End Date</TableCell>
                    <TableCell align="right">Monthly Membership Paid (No. of People)</TableCell>
                    <TableCell align="right">Amount Paid Per Person</TableCell>
                    <TableCell align="right">Total Pay</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading
                    ? [...Array(8).keys()].map((k) => <TableRow>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                      <TableCell><Skeleton key={k} height={15} width='100%' /></TableCell>
                    </TableRow>)
                    : data?.data?.data.map((row) => (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      key={row.contracts._id}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.companies.name}</TableCell>
                      <TableCell align="right">{row.contracts.commissionRate}</TableCell>
                      <TableCell align="center">{moment(row.contracts.start).format('YYYY-MM-DD')}</TableCell>
                      <TableCell align="center">{moment(row.contracts.end).format('YYYY-MM-DD')}</TableCell>
                      <TableCell align="right">{row.contracts.employeeCount}</TableCell>
                      <TableCell align="right">${row.contracts.amountPerPerson}</TableCell>
                      <TableCell align="right">${row.contracts.amountPerPerson * row.contracts.employeeCount * row.contracts.commissionRate}</TableCell>
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
