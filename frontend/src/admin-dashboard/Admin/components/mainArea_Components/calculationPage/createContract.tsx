import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import {
  AgentSearchBy,
  AgentSearchPickerResponse,
  getAgentProfile,
  useAgentSearch
} from "../../../../../services/agent";
import useDebounceState from "../../../../../hooks/useDebounceState";
import { useAuth } from "../../../../../contexts/auth.context";
import { ContractSearchResponse, createContract, updateContract } from "../../../../../services/admin";
import Contract from "../../../../../models/contract.model";
import { Backdrop, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useInputState } from "../../../../../hooks/useInputState";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import moment, { Moment } from "moment-timezone";
import { MobileDatePicker } from '@mui/x-date-pickers';

export type CreateContractProps = {
  contract?: ContractSearchResponse['data'][0]
  onClose: (shouldReload?: boolean) => void;
}

export default function CreateContract({ onClose, contract }: CreateContractProps) {
  const { user } = useAuth()
  const [query, setQuery] = useDebounceState('', 200);
  const { data, isLoading } = useAgentSearch<AgentSearchPickerResponse>(user!, query, 10, 0, AgentSearchBy.Name, true);
  const [state, onChange, setState] = useInputState<Partial<Pick<Contract, 'company' | 'start' | 'end'> & {
    agent: AgentSearchPickerResponse,
    employeeCount: string,
    commissionRates: number[],
    amountPerPerson: string
  }>>({
    start: moment().startOf('month').toDate(),
    end: moment().endOf('month').toDate(),
  })
  const [showBackDrop, setShowBackDrop] = useState(false)
  const [loading, setLoading] = useState<string | undefined>()

  useEffect(() => {
    if (state.agent && state.company && !contract) {
      const company = state.agent.companies?.find(c => c._id === state.company)
      if (!company) return
      setState(cs => ({
        ...cs,
        employeeCount: company.employeeCount?.toString(),
        commissionRates: company.commissionRates
      }))
    }
  }, [state.agent, state.company, contract])

  // Load contract details
  const loadContract = useCallback(async () => {
    try {
      if (!contract) return
      setLoading('Loading contract details')
      setShowBackDrop(true)
      const agent = await getAgentProfile(user!, contract._id)
      setState({
        agent: agent.data,
        company: contract.contracts.company,
        start: contract.contracts.start,
        end: contract.contracts.end,
        employeeCount: contract.contracts.employeeCount.toString(),
        commissionRates: contract.contracts.commissionRates,
        amountPerPerson: contract.contracts.amountPerPerson.toString(),
      });
    } finally {
      setShowBackDrop(false)
      setLoading(undefined)
    }
  }, [user, contract])

  useEffect(() => {
    loadContract()
  }, [contract])

  const onSubmit = useCallback(async () => {
    try {
      if (!state.agent) throw new Error('Please select an agent')
      if (!state.company) throw new Error('Please select a company')
      if (!state.start) throw new Error('Please select a start date')
      if (!state.end) throw new Error('Please select an end date')
      if (!state.employeeCount || parseInt(state.employeeCount, 10) < 1) throw new Error('Please enter valid Employee count')
      if (!state.amountPerPerson || parseInt(state.amountPerPerson, 10) < 1) throw new Error('Please enter valid Amount per person')

      setLoading(contract ? 'Updating contract' : 'Creating new contract')
      setShowBackDrop(true)

      await (contract ? updateContract : createContract)(user!, {
        _id: contract?.contracts?._id!,
        start: moment(state.start).startOf('day').toDate(),
        end: moment(state.end).endOf('day').toDate(),
        company: state.company!,
        agent: state.agent!._id,
        employeeCount: parseInt(state.employeeCount, 10),
        commissionRates: state.commissionRates ?? [],
        amountPerPerson: parseInt(state.amountPerPerson, 10),
      })

      setLoading(`Contract ${contract ? 'updated' : 'created'} successfully`)
      setTimeout(() => {
        setShowBackDrop(false)
        onClose(true)
      }, 1000)
    } catch (e: any) {
      alert(e.response?.data?.message ?? e.message)
      setShowBackDrop(false)
    } finally {
      setLoading(undefined)
    }
  }, [state, user, contract])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1, flexDirection: 'column' }}
        open={showBackDrop}
      >
        {loading?.endsWith('successfully') ? <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} /> :
          <CircularProgress color="inherit" />}
        {loading}
      </Backdrop>
      <Dialog maxWidth='lg' fullWidth open onClose={() => onClose()}>
        <DialogTitle>{contract ? `Update contract [ ${contract.name} - ${contract.companies.name} ]` : 'Create new contract'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: 5 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <MobileDatePicker<Moment>
                  label="Start Date"
                  value={state.start ? moment(state.start) : moment()}
                  onChange={(date) => setState(cs => ({ ...cs, start: date?.toDate() }))}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <MobileDatePicker<Moment>
                  label="End Date"
                  value={state.end ? moment(state.end) : moment()}
                  onChange={(date) => setState(cs => ({ ...cs, end: date?.toDate() }))}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Autocomplete<AgentSearchPickerResponse>
                  isOptionEqualToValue={(option, value) => option._id?.toString() === value?._id?.toString()}
                  loading={isLoading}
                  filterOptions={(x) => x}
                  options={data?.data?.data ?? []}
                  onInputChange={(event, v) => {
                    setQuery(v);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Agent" placeholder="Select Agent"
                               InputLabelProps={{ shrink: true }} />
                  )}
                  getOptionLabel={(option) => option?.name ?? ''}
                  value={state.agent || null}
                  noOptionsText="No agents found"
                  onChange={(event: any, value) => {
                    setState(cs => ({ ...cs, agent: value ?? undefined }));
                  }}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="company-label" shrink disabled={!state.agent}>Company</InputLabel>
                <Select
                  disabled={!state.agent}
                  labelId="company-label"
                  value={state?.company ?? ''}
                  label="Company"
                  onChange={(e) => setState(cs => ({ ...cs, company: e.target.value }))}
                >
                  {state.agent?.companies?.map(c => (<MenuItem value={c._id}>{c.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4} md={2}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="commissionRate"
                label="Commission Lv.0"
                type="number"
                fullWidth
                value={state?.commissionRates?.[0] ?? ''}
                onChange={(e) => setState(cs => (cs && { ...cs, commissionRates: cs.commissionRates?.map((c, idx) => idx === 0 ? parseFloat(e.target.value) : c) }))}
              />
            </Grid>
            <Grid item xs={4} md={2}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="commissionRate"
                label="Commission Lv.1"
                type="number"
                fullWidth
                value={state?.commissionRates?.[1] ?? ''}
                onChange={(e) => setState(cs => (cs && { ...cs, commissionRates: cs.commissionRates?.map((c, idx) => idx === 1 ? parseFloat(e.target.value) : c) }))}
              />
            </Grid>
            <Grid item xs={4} md={2}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="commissionRate"
                label="Commission Lv.2"
                type="number"
                fullWidth
                value={state?.commissionRates?.[2] ?? ''}
                onChange={(e) => setState(cs => (cs && { ...cs, commissionRates: cs.commissionRates?.map((c, idx) => idx === 2 ? parseFloat(e.target.value) : c) }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                disabled={!state.agent}
                name="employeeCount"
                label="Employee Count"
                type="number"
                fullWidth
                value={state.employeeCount ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                disabled={!state.agent}
                name="amountPerPerson"
                label="Amount Per Person"
                type="number"
                fullWidth
                value={state.amountPerPerson ?? ''}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={() => onClose()}>Cancel</Button>
          <Button variant='contained' onClick={onSubmit}>{contract ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
