import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  AgentSearchBy, AgentSearchNormalResponse,
  AgentSearchPickerResponse, AgentSearchResponse,
  getAgentProfile, updateAgentProfile, UpdateAgentProfileRequest,
  useAgentSearch
} from "../../../../../services/agent";
import useDebounceState from "../../../../../hooks/useDebounceState";
import {useAuth} from "../../../../../contexts/auth.context";
import {ContactSearchBy, ContractSearchResponse, createContract, updateContract} from "../../../../../services/admin";
import AgentProfile, {AgentProfileCompany, AgentStatus} from "../../../../../models/agentProfile.model";
import {useCallback, useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";
import {
  Accordion, AccordionDetails,
  AccordionSummary, Alert, Avatar,
  Backdrop, Box, Checkbox, Chip,
  CircularProgress,
  FormControl, FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem, OutlinedInput,
  Select, Typography
} from "@mui/material";
import {useInputState} from "../../../../../hooks/useInputState";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment, { Moment } from "moment-timezone";
import { MobileDatePicker } from '@mui/x-date-pickers';
import { MuiFileInput } from 'mui-file-input';
import {uploadDocument} from "../../../../../services/upload";
import {Roles} from "../../../../../models/user.model";
import {AlertTitle} from "@mui/lab";

export type CreateContractProps = {
  agent?: AgentSearchResponse<AgentSearchNormalResponse>['data'][0]
  onClose: (shouldReload?: boolean) => void;
}

export default function EditAgent({ onClose, agent }: CreateContractProps) {
  const { user } = useAuth()
  const [query, setQuery] = useDebounceState('', 200);
  const { data, isLoading } = useAgentSearch<AgentSearchPickerResponse>(user!, query, 10, 0, AgentSearchBy.Name, true);
  const [state, onChange, setState] = useInputState<UpdateAgentProfileRequest>({})
  const [showBackDrop, setShowBackDrop] = useState(false)
  const [loading, setLoading] = useState<string | undefined>()
  const [expanded, onChangeCompany, setExpanded] = useInputState<AgentProfileCompany | undefined>(undefined);

  useEffect(() => {
    setState({
      roles: agent?.user.roles,
      status: agent?.status,
      name: agent?.name,
      email: agent?.user?.email,
      contactNo: agent?.contactNo,
      companies: agent?.companies,
      zip: agent?.location?.zip,
      city: agent?.location?.city,
      state: agent?.location?.state,
      address: agent?.location?.address,
      nda: agent?.nda,
      contract: agent?.contract,
      profileImage: agent?.profileImage
    });
  }, [agent])

  const handleFileChange = useCallback((type: 'nda' | 'contract' | 'profileImage') => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(`Uploading ${type}...`)
        setShowBackDrop(true)
        const uploaded = await uploadDocument(user!, file)
        setState(cs => ({ ...cs, [type]: uploaded?.[0] }))
      } finally {
        setLoading(undefined)
        setShowBackDrop(false)
      }
    }
  }, [user])

  const onSubmit = useCallback(async () => {
    try {

      setLoading(agent ? 'Updating agent' : 'Creating new agent')
      setShowBackDrop(true)

      await updateAgentProfile(user!, {
        ...state,
        _id: agent?._id!,
      })

      setLoading(`Agent ${agent ? 'updated' : 'created'} successfully`)
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
  }, [state, user, agent])

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1, flexDirection: 'column' }}
        open={showBackDrop}
      >
        {loading?.endsWith('successfully') ? <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} /> : <CircularProgress color="inherit" />}
        {loading}
      </Backdrop>
      <Dialog maxWidth='lg' fullWidth open onClose={() => onClose()}>
        <DialogTitle>{agent ? `Update agent [ ${agent.name} ]` : 'Create new agent'}</DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Removing company is irreversible & uploading new NDA / Contract / Profile Image will <strong>replace existing one</strong> and <strong>no longer be accessible</strong>.
          </Alert>
          <Grid container spacing={2} style={{ marginTop: 5 }}>
            <Grid item xs={12} md={6} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Avatar sx={{ width: 100, height: 100 }} alt={state.name?.toUpperCase() ?? ''} variant='rounded' sizes='100%' src={agent?.profileImage && `/api/uploads/profileImage/${agent?.profileImage}`} />
              <TextField
                InputLabelProps={{ shrink: true }}
                type="file"
                id="profileImage"
                label="Profile Image"
                name="profileImage"
                helperText="Upload again will replace exisiting image"
                fullWidth
                value={''}
                onChange={handleFileChange('profileImage')}
              />
              {state?.profileImage && <Button onClick={() => setState(cs => ({ ...cs, profileImage: undefined }))} variant='contained' color='error' style={{
                marginTop: 10,
                marginLeft: 10,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 16,
                paddingBottom: 16
              }}>Remove</Button>}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Roles</InputLabel>
                <Select<Roles[]>
                  labelId="role-label"
                  multiple
                  value={state.roles ?? []}
                  onChange={onChange as any}
                  input={<OutlinedInput label="Roles" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {Object.values(Roles).map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  id="status"
                  label="Status"
                  onChange={onChange as any}
                  value={state?.status ?? ''}
                >
                  {Object.values(AgentStatus).map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={state.name ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="contactNo"
                label="Contact Number"
                type="text"
                fullWidth
                value={state.contactNo ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="email"
                label="E-Mail"
                type="email"
                fullWidth
                value={state.email ?? ''}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name="password"
                label="Password"
                type="password"
                autoComplete='new-password'
                helperText="Leave blank to not change"
                fullWidth
                value={state.password ?? ''}
                onChange={onChange}
              />
            </Grid>
            {([
              {
                k: 'address',
                l: 'Address'
              },
              {
                k: 'zip',
                l: 'Zip'
              },
              {
                k: 'city',
                l: 'City'
              },
              {
                k: 'state',
                l: 'State'
              }
            ] as { k: keyof AgentProfile['location']; l: string }[]).map(({ k, l }) => (<Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                name={k}
                label={l}
                type="text"
                fullWidth
                value={state[k] ?? ''}
                onChange={onChange}
              />
            </Grid>))}
            <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                type="file"
                id="nda"
                label="NDA"
                name="nda"
                helperText="Upload again will replace exisiting agreement"
                fullWidth
                value={''}
                onChange={handleFileChange('nda')}
              />
              {agent?.nda && <a href={`/api/uploads/nda/${agent?.nda}`} download>
                <Button variant='contained' color='primary' style={{
                  marginTop: 10,
                  marginLeft: 10,
                  paddingLeft: 25,
                  paddingRight: 25,
                  paddingTop: 16,
                  paddingBottom: 16
                }}>Download</Button>
              </a>}
              {state?.nda && <Button onClick={() => setState(cs => ({ ...cs, nda: undefined }))} variant='contained' color='error' style={{
                marginTop: 10,
                marginLeft: 10,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 16,
                paddingBottom: 16
              }}>Remove</Button>}
            </Grid>
            <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                type="file"
                id="contract"
                label="Contract"
                name="contract"
                helperText="Upload again will replace exisiting agreement"
                fullWidth
                value={''}
                onChange={handleFileChange('contract')}
              />
              {agent?.contract && <a href={`/api/uploads/contract/${agent?.contract}`} download>
                <Button variant='contained' color='primary' style={{
                  marginTop: 10,
                  marginLeft: 10,
                  paddingLeft: 25,
                  paddingRight: 25,
                  paddingTop: 16,
                  paddingBottom: 16
                }}>Download</Button>
              </a>}
              {state?.contract && <Button onClick={() => setState(cs => ({ ...cs, contract: undefined }))} variant='contained' color='error' style={{
                marginTop: 10,
                marginLeft: 10,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 16,
                paddingBottom: 16
              }}>Remove</Button>}
            </Grid>
          </Grid>
          <Typography sx={{ marginTop: 2, marginBottom: 1, marginLeft: 2, fontWeight: 'bold', fontSize: 18 }}>
            Companies
          </Typography>
          {state.companies?.map(company => <Accordion key={company._id} expanded={expanded?._id === company._id} onChange={() => { setExpanded(c => !c || c?._id !== company?._id ? {...company} : undefined) }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {company.name}
              </Typography>
              {company.typeOfBusiness && <Typography sx={{color: 'text.secondary'}}>{company.typeOfBusiness}</Typography>}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} style={{ marginTop: 5 }}>
                {([
                  {
                    k: 'name',
                    l: 'Name'
                  },
                  {
                    k: 'typeOfBusiness',
                    l: 'Type Of Business'
                  },
                  {
                    k: 'contactPersonName',
                    l: 'Contact Person Name'
                  },
                  {
                    k: 'contactPersonPhone',
                    l: 'Contact Person Phone'
                  },
                  {
                    k: 'fullTime',
                    l: 'Full Time'
                  },
                  {
                    k: 'partTime',
                    l: 'Part Time'
                  },
                  {
                    k: 'phone',
                    l: 'Phone Number'
                  }
                ] as { k: keyof AgentProfile['location']; l: string }[]).map(({ k, l }) => (<Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    name={k}
                    label={l}
                    type="text"
                    fullWidth
                    value={expanded?.[k] ?? ''}
                    onChange={onChangeCompany}
                  />
                </Grid>))}
                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    name="commissionRate"
                    label="Commission Rate"
                    type="text"
                    fullWidth
                    value={expanded?.commissionRate ?? ''}
                    onChange={onChangeCompany}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    name="employeeCount"
                    label="Employee Count"
                    type="text"
                    fullWidth
                    value={expanded?.employeeCount ?? ''}
                    onChange={onChangeCompany}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    name="insuranceInfo"
                    label="Insurance Info"
                    type="text"
                    fullWidth
                    value={expanded?.insuranceInfo ?? ''}
                    onChange={onChangeCompany}
                  />
                </Grid>
                <Grid item xs={12} md={6} textAlign='center'>
                  <FormControlLabel control={<Checkbox name="fullInsured" onChange={onChangeCompany} checked={expanded?.fullInsured ?? false} />} label="Full Insured" />
                </Grid>
                <Grid item xs={12} md={6} textAlign='center'>
                  <FormControlLabel control={<Checkbox name="selfInsured" onChange={onChangeCompany} checked={expanded?.selfInsured ?? false} />} label="Self Insured" />
                </Grid>
                <Grid item xs={12} md={6} textAlign='center'>
                  <FormControlLabel control={<Checkbox name="notInsured" onChange={onChangeCompany} checked={expanded?.notInsured ?? false} />} label="Not Insured" />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    multiline
                    rows={3}
                    InputLabelProps={{ shrink: true }}
                    name="address"
                    label="Address"
                    fullWidth
                    value={expanded?.address ?? ''}
                    onChange={onChangeCompany}
                  />
                </Grid>
              </Grid>
              <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <Button variant='contained' color='error' onClick={() => setState(cs => ({ ...cs, companies: cs.companies?.filter(c => c._id !== expanded?._id) }))}>Delete</Button>
                <Button variant='contained' onClick={() => {
                  setState(cs => ({ ...cs, companies: cs.companies?.map(c => c._id === expanded?._id ? expanded! : c) }))
                  setExpanded(undefined)
                }}>Save</Button>
              </div>
            </AccordionDetails>
          </Accordion>)}
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={() => onClose()}>Cancel</Button>
          <Button variant='contained' onClick={onSubmit}>{agent ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
