import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { upload } from '@helpers/s3'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import contractRouter from './contract/index.router'
import marketingMaterialsRouter from './marketingMaterials/index.router'
import uploadContract from './uploadContract'
import uploadNDA from './uploadNDA'

const adminRouter = express.Router()

adminRouter.use('/marketingMaterials', marketingMaterialsRouter)
adminRouter.use('/contract', contractRouter)
adminRouter.put(
  '/:agentId/NDA',
  AuthenticateToken([Roles.Admin]),
  upload('premierx/nda').single('file'),
  ErrorHandler(uploadNDA)
)
adminRouter.put(
  '/:agentId/contract',
  AuthenticateToken([Roles.Admin]),
  upload('premierx/contract').single('file'),
  ErrorHandler(uploadContract)
)

export default adminRouter
