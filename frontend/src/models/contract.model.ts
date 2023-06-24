import AgentProfile, { AgentProfileCompany } from "./agentProfile.model";
import User from "./user.model";

export class ContractMonth {
  public _id!: string

  public employeeCount!: number

  public start!: string | Date

  public end!: string | Date
}

export default class Contract {
  public _id!: string

  public agent!: AgentProfile | string

  public company!: AgentProfileCompany | string

  public commissionRates!: number[]

  public employeeCount!: number

  public amountPerPerson!: number

  public months?: ContractMonth[]

  public start!: string | Date

  public end!: string | Date

  public createdBy?: string | User

  public updatedBy!: string | User

  public createdAt?: string | Date

  public updatedAt?: string | Date
}
