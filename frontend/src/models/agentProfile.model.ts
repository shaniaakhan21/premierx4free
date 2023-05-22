export enum AgentStatus {
  Registered = 'Registered',
  PendingSign = 'PendingSign',
  Active = 'Active',
  Suspended = 'Suspended',
  Terminated = 'Terminated'
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

  public contactNo!: string

  public agentId!: number

  public nda?: string

  public status!: AgentStatus

  public contract?: string
}
