import { ClassTransformerRoles, Roles } from '@helpers/access'
import { AgentProfile, AgentProfileCompany } from '@models/agent-profile.model'
import ModelInterface from '@models/model.interface'
import { User } from '@models/user.model'
import {
  DocumentType,
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
  ReturnModelType,
  Severity
} from '@typegoose/typegoose'
import { Exclude, Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer'
import { ClassTransformOptions } from 'class-transformer/types/interfaces'
import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import moment from 'moment-timezone'
import mongoose from 'mongoose'

@Exclude()
export class ContractMonth {
  @IsNumber()
  @IsPositive()
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public employeeCount?: number

  @IsDate()
  @Type(() => Date)
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public start?: Date

  @IsDate()
  @Type(() => Date)
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public end?: Date
}

@modelOptions({
  options: { allowMixed: Severity.ALLOW, customName: 'contract' },
  schemaOptions: { collection: 'contract' }
})
@pre<Contract>('save', async function (next) {
  if (!this.isNew) return next()
  this.months = [...Array(moment(this.end).diff(this.start, 'months'))].map((_, i) => ({
    employeeCount: this.employeeCount,
    start: moment(this.start).add(i, 'months').startOf('month').toDate(),
    end: moment(this.start).add(i, 'months').endOf('month').toDate()
  }))
  return next()
})
export class Contract extends ModelInterface {
  constructor(d: Partial<Contract>) {
    super()
    Object.assign(this, d)
  }

  @IsString()
  @Expose({ groups: [Roles.Admin] })
  @Type(() => AgentProfile)
  @prop({ ref: () => AgentProfile })
  public agent?: Ref<AgentProfile>

  @IsString()
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public company?: string

  @IsString()
  @IsOptional()
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public information?: string

  @IsNumber({ maxDecimalPlaces: 2 }, { each: true })
  @Expose({ groups: [Roles.Admin] })
  @prop()
  public commissionRates?: AgentProfileCompany['commissionRates']

  @IsNumber()
  @IsPositive()
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public employeeCount?: number

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public amountPerPerson?: number

  @prop({ type: () => ContractMonth })
  @Type(() => ContractMonth)
  @Expose({ groups: [Roles.Admin] })
  public months?: ContractMonth[]

  @IsDate()
  @Type(() => Date)
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public start?: Date

  @IsDate()
  @Type(() => Date)
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public end?: Date

  @Expose({ groups: [Roles.Admin] })
  @Type(() => User)
  @prop({ ref: () => User })
  public createdBy?: Ref<User>

  @Expose({ groups: [Roles.Admin] })
  @Type(() => User)
  @prop({ ref: () => User })
  public lastUpdatedBy?: Ref<User>

  /**
   * Formats the document to be returned to the client
   * @param roles {Role[]}
   * @returns Contract
   */
  public format(this: DocumentType<Contract>, roles: (Roles | ClassTransformerRoles)[] = []) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return ContractModel.formatDocument(this, roles)
  }

  /**
   * Formats the document to be returned to the client
   * @param document
   * @param roles {Role[]}
   * @returns MarketingMaterialsCategory
   */
  public static formatDocument(
    this: ReturnModelType<typeof Contract>,
    document: DocumentType<Contract>,
    roles: (Roles | ClassTransformerRoles)[] = []
  ) {
    const options: ClassTransformOptions = {
      groups: roles,
      enableCircularCheck: true,
      strategy: 'excludeAll'
    }
    return instanceToPlain(plainToInstance(Contract, document.toJSON(), options), options)
  }
}

const ContractModel = (mongoose.models?.Contract as ReturnModelType<typeof Contract>) ?? getModelForClass(Contract)

export default ContractModel
