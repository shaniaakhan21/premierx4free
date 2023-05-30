import useSWR from "swr";
import {getFetcher, patchFetcher, putFetcher} from "../helpers/axiosFetchers";
import {GenericResponse} from "./genericResponse.type";
import User, {Roles} from "../models/user.model";
import {ContactSearchBy, ContractSearchResponse} from "./admin";
import AgentProfile, {AgentProfileCompany} from "../models/agentProfile.model";
import Contract from "../models/contract.model";

export const useAgentInfo = (user: User, agentId?: number | string) => useSWR(agentId ? ['/agent', user, [agentId]] : null, getFetcher<GenericResponse<User>>)

export enum AgentSearchBy {
  All = 'all',
  Name = 'name',
  ContactNo = 'contactNo',
  CompanyName = 'companies.name',
  Email = 'user.email',
  ContactPersonName = 'companies.contactPersonName',
  ContactPersonPhone = 'companies.contactPersonPhone',
  Comment = 'companies.comment'
}

export type AgentSearchResponse<T> = {
  count: number
  data: T[]
}

export type AgentSearchPickerResponse = Pick<AgentProfile, '_id' | 'agentId' | 'name' | 'companies'>

export type AgentSearchNormalResponse = AgentProfile & { user: User }

export const useAgentSearch = <T = AgentSearchNormalResponse | AgentSearchPickerResponse>(user: User, q?: string, limit?: number, skip?: number, by?: AgentSearchBy, picker?: boolean) => useSWR(['/agent/search', user, [limit, skip], { q, by, picker }], getFetcher<GenericResponse<AgentSearchResponse<T>>>)

export const getAgentUser = async (user: User, agentId: AgentProfile['agentId']) => {
  return getFetcher<GenericResponse<User>>(['/agent', user, [agentId.toString()], undefined])
}

export const getAgentProfile = async (user: User, agentId: AgentProfile['_id']) => {
  return getFetcher<GenericResponse<AgentProfile>>(['/agent/profile', user, [agentId.toString()], undefined])
}

export type UpdateAgentProfileRequest = Partial<Pick<AgentProfile, '_id' | 'status' | 'profileImage' | 'nda' | 'contract' | 'companies' | 'name' | 'contactNo'> & { email: string, password: string, roles: Roles[] } & AgentProfile['location']>

export const updateAgentProfile = async (user: User, data: UpdateAgentProfileRequest) => {
  return patchFetcher<UpdateAgentProfileRequest, GenericResponse<AgentProfile>>(['/agent', data, user, undefined, undefined])
}
