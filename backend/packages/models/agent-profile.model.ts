import { AutoIncrementSimple } from '@typegoose/auto-increment'
import {getModelForClass, modelOptions, plugin, prop, Severity} from '@typegoose/typegoose'
import mongoose, { Model } from 'mongoose'

export class AgentProfileLocation {
  @prop()
  public address?: string

  @prop()
  public city?: string

  @prop()
  public state?: string

  @prop()
  public zip?: string
}

@plugin(AutoIncrementSimple, [{ field: 'agentId' }])
@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'agentProfiles' },
  schemaOptions: { collection: 'agentProfiles' }
})
export class AgentProfile {
  constructor(d: Partial<AgentProfile>) {
    Object.assign(this, d)
  }

  @prop()
  public agentId!: number

  @prop()
  public name!: string

  @prop({ type: AgentProfileLocation })
  public location?: AgentProfileLocation

  @prop()
  public contactNo?: string

  @prop()
  public referralCode?: string
}

const AgentProfileModel = (mongoose.models?.agentProfiles as Model<AgentProfile>) ?? getModelForClass(AgentProfile)

export default AgentProfileModel
