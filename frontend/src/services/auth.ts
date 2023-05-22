import User from "../models/user.model";
import axios, {AxiosResponse} from "axios";
import {GenericResponse} from "./genericResponse.type";

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = User

export const login = (data: LoginRequest) => axios.post<LoginRequest, AxiosResponse<GenericResponse<LoginResponse>>>('/auth/login', data)
