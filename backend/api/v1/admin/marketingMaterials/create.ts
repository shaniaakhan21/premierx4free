/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs'
import * as path from 'path'

import { CustomRequestHandler } from '@helpers/errorHandler'
import validateClass, { generateFileName } from '@helpers/global'
import { successResponse } from '@helpers/response'
import MarketingMaterialsModel, { MarketingMaterials } from '@models/marketingMaterials'
import MarketingMaterialsCategoryModel from '@models/marketingMaterialsCategory'
import UserModel from '@models/user.model'
import { plainToInstance } from 'class-transformer'
import { UploadedFile } from 'express-fileupload'

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
    if (req.files?.document && !(req.files?.document as UploadedFile[])?.[0]) {
      const file = req.files?.document as UploadedFile
      const fileName = generateFileName(file.name)
      await file.mv(path.resolve(__dirname, '../../../../uploads/marketingMaterials'))
      if (existing.document) {
        const existingFile = path.resolve(__dirname, '../../../../uploads/marketingMaterials', existing.document)
        if (fs.existsSync(existingFile)) {
          fs.unlinkSync(existingFile)
        }
      }
      data.document = fileName
    }
    existing.set(data)
    await existing.save()
    return res.json(successResponse(existing.format(req.user!.roles ?? [])))
  }
  const data = {
    ...request,
    createdBy: me?._id
  }
  if (req.files?.document && !(req.files?.document as UploadedFile[])?.[0]) {
    const file = req.files?.document as UploadedFile
    const fileName = generateFileName(file.name)
    await file.mv(path.resolve(__dirname, '../../../../uploads/marketingMaterials', fileName))
    data.document = fileName
  }
  const created = await MarketingMaterialsModel.create(data)
  return res.json(successResponse(created.format(req.user!.roles ?? [])))
}

export default createMarketingMaterial
