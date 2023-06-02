import User from "../models/user.model";
import axios, { AxiosResponse } from "axios";
import { GenericResponse } from "./genericResponse.type";


export type LoginResponse = User

export const uploadFileRequest = (file: any, token: string, params: {
  agentID: number,
  fileType: string
}) => axios.put<any, AxiosResponse<GenericResponse<LoginResponse>>>(`/admin/${params.agentID}/${params.fileType}`, file, { headers: { "Authorization": `Bearer ${token}` } })
