import path from 'path'

import { APINotImplementedError } from '@helpers/errorHandler'
import express from 'express'

import v1Router from './v1/index.router'

const uploadRoot = path.join(__dirname, '../uploads')
const apiRouter = express.Router()

apiRouter.use('/v1', v1Router)

apiRouter.use('/uploads', express.static(uploadRoot))

apiRouter.get('*', () => {
  throw new APINotImplementedError('API not implemented')
})

export default apiRouter
