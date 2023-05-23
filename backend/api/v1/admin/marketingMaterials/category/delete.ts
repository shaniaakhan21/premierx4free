import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import MarketingMaterialsCategoryModel from '@models/marketingMaterialsCategory'

const deleteMarketingMaterialCategory: CustomRequestHandler<{ id: string }> = async (req, res) => {
  const existing = await MarketingMaterialsCategoryModel.findById(req.params.id)
  if (!existing) throw new Error('Category not found')
  await MarketingMaterialsCategoryModel.deleteOne({ _id: req.params.id })

  res.json(successResponse())
}

export default deleteMarketingMaterialCategory
