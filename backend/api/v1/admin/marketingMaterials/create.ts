/* eslint-disable import/no-extraneous-dependencies */

import { CustomRequestHandler } from '@helpers/errorHandler'
import validateClass from '@helpers/global'
import { successResponse } from '@helpers/response'
import { moveFile } from '@helpers/s3'
import MarketingMaterialsModel, { MarketingMaterials } from '@models/marketingMaterials.model'
import MarketingMaterialsCategoryModel from '@models/marketingMaterialsCategory.model'
import UserModel from '@models/user.model'
import { plainToInstance } from 'class-transformer'

const createMarketingMaterial: CustomRequestHandler<{}, any, MarketingMaterials> = async (req, res) => {
  const me = await UserModel.findByUserId(req.user!.subject)
  const request = plainToInstance(MarketingMaterials, req.body, {
    strategy: 'excludeAll',
    exposeUnsetFields: false,
    groups: req.user?.roles ?? []
  })
  await validateClass(request)
  const category = await MarketingMaterialsCategoryModel.findById(request.category)
  if (!category) throw new Error('Category not found')

  if (request._id) {
    const existing = await MarketingMaterialsModel.findById(request._id)
    if (!existing) throw new Error('Marketing material not found')
    const data: Partial<MarketingMaterials> = {
      ...request,
      lastUpdatedBy: me?._id
    }

    data.document = await moveFile(request.document, 'marketingMaterial', existing.document)

    existing.set(data)
    await existing.save()
    return res.json(successResponse(existing.format(req.user!.roles ?? [])))
  }
  const data = {
    ...request,
    createdBy: me?._id
  }

  data.document = await moveFile(request.document, 'marketingMaterial', undefined)

  const created = await MarketingMaterialsModel.create(data)
  return res.json(successResponse(created.format(req.user!.roles ?? [])))
}

export default createMarketingMaterial
