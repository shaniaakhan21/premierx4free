import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import contractRouter from './contract/index.router'
import marketingMaterialsRouter from './marketingMaterials/index.router'
import uploadContract from './uploadContract'
import uploadDocuments from './uploadDocuments'
import uploadNDA from './uploadNDA'

const adminRouter = express.Router()

adminRouter.use('/marketingMaterials', marketingMaterialsRouter)
adminRouter.use('/contract', contractRouter)
adminRouter.put('/:agentId/NDA', AuthenticateToken([Roles.Admin]), ErrorHandler(uploadNDA))
adminRouter.put('/:agentId/contract', AuthenticateToken([Roles.Admin]), ErrorHandler(uploadContract))
adminRouter.put('/:agentId/documents', AuthenticateToken([Roles.Admin]), ErrorHandler(uploadDocuments))

export default adminRouter
