import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import MarketingMaterialsModel from '@models/marketingMaterials'

const deleteMarketingMaterial: CustomRequestHandler<{ id: string }> = async (req, res) => {
  const existing = await MarketingMaterialsModel.findById(req.params.id)
  if (!existing) throw new Error('Category not found')
  await MarketingMaterialsModel.deleteOne({ _id: req.params.id })

  res.json(successResponse())
}

export default deleteMarketingMaterial
