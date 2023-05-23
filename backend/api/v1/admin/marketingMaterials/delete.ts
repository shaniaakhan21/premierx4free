import fs from 'fs'
import path from 'path'

import { CustomRequestHandler } from '@helpers/errorHandler'
import { successResponse } from '@helpers/response'
import MarketingMaterialsModel from '@models/marketingMaterials'

const deleteMarketingMaterial: CustomRequestHandler<{ id: string }> = async (req, res) => {
  const existing = await MarketingMaterialsModel.findById(req.params.id)
  if (!existing) throw new Error('Category not found')
  if (existing.document) {
    const existingFile = path.resolve(__dirname, '../../../../uploads/marketingMaterials', existing.document)
    if (fs.existsSync(existingFile)) {
      fs.unlinkSync(existingFile)
    }
  }
  await MarketingMaterialsModel.deleteOne({ _id: req.params.id })

  res.json(successResponse())
}

export default deleteMarketingMaterial
