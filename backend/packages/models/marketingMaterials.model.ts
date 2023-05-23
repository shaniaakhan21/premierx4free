import { ClassTransformerRoles, Roles } from '@helpers/access'
import { MarketingMaterialsCategory } from '@models/marketingMaterialsCategory.model'
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
import { IsOptional, IsString, MinLength } from 'class-validator'
import mongoose from 'mongoose'

@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'marketingMaterials' },
  schemaOptions: { collection: 'marketingMaterials' }
})
export class MarketingMaterials extends ModelInterface {
  constructor(d: Partial<MarketingMaterials>) {
    super()
    Object.assign(this, d)
  }

  @IsString()
  @Expose()
  @Type(() => MarketingMaterialsCategory)
  @prop({ ref: () => 'marketingMaterialsCategory' })
  public category!: Ref<MarketingMaterialsCategory>

  @IsString()
  @MinLength(1)
  @Expose()
  @prop()
  public head!: string

  @IsString()
  @IsOptional()
  @Expose()
  @prop()
  public description?: string

  @IsString()
  @IsOptional()
  @Expose()
  @prop()
  public document?: string

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
   * @returns MarketingMaterials
   */
  public format(this: DocumentType<MarketingMaterials>, roles: (Roles | ClassTransformerRoles)[] = []) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return MarketingMaterialsModel.formatDocument(this, roles)
  }

  /**
   * Formats the document to be returned to the client
   * @param document
   * @param roles {Role[]}
   * @returns MarketingMaterials
   */
  public static formatDocument(
    this: ReturnModelType<typeof MarketingMaterials>,
    document: DocumentType<MarketingMaterials>,
    roles: (Roles | ClassTransformerRoles)[] = []
  ) {
    const options: ClassTransformOptions = {
      groups: roles,
      enableCircularCheck: true,
      strategy: 'excludeAll'
    }
    return instanceToPlain(plainToInstance(MarketingMaterials, document.toJSON(), options), options)
  }
}

const MarketingMaterialsModel =
  (mongoose.models?.marketingMaterials as ReturnModelType<typeof MarketingMaterials>) ??
  getModelForClass(MarketingMaterials)

export default MarketingMaterialsModel
