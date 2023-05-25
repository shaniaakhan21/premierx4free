import User from "./user.model";
import MarketingMaterialsCategory from "./marketingMaterialsCategory.model";

export default class MarketingMaterial {
  public _id!: string

  public head!: string

  public description?: string

  public document?: string

  public category!: string | MarketingMaterialsCategory

  public createdBy?: string | User

  public lastUpdatedBy?: string | User

  public createdAt?: Date | string

  public updatedAt?: Date | string
}
