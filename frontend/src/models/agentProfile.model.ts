export enum AgentStatus {
  Pending = 'Pending',
  Active = 'Active',
  Suspended = 'Suspended'
}

export type AgentProfileCompany = {
  _id?: string
  name?: string
  phone?: string
  address?: string
  contactPersonName?: string
  contactPersonPhone?: string
  employeeCount?: number
  fullTime?: string
  partTime?: string
  insuranceInfo?: string
  commissionRate?: number
  fullInsured?: boolean
  selfInsured?: boolean
  notInsured?: boolean
  typeOfBusiness?: string
}

export default class AgentProfile {
  public _id!: string

  public name!: string

  public location?: {
    address: string
    city: string
    state: string
    zip: string
  }

  public companies?: AgentProfileCompany[]

  public contactNo!: string

  public agentId!: number

  public nda?: string

  public profileImage?: string

  public status!: AgentStatus

  public contract?: string
}
