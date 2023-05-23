import { CustomRequestHandler } from '@helpers/errorHandler'
import validateClass from '@helpers/global'
import { successResponse } from '@helpers/response'
import MarketingMaterialsCategoryModel, { MarketingMaterialsCategory } from '@models/marketingMaterialsCategory.model'
import UserModel from '@models/user.model'
import { plainToInstance } from 'class-transformer'

const createMarketingMaterialCategory: CustomRequestHandler<{}, any, MarketingMaterialsCategory> = async (req, res) => {
  const me = await UserModel.findByUserId(req.user!.subject)
  const request = plainToInstance(MarketingMaterialsCategory, req.body, {
    strategy: 'excludeAll',
    exposeUnsetFields: false,
    groups: req.user?.roles ?? []
  })
  await validateClass(request)

  if (request._id) {
    const existing = await MarketingMaterialsCategoryModel.findById(request._id)
    if (!existing) throw new Error('Category not found')
    existing.set({
      ...request,
      lastUpdatedBy: me?._id
    })
    await existing.save()
    return res.json(successResponse(existing.format(req.user!.roles ?? [])))
  }
  const created = await MarketingMaterialsCategoryModel.create({
    ...request,
    createdBy: me?._id
  })
  return res.json(successResponse(created.format(req.user!.roles ?? [])))
}

export default createMarketingMaterialCategory
