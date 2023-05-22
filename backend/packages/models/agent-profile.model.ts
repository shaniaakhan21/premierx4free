import { ClassTransformerRoles, Roles } from '@helpers/access'
import ModelInterface from '@models/model.interface'
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
import { Exclude, Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import mongoose from 'mongoose'

export enum AgentStatus {
  Registered = 'Registered',
  PendingSign = 'PendingSign',
  Active = 'Active',
  Suspended = 'Suspended',
  Terminated = 'Terminated'
}

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

@Exclude()
@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'agentProfiles' },
  schemaOptions: { collection: 'agentProfiles' }
})
@plugin(AutoIncrementID, { field: 'agentId' })
export class AgentProfile extends ModelInterface {
  constructor(d: Partial<AgentProfile>) {
    super()
    Object.assign(this, d)
  }

  @prop()
  @Expose()
  public agentId!: number

  @prop()
  @Expose()
  public name!: string

  @ValidateNested()
  @Type(() => AgentProfileLocation)
  @prop({ type: AgentProfileLocation })
  @Expose({ groups: [ClassTransformerRoles.Self, Roles.Admin] })
  public location?: AgentProfileLocation

  @prop()
  @Expose({ groups: [ClassTransformerRoles.Self, Roles.Admin] })
  public contactNo?: string

  @prop()
  @Expose({ groups: [ClassTransformerRoles.Self, Roles.Admin] })
  public nda?: string

  @prop()
  @Expose({ groups: [ClassTransformerRoles.Self, Roles.Admin] })
  public contract?: string

  @prop({ enum: AgentStatus, default: AgentStatus.Registered })
  public status?: AgentStatus

  @Type(() => String)
  @prop({ ref: () => AgentProfile })
  @Expose({ groups: [ClassTransformerRoles.Self, ClassTransformerRoles.Referrer, Roles.Admin] })
  public referrer?: Ref<AgentProfile>

  @Expose({ groups: [ClassTransformerRoles.Self, ClassTransformerRoles.Referrer, Roles.Admin] })
  public subordinates?: AgentProfile[]

  /**
   * Find agent subordinates
   * @returns Promise<AgentProfile[]>
   */
  public async getSubordinates(this: DocumentType<AgentProfile>) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return AgentProfileModel.getSubordinates(this._id)
  }

  public format(this: DocumentType<AgentProfile>, roles: (Roles | ClassTransformerRoles)[] = []) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return AgentProfileModel.formatAgentDocument(this, roles)
  }

  /**
   * Find agent profile by agentId
   * @param agentId
   * @returns Promise<AgentProfile | null>
   */
  public static async findByAgentId(this: ReturnModelType<typeof AgentProfile>, agentId: number) {
    return this.findOne().where('agentId').equals(agentId).exec()
  }

  /**
   * Find agent profile by userId
   * @param userId
   * @returns Promise<AgentProfile | null>
   */
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

  /**
   * Format agent document
   * @param agent
   * @param roles
   * @returns Promise<AgentProfile>
   */
  public static formatAgentDocument(
    this: ReturnModelType<typeof AgentProfile>,
    agent: DocumentType<AgentProfile>,
    roles: (Roles | ClassTransformerRoles)[] = []
  ) {
    const options = {
      groups: [ClassTransformerRoles.Referrer, ...roles],
      enableCircularCheck: true
    }
    return instanceToPlain(plainToInstance(AgentProfile, agent.toJSON(), options), options)
  }
}

const AgentProfileModel =
  (mongoose.models?.agentProfiles as ReturnModelType<typeof AgentProfile>) ?? getModelForClass(AgentProfile)

export default AgentProfileModel
