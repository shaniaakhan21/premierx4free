import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import subordinates from './subordinates'
import updateProfile from './updateProfile'

const myRouter = express.Router()

myRouter.get('/subordinates/:level?', AuthenticateToken([Roles.Agent]), ErrorHandler(subordinates))
myRouter.patch('/updateProfile', AuthenticateToken([Roles.Agent]), ErrorHandler(updateProfile))

export default myRouter
