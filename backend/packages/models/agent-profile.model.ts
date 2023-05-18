import { AutoIncrementSimple } from '@typegoose/auto-increment'
import { getModelForClass, modelOptions, plugin, Severity } from '@typegoose/typegoose'
import mongoose, { Model } from 'mongoose'

@plugin(AutoIncrementSimple, [{ field: 'agentId' }])
@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'agentProfiles' },
  schemaOptions: { collection: 'agentProfiles' }
})
export class AgentProfile {
  constructor(d: Partial<AgentProfile>) {
    Object.assign(this, d)
  }
}

const AgentProfileModel = (mongoose.models?.agentProfiles as Model<AgentProfile>) ?? getModelForClass(AgentProfile)

export default AgentProfileModel
