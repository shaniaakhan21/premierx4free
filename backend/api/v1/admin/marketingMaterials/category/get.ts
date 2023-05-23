import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import MarketingMaterialsCategoryModel from '@models/MarketingMaterialsCategory'

const getMarketingMaterialCategories: CustomRequestHandler<{}> = async (req, res) => {
  res.json(
    successResponse(
      (await MarketingMaterialsCategoryModel.find({})).map((category) => category.format(req.user!.roles ?? []))
    )
  )
}

export default getMarketingMaterialCategories
