import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import createMarketingMaterialCategory from './create'
import deleteMarketingMaterialCategory from './delete'
import getMarketingMaterialCategories from './get'

const marketingMaterialsCategoryRouter = express.Router()

marketingMaterialsCategoryRouter.get('', AuthenticateToken([Roles.Admin]), ErrorHandler(getMarketingMaterialCategories))
marketingMaterialsCategoryRouter.put(
  '',
  AuthenticateToken([Roles.Admin]),
  ErrorHandler(createMarketingMaterialCategory)
)
marketingMaterialsCategoryRouter.patch(
  '',
  AuthenticateToken([Roles.Admin]),
  ErrorHandler(createMarketingMaterialCategory)
)
marketingMaterialsCategoryRouter.delete(
  '/:id',
  AuthenticateToken([Roles.Admin]),
  ErrorHandler(deleteMarketingMaterialCategory)
)

export default marketingMaterialsCategoryRouter
