import User from "./user.model";

export default class MarketingMaterialsCategory {
  public _id!: string

  public name!: string

  public createdBy?: string | User

  public lastUpdatedBy?: string | User

  public createdAt?: Date | string

  public updatedAt?: Date | string
}
