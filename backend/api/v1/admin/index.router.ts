import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import marketingMaterialsRouter from './marketingMaterials/index.router'
import uploadContract from './uploadContract'
import uploadNDA from './uploadNDA'

const adminRouter = express.Router()

adminRouter.use('/marketingMaterials', marketingMaterialsRouter)
adminRouter.put('/:agentId/NDA', AuthenticateToken([Roles.Admin]), ErrorHandler(uploadNDA))
adminRouter.put('/:agentId/contract', AuthenticateToken([Roles.Admin]), ErrorHandler(uploadContract))

export default adminRouter
