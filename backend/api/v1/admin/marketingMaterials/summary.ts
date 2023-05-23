import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import MarketingMaterialsCategoryModel from '@models/MarketingMaterialsCategory'

const getMarketingMaterialsSummary: CustomRequestHandler<{}> = async (req, res) => {
  res.json(successResponse(await MarketingMaterialsCategoryModel.getSummary(req.user!.roles ?? [])))
}

export default getMarketingMaterialsSummary