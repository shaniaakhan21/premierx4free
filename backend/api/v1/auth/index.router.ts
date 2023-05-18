import ErrorHandler from '@helpers/errorHandler'
import express from 'express'

import login from './login'
import register from './register'

const authRouter = express.Router()

authRouter.post('/login', ErrorHandler(login))
authRouter.post('/register', ErrorHandler(register))

export default authRouter
