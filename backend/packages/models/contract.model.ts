import { ClassTransformerRoles, Roles } from '@helpers/access'
import { AgentProfile } from '@models/agent-profile.model'
import ModelInterface from '@models/model.interface'
import { User } from '@models/user.model'
import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
  Severity
} from '@typegoose/typegoose'
import { Expose, instanceToPlain, plainToInstance, Type } from 'class-transformer'
import { ClassTransformOptions } from 'class-transformer/types/interfaces'
import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'
import mongoose from 'mongoose'

@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'contract' },
  schemaOptions: { collection: 'contract' }
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

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @prop()
  @Expose({ groups: [Roles.Admin] })
  public commissionRate?: number

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
