import { APINotImplementedError } from '@helpers/errorHandler'
import express from 'express'

import v1Router from './v1/index.router'

const apiRouter = express.Router()

apiRouter.use('/v1', v1Router)

apiRouter.get('*', () => {
  throw new APINotImplementedError('API not implemented')
})

export default apiRouter
