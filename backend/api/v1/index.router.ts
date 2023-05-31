import { sendEmail } from '@helpers/email'
import ErrorHandler from '@helpers/errorHandler'
import express from 'express'

import adminRouter from './admin/index.router'
import agentRouter from './agent/index.router'
import authRouter from './auth/index.router'
import myRouter from './my/index.router'
import uploadRouter from './upload/index.router'

const v1Router = express.Router()

v1Router.use('/auth', authRouter)
v1Router.use('/admin', adminRouter)
v1Router.use('/agent', agentRouter)
v1Router.use('/my', myRouter)
v1Router.use('/upload', uploadRouter)

v1Router.post(
  '/contactUs',
  ErrorHandler(async (req, res) => {
    if (!req.body) throw new Error('Invalid request')
    const { message } = req.body
    if (!message) throw new Error('Invalid request')
    await sendEmail('info@premierx4free.com', 'Contact Us', message)
    res.send('OK')
  })
)

export default v1Router
