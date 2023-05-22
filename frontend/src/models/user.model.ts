import AgentProfile from "./agentProfile.model";

export enum Roles {
  Admin = 'Admin',
  Agent = 'Agent'
}
export default class User {
  public _id!: string

  public email!: string

  public userId!: number

  public jwtToken!: string

  public roles!: Roles[]

  public agentProfile?: AgentProfile
}
