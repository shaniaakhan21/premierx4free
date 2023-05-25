import useSWR from "swr"
import {getFetcher} from "../helpers/axiosFetchers";
import {GenericResponse} from "./genericResponse.type";
import User from "../models/user.model";
import AgentProfile from "../models/agentProfile.model";

export type MyDashboardResponseRow = {
  commission: number,
  agent: AgentProfile,
}
export const useMyDashboard = (user: User) => useSWR(['/my/dashboard', user], getFetcher<GenericResponse<MyDashboardResponseRow[]>>)
