import { Roles } from '@helpers/access'
import ErrorHandler from '@helpers/errorHandler'
import { AuthenticateToken } from '@models/user.model'
import express from 'express'

import createUpdateCompany from './createUpdateCompany'
import dashboard from './dashboard'
import deleteCompany from './deleteCompany'
import subordinates from './subordinates'
import updateProfile from './updateProfile'

const myRouter = express.Router()

myRouter.get('/subordinates/:level?', AuthenticateToken([Roles.Agent]), ErrorHandler(subordinates))
myRouter.patch('/updateProfile', AuthenticateToken([Roles.Agent]), ErrorHandler(updateProfile))
myRouter.get('/dashboard', AuthenticateToken([Roles.Agent]), ErrorHandler(dashboard))
myRouter.put('/company', AuthenticateToken([Roles.Agent]), ErrorHandler(createUpdateCompany))
myRouter.patch('/company', AuthenticateToken([Roles.Agent]), ErrorHandler(createUpdateCompany))
myRouter.delete('/company/:id', AuthenticateToken([Roles.Agent]), ErrorHandler(deleteCompany))

export default myRouter
