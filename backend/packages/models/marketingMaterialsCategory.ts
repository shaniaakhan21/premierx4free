import { ClassTransformerRoles, Roles } from '@helpers/access'
import MarketingMaterialsModel, { MarketingMaterials } from '@models/marketingMaterials'
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
import { Expose, instanceToPlain, plainToInstance, Transform, Type } from 'class-transformer'
import { ClassTransformOptions } from 'class-transformer/types/interfaces'
import mongoose from 'mongoose'

@Expose()
export class SummaryTypeCategory {
  @Expose({ groups: [Roles.Admin] })
  @Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key]?.toString()
    }

    return 'unknown value'
  })
  public _id!: string

  @Expose()
  public name!: string

  @Expose()
  public count!: number
}
@Expose()
export class SummaryTypeData {
  @Expose({ groups: [Roles.Admin] })
  @Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key]?.toString()
    }

    return 'unknown value'
  })
  public _id!: string

  @Expose()
  public name!: string

  @Expose()
  @Type(() => MarketingMaterials)
  public documents!: MarketingMaterials[]
}

export class SummaryType {
  @Expose()
  @Type(() => SummaryTypeCategory)
  public categories!: SummaryTypeCategory[]

  @Expose()
  @Type(() => SummaryTypeData)
  public data!: SummaryTypeData[]
}

@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'marketingMaterialsCategory' },
  schemaOptions: { collection: 'marketingMaterialsCategory' }
})
export class MarketingMaterialsCategory extends ModelInterface {
  constructor(d: Partial<MarketingMaterialsCategory>) {
    super()
    Object.assign(this, d)
  }

  @Expose()
  @prop()
  public name?: string

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
   * @returns MarketingMaterialsCategory
   */
  public format(this: DocumentType<MarketingMaterialsCategory>, roles: (Roles | ClassTransformerRoles)[] = []) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return MarketingMaterialsCategoryModel.formatDocument(this, roles)
  }

  /**
   * Formats the document to be returned to the client
   * @param document
   * @param roles {Role[]}
   * @returns MarketingMaterialsCategory
   */
  public static formatDocument(
    this: ReturnModelType<typeof MarketingMaterialsCategory>,
    document: DocumentType<MarketingMaterialsCategory>,
    roles: (Roles | ClassTransformerRoles)[] = []
  ) {
    const options: ClassTransformOptions = {
      groups: roles,
      enableCircularCheck: true,
      strategy: 'excludeAll'
    }
    return instanceToPlain(plainToInstance(MarketingMaterialsCategory, document.toJSON(), options), options)
  }

  public static getSummary(this: ReturnModelType<typeof MarketingMaterialsCategory>, roles: Roles[] = []) {
    const documents = MarketingMaterialsModel.aggregate([
      {
        $lookup: {
          from: 'marketingMaterialsCategory',
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $facet: {
          categories: [
            {
              $group: {
                _id: '$category._id',
                name: { $first: '$category.name' },
                count: { $sum: 1 }
              }
            }
          ],
          data: [
            {
              $group: {
                _id: '$category._id',
                name: { $first: '$category.name' },
                documents: { $push: '$$ROOT' }
              }
            },
            {
              $limit: 5
            }
          ]
        }
      }
    ])

    const options: ClassTransformOptions = {
      groups: roles,
      enableCircularCheck: true,
      strategy: 'excludeAll'
    }
    return instanceToPlain(plainToInstance(SummaryType, documents, options), options)
  }
}

const MarketingMaterialsCategoryModel =
  (mongoose.models?.marketingMaterialsCategory as ReturnModelType<typeof MarketingMaterialsCategory>) ??
  getModelForClass(MarketingMaterialsCategory)

export default MarketingMaterialsCategoryModel
