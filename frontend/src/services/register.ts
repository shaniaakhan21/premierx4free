import User from "../models/user.model";
import axios, { AxiosResponse } from "axios";
import { GenericResponse } from "./genericResponse.type";

export type registerRequest = {
  email: string
  password: string
  name: string,
  referralCode: string,
  contactNo: string,
  location: {
    address: string,
    city: string,
    state: string,
    zip: string
  }
}

export type LoginResponse = User

export const register = (data: registerRequest) => axios.post<registerRequest, AxiosResponse<GenericResponse<LoginResponse>>>('/auth/register', data)
