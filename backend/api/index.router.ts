import path from 'path'
import * as process from 'process'

import { APINotImplementedError, RecordNotFoundError } from '@helpers/errorHandler'
import UserModel from '@models/user.model'
import express from 'express'

import v1Router from './v1/index.router'

const uploadRoot = path.join(__dirname, '../uploads')
const apiRouter = express.Router()

apiRouter.use('/v1', v1Router)

apiRouter.use('/uploads', express.static(uploadRoot))

apiRouter.get('/secret', async (_req, res) => {
  if (process.env.NODE_ENV !== 'development') throw new APINotImplementedError('API not implemented.')
  const u = await UserModel.findByEmail('testxupdated@grr.la')
  if (!u) throw new RecordNotFoundError('User not found')
  u.password = 'upd123'
  await u?.save()
  res.send('This is a secret')
})

apiRouter.get('*', (req) => {
  if (req.url.startsWith('/uploads')) throw new RecordNotFoundError('File not found')
  throw new APINotImplementedError('API not implemented')
})

export default apiRouter
