import useSWR from "swr"
import {getFetcher} from "../helpers/axiosFetchers";
import {GenericResponse} from "./genericResponse.type";
import User from "../models/user.model";
import AgentProfile, {AgentProfileCompany} from "../models/agentProfile.model";
import Contract from "../models/contract.model";

export type ReferralClient = {
  commission: number
  agent: AgentProfile
}
export const useMyDashboard = (user: User, from: Date, to: Date) => useSWR(['/my/dashboard', user, [from.toISOString().split('T')[0], to.toISOString().split('T')[0]]], getFetcher<GenericResponse<{
  referrals: ReferralClient[],
  directs: AgentProfileCompany[],
  summary: {
    referrals: Contract[],
    directs: Contract[],
  }
}>>)
