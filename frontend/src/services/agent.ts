import useSWR from "swr";
import {getFetcher} from "../helpers/axiosFetchers";
import {GenericResponse} from "./genericResponse.type";
import User from "../models/user.model";
import axios from "axios";

export const useAgentInfo = (user: User, agentId?: number | string) => useSWR(agentId ? ['/agent', user, [agentId]] : null, getFetcher<GenericResponse<User>>)
export const getAllAgents = async(token:string) =>{
    return await axios.get('/agent/data/getAll',{headers:{"Authorization":`Bearer ${token}`}})
} 