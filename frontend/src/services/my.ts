import useSWR from "swr"
import { getFetcher, patchFetcher } from "../helpers/axiosFetchers";
import { GenericResponse } from "./genericResponse.type";
import User from "../models/user.model";
import AgentProfile, { AgentProfileCompany } from "../models/agentProfile.model";
import Contract from "../models/contract.model";
import { useAuth } from "../contexts/auth.context";

export type ReferralClient = {
  commission: number
  agent: AgentProfile
}

export type UpdateProfileRequest = {
  name: string
  email: string
  contactNo: string
  zip: string
  password?: string
  newPassword?: string
  profileImage: string
}

export type UseUpdateProfileReturn = {
  mutate: (request?: UpdateProfileRequest) => Promise<User>
}

export const useMyDashboard = (user: User, from: Date, to: Date) => useSWR(['/my/dashboard', user, [from.toISOString().split('T')[0], to.toISOString().split('T')[0]]], getFetcher<GenericResponse<{
  referrals: ReferralClient[],
  directs: AgentProfileCompany[],
  summary: {
    referrals: Contract[],
    directs: Contract[],
  }
}>>)

export const useUpdateProfile = (request?: UpdateProfileRequest) => {
  const { user, setUser } = useAuth()
  const mutate = async (request?: UpdateProfileRequest) => {
    const resp = await patchFetcher<UpdateProfileRequest | undefined, GenericResponse<User>>(['/my/updateProfile', request, user, undefined, undefined])
    if (resp) {
      setUser(resp.data)
      return resp.data
    }
  }
  return {
    mutate
  }
}
