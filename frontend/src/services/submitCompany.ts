import User from "../models/user.model";
import axios, { AxiosResponse } from "axios";
import { GenericResponse } from "./genericResponse.type";

// export type submitCompanyRequest = {
//     name: string
//     phone: string
//     address: string,
//     contactPersonName: string,
//     contactPersonPhone: string,
//     employeeCount: number,
//     fullTime: string,
//     partTime: string,
//     insuranceInfo: string,
//     commissionRate: number,
//     fullInsured: boolean,
//     selfInsured: boolean,
//     notInsured: boolean,
//     typeOfBusiness: string
// }

export type LoginResponse = User

export const submitCompany = (data: any, token: string) => axios.put<any, AxiosResponse<GenericResponse<LoginResponse>>>('/my/company', data, { headers: { "Authorization": `Bearer ${token}` } })
