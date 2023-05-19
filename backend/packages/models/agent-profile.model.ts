import UserModel from '@models/user.model'
import { AutoIncrementID } from '@typegoose/auto-increment'
import {
  DocumentType,
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  Ref,
  ReturnModelType,
  Severity
} from '@typegoose/typegoose'
import { Expose, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import mongoose from 'mongoose'

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

@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'agentProfiles' },
  schemaOptions: { collection: 'agentProfiles' }
})
@plugin(AutoIncrementID, { field: 'agentId' })
export class AgentProfile {
  constructor(d: Partial<AgentProfile>) {
    Object.assign(this, d)
  }

  @prop()
  public agentId!: number

  @prop()
  public name!: string

  @ValidateNested()
  @Type(() => AgentProfileLocation)
  @prop({ type: AgentProfileLocation })
  public location?: AgentProfileLocation

  @prop()
  public contactNo?: string

  @Expose()
  @Type(() => String)
  @prop({ ref: () => AgentProfile })
  public referrer?: Ref<AgentProfile>

  /**
   * Find agent subordinates
   * @returns Promise<AgentProfile[]>
   */
  public async getSubordinates(this: DocumentType<AgentProfile>) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return AgentProfileModel.getSubordinates(this._id)
  }

  /**
   * Find agent profile by agentId
   * @param agentId
   * @returns Promise<AgentProfile | null>
   */
  public static async findByAgentId(this: ReturnModelType<typeof AgentProfile>, agentId: number) {
    return this.findOne().where('agentId').equals(agentId).exec()
  }

  public static async findByUserId(this: ReturnModelType<typeof AgentProfile>, userId: number) {
    const agentProfileObjectId = (await UserModel.findByUserId(userId))?.agentProfile
    return this.findById(agentProfileObjectId).exec()
  }

  /**
   * Find agent subordinates by agentObjectId
   * @param agentObjectId
   * @returns Promise<AgentProfile[]>
   */
  public static async getSubordinates(
    this: ReturnModelType<typeof AgentProfile>,
    agentObjectId: mongoose.Types.ObjectId | string
  ) {
    return this.find().where('referrer').equals(new mongoose.Types.ObjectId(agentObjectId.toString())).exec()
  }
}

const AgentProfileModel =
  (mongoose.models?.agentProfiles as ReturnModelType<typeof AgentProfile>) ?? getModelForClass(AgentProfile)

export default AgentProfileModel
