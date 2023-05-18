import { SysFunction, SysMethod } from '@helpers/access'
import { AutoIncrementID } from '@typegoose/auto-increment'
import {
  getModelForClass,
  modelOptions,
  plugin,
  prop,
  Severity
} from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import mongoose, { Model } from 'mongoose'

export enum AuditTraceMethod {
  User = 'User'
}

export enum AuditTraceAction {
  Create = 'Create',
  Update = 'Update'
}

@plugin(AutoIncrementID, { field: 'displayId' })
@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'auditTrace' },
  schemaOptions: { collection: 'auditTrace' }
})
export class AuditTrace extends TimeStamps {
  constructor(d: Partial<AuditTrace>) {
    super()
    Object.assign(this, d)
  }

  @prop()
  public displayId!: number

  @prop()
  public method?: SysMethod

  @prop()
  public action?: SysFunction

  @prop()
  public by?: string

  @prop()
  public remarks?: string
}

const AuditTraceModel =
  (mongoose.models?.auditTrace as Model<AuditTrace>) ??
  getModelForClass(AuditTrace)

export default AuditTraceModel
