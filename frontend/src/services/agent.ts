import useSWR from "swr";
import {getFetcher} from "../../helpers/axiosFetchers";
import {GenericResponse} from "./genericResponse.type";
import User from "../models/user.model";

export const useAgentInfo = (user: User, agentId: number) => useSWR(['/agent', user, [agentId]], getFetcher<GenericResponse<User>>)
