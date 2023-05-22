import express from 'express'

import adminRouter from './admin/index.router'
import agentRouter from './agent/index.router'
import authRouter from './auth/index.router'
import myRouter from './my/index.router'

const v1Router = express.Router()

v1Router.use('/auth', authRouter)
v1Router.use('/admin', adminRouter)
v1Router.use('/agent', agentRouter)
v1Router.use('/my', myRouter)

export default v1Router
