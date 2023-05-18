import ErrorHandler from '@helpers/errorHandler'
import express from 'express'

import login from './login'

const authRouter = express.Router()

authRouter.post('/login', ErrorHandler(login))

export default authRouter
