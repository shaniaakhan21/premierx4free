import useSWR from "swr";
import {getFetcher} from "../helpers/axiosFetchers";
import {GenericResponse} from "./genericResponse.type";
import User from "../models/user.model";

export const useAgentInfo = (user: User, agentId?: number | string) => useSWR(agentId ? ['/agent', user, [agentId]] : null, getFetcher<GenericResponse<User>>)
