import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import marketingMaterialsCategoryRouter from './category/index.router'
import createMarketingMaterial from './create'
import deleteMarketingMaterial from './delete'
import getMarketingMaterials from './get'
import getMarketingMaterialsSummary from './summary'

const marketingMaterialsRouter = express.Router()

marketingMaterialsRouter.use('/category', marketingMaterialsCategoryRouter)
marketingMaterialsRouter.get('/summary', AuthenticateToken([Roles.Admin]), ErrorHandler(getMarketingMaterialsSummary))
marketingMaterialsRouter.put('', AuthenticateToken([Roles.Admin]), ErrorHandler(createMarketingMaterial))
marketingMaterialsRouter.patch('', AuthenticateToken([Roles.Admin]), ErrorHandler(createMarketingMaterial))
marketingMaterialsRouter.delete('/:id', AuthenticateToken([Roles.Admin]), ErrorHandler(deleteMarketingMaterial))
marketingMaterialsRouter.get('', AuthenticateToken([Roles.Admin]), ErrorHandler(getMarketingMaterials))

export default marketingMaterialsRouter
